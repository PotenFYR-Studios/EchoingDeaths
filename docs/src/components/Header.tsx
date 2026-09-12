import { useState } from "react";
import { SITE, withBase } from "../data/pages";

const NAV = [
  { label: "Docs", href: "/docs/" },
  { label: "Curses", href: "/docs/curses/" },
  { label: "Configuration", href: "/docs/configuration/" },
  { label: "Examples", href: "/examples/" },
  { label: "About", href: "/about/" },
];

export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (href === "/") return p === "/";
  return p === href || p.startsWith(href);
}

/** 56px sticky blur bar per SPEC 5.1. */
export function SiteHeader({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-500 flex items-center gap-3 border-b border-line-light bg-[#0b0d14]/72 backdrop-blur-[14px] backdrop-saturate-150"
      style={{ height: "var(--header-h)", padding: "0 20px" }}
    >
      <a
        href={withBase("/")}
        className="flex items-center gap-[9px] text-white"
        style={{ fontWeight: 650, fontSize: "0.95em" }}
        aria-label="EchoingDeaths home"
      >
        <img
          src={withBase("/favicon.png")}
          alt=""
          width={24}
          height={24}
          className="rounded-md"
          style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,.5))" }}
        />
        <span>
          EchoingDeaths
          <span style={{ color: "var(--pink)" }}>.</span>
          docs
        </span>
      </a>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {NAV.map((n) => {
          const active = isNavActive(pathname, n.href);
          return (
            <a
              key={n.href}
              href={withBase(n.href)}
              aria-current={active ? "page" : undefined}
              className="rounded-[7px] px-[9px] py-[5px] text-[0.84em] font-medium no-underline transition-colors"
              style={
                active
                  ? {
                      color: "#fff",
                      background: "rgba(139,92,246,.18)",
                      boxShadow: "inset 0 0 0 1px rgba(139,92,246,.45)",
                    }
                  : { color: "var(--muted)" }
              }
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = "var(--muted)";
              }}
            >
              {n.label}
            </a>
          );
        })}
      </nav>

      <div className="ml-auto hidden items-center gap-4 md:flex">
        <ExtLink href={SITE.website}>Website</ExtLink>
        <ExtLink href={SITE.modrinth}>Modrinth</ExtLink>
        <ExtLink href={SITE.repo}>GitHub</ExtLink>
      </div>

      <button
        className="ml-auto flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[4px] rounded-lg border border-line-light bg-white/[0.03] md:hidden"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block h-[2px] w-4 bg-[#e8eaf2]" />
        <span className="block h-[2px] w-4 bg-[#e8eaf2]" />
        <span className="block h-[2px] w-4 bg-[#e8eaf2]" />
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 z-50 flex flex-col gap-1 border-b border-line-light bg-[#0b0d14]/98 px-5 py-4 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={withBase(n.href)}
              className="rounded-lg px-3 py-2 text-sm no-underline"
              style={{ color: isNavActive(pathname, n.href) ? "#fff" : "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-2 flex gap-4 border-t border-line-light pt-3">
            <ExtLink href={SITE.website}>Website</ExtLink>
            <ExtLink href={SITE.modrinth}>Modrinth</ExtLink>
            <ExtLink href={SITE.repo}>GitHub</ExtLink>
          </div>
        </div>
      )}
    </header>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="text-xs no-underline transition-colors"
      style={{ color: "var(--muted)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
    >
      {children}
    </a>
  );
}
