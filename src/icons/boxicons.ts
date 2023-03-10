import { SVGIconLoader } from "./svgIconLoader";
import boxiconwRegularSVG from "./boxicons.d/boxicons-regular.svg?raw";
import boxiconSolidSVG from "./boxicons.d/boxicons-solid.svg?raw";
import boxiconLogosSVG from "./boxicons.d/boxicons-logos.svg?raw";


export const boxiconsRegular = new SVGIconLoader(boxiconwRegularSVG);
export const boxiconsSolid = new SVGIconLoader(boxiconSolidSVG);
export const boxiconsLogos = new SVGIconLoader(boxiconLogosSVG);

// export class BoxIconsLoader implements ISVGIconLoader {
//   private _iconNames = [] as string[];
//   svgDoc: Document;

//   constructor(svgSrc: string) {
//     const parser = new DOMParser();
//     this.svgDoc = parser.parseFromString(svgSrc, "application/xml");
//   }

//   get iconNames(): string[] {
//     if (this._iconNames.length == 0) {
//       const nodes = this.svgDoc.querySelectorAll("symbol");
//       this._iconNames = [];
//       nodes.forEach((symbol) => {
//         if (symbol.id) {
//           this._iconNames!.push(symbol.id);
//         }
//       });
//     }
//     return this._iconNames;
//   }

//   families(_iconName: string): string[] {
//     return ["default"];
//   }

//   has(iconName: string, _iconFamily?: string | undefined): boolean {
//     return this.iconNames.indexOf(iconName) >= 0;
//   }
//   loadIcon(iconName: string, _iconFamily?: string | undefined): SVGIcon {
//     const symbol = this.svgDoc.getElementById(iconName);
//     if (!symbol) {
//       throw new Error(`Unknown icon name ${iconName}`);
//     }

//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("viewBox", symbol!.getAttribute("viewBox")!);

//     for (let i = 0; i < symbol.children.length; i += 1) {
//       const child = symbol.children[i];
//       svg.appendChild(child.cloneNode(true));
//     }
//     return new SVGIcon(svg);
//   }
// }
