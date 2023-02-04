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
    new SVGIcon(svgCircle)
    let code = `new SVGIcon(svgCircle)`;
    this.appendChild(new SVGIconExample(eval(code), { code }));

    code = `new SVGIcon(svgDiamond)`;
    this.appendChild(new SVGIconExample(eval(code), { codeBelow: code }));
  }
}
