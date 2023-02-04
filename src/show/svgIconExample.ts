import hljs from "highlight.js";
import { $E } from "mts-dom";
import { IUIPiece, UIPBase } from "mts-uip";

export class SVGIconExample extends UIPBase {
  constructor(
    example: IUIPiece | Element,
    desc?: { title?: string; text?: string; code?: string; codeBelow?: string; codeBehind?: string }
  ) {
    let root = $E(
      `<div class="relative flex items-start bg-zinc-600 p-2 rounded-md w-fit gap-2"></div>`
    );
    if (desc != undefined) {
      const maxW = desc.code ? "max-w-2xl" : "max-w-md";
      const descriptionElt = $E(`<div class="_example_desc flex flex-col gap-2 ${maxW}"></div>`);
      if (desc.title) {
        descriptionElt.appendChild(
          $E(`<h1 class="bg-zinc-50 p-1 border-l-4 border-red-600">${desc.title}</h1>`)
        );
      }
      if (desc.text) {
        descriptionElt.appendChild($E(`<div class="bg-zinc-50 p-1">${desc.text}</div>`));
      }
      if (desc.code) {
        const codeHtml = hljs.highlight(desc.code, { language: "typescript" }).value;
        descriptionElt.appendChild(
          $E(
            `<pre class="bg-zinc-50 p-1 overflow-auto hljs language-typescript" style="font-size:.8rem"><code>${codeHtml}</code></pre>`
          )
        );
      }
      if (descriptionElt.children.length > 0) {
        root.appendChild(descriptionElt);
      }
    }

    const exampleElt = example instanceof Element ? example : example.root;
    const exampleWrapper = $E(`<div class="_example_wrapper bg-cyan-100 p-1 rounded-sm"></div>`);
    exampleWrapper.appendChild(exampleElt);
    root.appendChild(exampleWrapper);

    if (desc && desc.codeBelow) {
      const wrapper = $E(
        `<div class="relative flex flex-col items-center p-1 bg-zinc-600 rounded-md gap-2 max-w-2xl"></div>`
      );
      wrapper.appendChild(root);
      const codeHtml = hljs.highlight(desc.codeBelow, { language: "typescript" }).value;
      wrapper.appendChild(
        $E(
          `<pre class="bg-zinc-50 p-1 overflow-auto hljs language-typescript" style="font-size:.8rem"><code>${codeHtml}</code></pre>`
        )
      );
      root = wrapper;
    }

    if (desc?.codeBehind) {
      const codeHtml = hljs.highlight(desc.codeBehind, { language: "typescript" }).value;
      const codeElt = $E(
        `<pre class="hidden absolute inset-1.5 bg-zinc-50 p-1 overflow-auto hljs language-typescript" style="font-size:.8rem"><code>${codeHtml}</code></pre>`
      );
      root.appendChild(codeElt);
      root.addEventListener("dblclick", () => {
        if (codeElt.classList.contains("hidden")) {
          codeElt.classList.remove("hidden");
        } else {
          codeElt.classList.add("hidden");
        }
      });
    }

    super(root);
  }
}
