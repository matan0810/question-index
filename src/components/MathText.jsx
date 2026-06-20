import { memo } from "react";
import katex from "katex";

// Module-level cache. KaTeX rendering is the single most expensive thing in the
// app, and a given formula always renders to the same HTML, so we compute each
// unique LaTeX string once for the lifetime of the page. This survives component
// unmount/remount (e.g. switching tabs) and de-dupes formulas repeated across
// hundreds of cards. `null` means the formula failed and should show as text.
const katexCache = new Map();
function renderLatex(latex) {
  if (katexCache.has(latex)) return katexCache.get(latex);
  let html;
  try {
    html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
      output: "html",
    });
  } catch {
    html = null;
  }
  katexCache.set(latex, html);
  return html;
}

// Renders a string that mixes Hebrew (RTL) prose with inline LaTeX islands
// written as $...$. The container is RTL — the app's language — and every math
// span is an isolated LTR island (unicode-bidi: isolate). Isolation stops the
// bidi algorithm from reordering the surrounding Hebrew around the math, which
// is what made mixed Hebrew/English/math text visually tangle.
//
// Memoized: rendering depends only on `children`, so we skip re-rendering when
// the text is unchanged (the KaTeX cache above handles the cross-mount case).
function MathText({ children }) {
  if (!children) return null;
  const parts = String(children).split(/(\$[^$]+\$)/g);
  return (
    <span dir="rtl" style={{ unicodeBidi: "isolate" }}>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          const latex = part.slice(1, -1);
          const html = renderLatex(latex);
          if (html === null) {
            return (
              <span key={i} dir="ltr" style={{ unicodeBidi: "isolate" }}>
                {latex}
              </span>
            );
          }
          return (
            <span
              key={i}
              dir="ltr"
              style={{
                display: "inline-block",
                unicodeBidi: "isolate",
                verticalAlign: "middle",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export default memo(MathText);
