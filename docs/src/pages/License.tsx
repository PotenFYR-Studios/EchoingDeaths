import { Scale } from "lucide-react";
import { SITE } from "../data/pages";
import { DotPattern, GlowOrb } from "../components/magicui";

const LICENSE_URL = `${SITE.repo}/blob/master/LICENSE`;

/** /license: what the Apache-2.0 + Commons Clause license means, in plain words. */
export function License() {
  return (
    <>
      <section className="relative overflow-hidden" style={{ padding: "64px 0 8px" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <GlowOrb className="-top-32 left-[20%]" color="rgba(139,92,246,.16)" size={460} />
          <DotPattern className="opacity-50" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mono-label inline-flex items-center gap-2">
            <Scale className="h-3.5 w-3.5" aria-hidden />
            EchoingDeaths license
          </div>
          <h1
            className="grad-text mt-3 font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2.2em, 5vw, 3.2em)", lineHeight: 1.1 }}
          >
            Free to use. Not for sale.
          </h1>
          <p className="mx-auto mt-4 max-w-[720px] text-[1.02em] leading-[1.75]" style={{ color: "var(--muted)" }}>
            EchoingDeaths is licensed under the Apache License 2.0 with one
            extra condition, the <strong style={{ color: "#e8eaf2" }}>Commons Clause</strong>.
            Here is what that means for you, in plain words.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        <div className="doc-content">
          <h2 id="what-you-can-do">What you can do</h2>
          <p>
            The Apache 2.0 license is broad. You can take EchoingDeaths and use
            it, for any purpose, at no cost:
          </p>
          <ul>
            <li>Run it on any server, personal or commercial, for yourself or your community</li>
            <li>Fork it, study it and modify it however you like</li>
            <li>Redistribute it, in original or modified form</li>
            <li>Self-host it for a network, a hosting company or a client</li>
            <li>
              Build products or services <em>around</em> it (a server host, a
              management panel, a tutorial series) and charge for those
            </li>
          </ul>

          <h2 id="what-you-cant-do">What you can&apos;t do</h2>
          <p>The Commons Clause adds a single restriction to the above:</p>
          <ul>
            <li>
              Don&apos;t sell the software itself. Offering EchoingDeaths as a
              paid product, or a paid service whose value comes entirely or
              substantially from the plugin&apos;s functionality, is not
              permitted
            </li>
            <li>
              Don&apos;t use the PotenFYR Studios or EchoingDeaths names or
              trademarks to promote or sell your own work
            </li>
          </ul>
          <p>
            Everything the clause does not explicitly restrict remains fully
            allowed under Apache 2.0.
          </p>

          <h2 id="attribution">Keep the notices</h2>
          <p>
            If you redistribute EchoingDeaths (whole or as a modified build),
            keep the license notices intact: your copy must carry the Apache
            2.0 license text and the Commons Clause notice, including the
            restriction above. That is the only attribution the license asks
            for.
          </p>

          <h2 id="full-text">The full license text</h2>
          <p>
            This page is a friendly summary, not the license. The authoritative
            text is the <a href={LICENSE_URL}>LICENSE file in the repository</a>.
            If anything here and the LICENSE file disagree, the LICENSE file
            wins.
          </p>
          <p style={{ color: "var(--faint)" }}>
            Questions about licensing? Reach us on the{" "}
            <a href={SITE.discord}>support Discord</a>.
          </p>
        </div>
      </section>
    </>
  );
}
