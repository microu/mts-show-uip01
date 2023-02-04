import { UIPParent } from "mts-uip";
import { SVGIcon } from "../icons/svgIcon";
import { SVGIconExample } from "./svgIconExample";

const svgCircle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<circle
cx="12" cy="12" r="8" />
</svg>`;

const svgDiamond = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<rect
x="-6" y="-6" width="12" height="12" transform="translate(12,12) rotate(45)"/>
</svg>`;

export class IconsCustomDemo extends UIPParent {
  constructor() {
    super(
      `
    <div>
    <header><h1>SVG Icons Demo</h1></header>
    <main class="flex flex-wrap items-start gap-2">
    </main>
    </div>
    `,
      "main"
    );
    // avoid warnings
    new SVGIcon(svgCircle);
    svgDiamond;

    let code = `new SVGIcon(svgCircle)`;

    this.appendChild(new SVGIconExample(eval(code), { code }));

    code = `new SVGIcon(svgDiamond)`;
    this.appendChild(new SVGIconExample(eval(code), { codeBelow: code }));

    code = `new SVGIcon(
      svgCircle,
      \'<tw class="bg-rose-600 fill-cyan-900">\'
    )`;
    this.appendChild(new SVGIconExample(eval(code), { code }));

    code = `
    new SVGIcon(
      svgDiamond, "w-32 fill-red-800"
    )`;
    this.appendChild(new SVGIconExample(eval(code), { codeBelow: code }));

    code = `new SVGIcon(
      svgDiamond,
      \`<tw class="w-64 fill-[none] stroke-1 stroke-amber-800">\`
    )`;
    this.appendChild(new SVGIconExample(eval(code), { codeBehind: code }));

    code = `new SVGIcon(svgDiamond,
      \`<tw class="w-32 fill-[none] stroke-[3px] stroke-amber-800">\`,
      \`<div class="bg-red-800 rounded-tl-3xl"></div>\`
    )
    `;
    this.appendChild(new SVGIconExample(eval(code), { codeBelow: code }));

    this.appendChild(
      new SVGIconExample(new SVGIcon(svgCircle, "w-20"), {
        text: `Cillum dolore do dolor est ex sunt non consequat exercitation esse qui occaecat minim velit. Irure sint sunt elit sint magna ipsum enim aute.
            Mollit adipisicing adipisicing exercitation minim sit excepteur ad.
      Pariatur qui magna anim eu ex. Culpa ipsum magna duis nulla id elit commodo id proident et ullamco non ut.`,
      })
    );

    code = `new SVGIcon(
      svgCircle, "fill-orange-700 mx-auto bg-cyan-800",
      \`<div class="w-64 bg-stone-400">\`)
    `;

    this.appendChild(
      new SVGIconExample(eval(code), {
        title: "Example with title and code below",
        codeBelow: code,
      })
    );
  }
}
