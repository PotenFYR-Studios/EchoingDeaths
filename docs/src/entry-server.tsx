import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Server entry for the post-build prerender (scripts/emit-pages.mjs).
 * The caller must stub `window.location` before calling: App reads
 * window.location.pathname at render time. Never imported by the browser.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
