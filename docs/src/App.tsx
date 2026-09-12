import { useEffect, useState } from "react";
import { SiteHeader } from "./components/Header";
import { SiteFooter } from "./components/Footer";
import { Palette } from "./components/Palette";
import { pageIdForPath } from "./data/pages";
import { Landing } from "./pages/Landing";
import { DocsPortal } from "./pages/DocsPortal";
import { Examples } from "./pages/Examples";
import { GettingStarted } from "./pages/GettingStarted";
import { Curses } from "./pages/Curses";
import { Configuration } from "./pages/Configuration";
import { CommandsPermissions } from "./pages/CommandsPermissions";
import { Faq } from "./pages/Faq";
import { About } from "./pages/About";
import { License } from "./pages/License";

/** Route by pathname: every route ships its own index.html, so direct refresh works. */
export default function App() {
  const pathname = window.location.pathname;
  const pageId = pageIdForPath(pathname);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ⌘K / Ctrl+K opens the palette on any page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    const onCustom = () => setPaletteOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ed:open-palette", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ed:open-palette", onCustom);
    };
  }, []);

  let page: React.ReactNode;
  if (pageId === "portal") page = <DocsPortal />;
  else if (pageId === "examples") page = <Examples />;
  else if (pageId === "getting-started") page = <GettingStarted />;
  else if (pageId === "curses") page = <Curses />;
  else if (pageId === "configuration") page = <Configuration />;
  else if (pageId === "commands-permissions") page = <CommandsPermissions />;
  else if (pageId === "faq") page = <Faq />;
  else if (pageId === "about") page = <About />;
  else if (pageId === "license") page = <License />;
  else page = <Landing />;

  return (
    <>
      <SiteHeader pathname={pathname} />
      {page}
      <SiteFooter />
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
