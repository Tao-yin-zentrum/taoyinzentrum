/**
 * Fetches blocked (booked) dates AND workshop group dates from the
 * Vercel serverless function /api/blocked-dates which proxies Google Sheets.
 * The API key never reaches the browser.
 */

export interface BlockedDates {
  [monthKey: string]: { [day: number]: boolean };
}

export interface CalendarData {
  blocked: BlockedDates;
  workshopDates: string[]; // ["2026-03-24", "2026-04-07", ...]
  jgaDates: string[];      // ["2026-03-27", "2026-04-24", ...]
}

export async function fetchCalendarData(): Promise<CalendarData> {
  const res = await fetch("/api/blocked-dates");

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

/** @deprecated Use fetchCalendarData() instead — kept for backwards compat */
export async function fetchBlockedDates(): Promise<BlockedDates> {
  const data = await fetchCalendarData();
  return data.blocked;
}