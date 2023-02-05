// heroicon build from the svg file 
// Intall svgstore (https://github.com/svgstore/svgstore)
// npm install -D svgstore-cli
//
// Clone the heroicon repo https://github.com/tailwindlabs/heroicons.git 
// cd w
// git clone -b v2.0.14 --depth 1 https://github.com/tailwindlabs/heroicons.git 
// ../node_modules/.bin/svgstore -o heroicons-24-solid.svg heroicons/src/24/solid/*.svg
// ../node_modules/.bin/svgstore -o heroicons-24-outline.svg heroicons/src/24/outline/*.svg
// ../node_modules/.bin/svgstore -o heroicons-20-solid.svg heroicons/src/20/solid/*.svg
// 
// copy .svg file to appropriate location
//
export {}

// import { TClassNamesArg } from "mts-dom";
// import { SVGIcon } from "./svgIcon";
// import { ISVGIconLoader } from "./svgIconLoader";



// export class HeroiconLoader implements ISVGIconLoader {
//   svgDoc: Document;
//   _iconNames?: string[];
//   iconAttributes: {
//     fill?: string | undefined;
//     stroke?: string | undefined;
//     "stroke-width"?: string | undefined;
//   };
//   constructor(
//     svgSrc: string,
//     iconAttributes: { fill?: string; stroke?: string; "stroke-width"?: string }
//   ) {
//     const parser = new DOMParser();
//     this.svgDoc = parser.parseFromString(svgSrc, "application/xml");
//     // Presentation attributes have lower priority
//     // than other CSS style rules specified in author style sheets or ‘style’  attribute
//     this.iconAttributes = iconAttributes;
//   }

//   families(_iconName: string): string[] {
//     return ["default"];
//   }


//   has(iconName: string, _iconFamily?: string | undefined): boolean {
//     return this.iconNames.indexOf(iconName) >= 0;
//   }

//   loadIcon(iconName: string, _iconFamily?: string | undefined): SVGIcon {
//     return this.icon(iconName);
//   }

//   get iconNames() {
//     if (this._iconNames == undefined) {
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

//   icon(
//     name: string,
//     classes?: TClassNamesArg ): SVGIcon {
//     return new SVGIcon(this.svgElement(name), classes);
//   }

//   svgElement(name: string) {
//     const symbol = this.svgDoc.getElementById(name);
//     if (!symbol) {
//       throw new Error(`Unknown icon name ${name}`);
//     }

//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("viewBox", symbol!.getAttribute("viewBox")!);
//     for (const [name, value] of Object.entries(this.iconAttributes)) {
//       svg.setAttribute(name, value);
//     }

//     for (let i = 0; i < symbol.children.length; i += 1) {
//       const child = symbol.children[i];
//       svg.appendChild(child.cloneNode(true));
//     }
//     return svg;
//   }
// }
