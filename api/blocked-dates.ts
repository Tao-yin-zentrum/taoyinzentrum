// Vercel Serverless Function — runs on the server, API key never reaches the browser
// File location in your repo: /api/blocked-dates.ts

import type { VercelRequest, VercelResponse } from "@vercel/node";

const SHEET_ID = "1_7HMYEFIEV4OaQMtfmPvlAr1cUuSC540kHha7B7xMbc";
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY; // Set in Vercel Dashboard
const RANGE = "A:C"; // Column A = blocked wedding dates, B = workshop dates, C = JGA dates

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values ?? [];

    const blocked: Record<string, Record<number, boolean>> = {};
    const workshopDates: string[] = [];
    const jgaDates: string[] = [];

    for (const row of rows) {
      // Column A — blocked wedding dates
      const rawA = row[0]?.trim();
      if (rawA && !rawA.toLowerCase().startsWith("date") && !rawA.toLowerCase().startsWith("datum")) {
        const parts = rawA.split("-");
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const day = parseInt(parts[2], 10);
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const key = `${year}-${month}`;
            if (!blocked[key]) blocked[key] = {};
            blocked[key][day] = true;
          }
        }
      }

      // Column B — workshop group dates (YYYY-MM-DD)
      const rawB = row[1]?.trim();
      if (rawB && !rawB.toLowerCase().startsWith("workshop") && !rawB.toLowerCase().startsWith("termin") && !rawB.toLowerCase().startsWith("date")) {
        const parts = rawB.split("-");
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            workshopDates.push(rawB);
          }
        }
      }

      // Column C — JGA available dates (YYYY-MM-DD)
      const rawC = row[2]?.trim();
      if (rawC && !rawC.toLowerCase().startsWith("jga") && !rawC.toLowerCase().startsWith("date") && !rawC.toLowerCase().startsWith("termin")) {
        const parts = rawC.split("-");
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            jgaDates.push(rawC);
          }
        }
      }
    }

    // Sort dates chronologically
    workshopDates.sort();
    jgaDates.sort();

    // Cache for 1 hour — no need to hit Google on every request
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ blocked, workshopDates, jgaDates });
  } catch (err) {
    console.error("Failed to fetch blocked dates:", err);
    return res.status(500).json({ error: "Failed to fetch dates" });
  }
}
