import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { StoryblokProvider } from "../contexts/StoryblokContext";

export default function App() {
  return (
    <HelmetProvider>
      <StoryblokProvider>
        <RouterProvider router={router} />
      </StoryblokProvider>
    </HelmetProvider>
  );
}