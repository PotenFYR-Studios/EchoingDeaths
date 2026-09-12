import { useRef, useState } from "react";

/** Code block with language tag + hover copy button per SPEC 5.8. */
export function CodeBlock({
  code,
  lang = "text",
  title,
}: {
  code: string;
  lang?: string;
  title?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ok, setOk] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <pre data-lang={lang} className="relative" tabIndex={-1}>
      {title && (
        <span
          className="mono-label absolute top-2 left-4 normal-case tracking-normal"
          aria-hidden
        >
          {title}
        </span>
      )}
      <code>{code}</code>
      <button
        ref={btnRef}
        type="button"
        className="copy-btn"
        onClick={copy}
        aria-label={ok ? "Copied" : `Copy ${lang} code`}
      >
        {ok ? "Copied!" : "Copy"}
      </button>
    </pre>
  );
}

/** Inline literal rendered as styled inline code. */
export function K({ children }: { children: React.ReactNode }) {
  return <code>{children}</code>;
}
