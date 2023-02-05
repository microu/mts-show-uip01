import { TClassNamesArg } from "mts-dom";
import { SVGIcon } from "./svgIcon";

export interface ISVGIconLoader {
  iconNames: string[];
  families(iconName: string): string[];
  has(iconName: string, iconFamily?: string): boolean;
  loadIcon(iconName: string, iconFamily?: string): SVGIcon;
}

export class SVGIconLoader implements ISVGIconLoader {
  svgDoc: Document;
  _iconNames?: string[];
  iconAttributes: {
    fill?: string | undefined;
    stroke?: string | undefined;
    "stroke-width"?: string | undefined;
  };
  nameFunc: (symbol: SVGSymbolElement) => string;

  constructor(
    svgSrc: string,
    iconAttributes: {
      fill?: string;
      stroke?: string;
      "stroke-width"?: string;
    } = {},
    nameFunc?: (symbol: SVGSymbolElement) => string
  ) {
    const parser = new DOMParser();
    this.svgDoc = parser.parseFromString(svgSrc, "application/xml");
    // Presentation attributes have lower priority
    // than other CSS style rules specified in author style sheets or ‘style’  attribute
    this.iconAttributes = iconAttributes;
    this.nameFunc = nameFunc
      ? nameFunc
      : (symbol: SVGSymbolElement) => symbol.id;
  }

  families(_iconName: string): string[] {
    return ["default"];
  }

  has(iconName: string, _iconFamily?: string | undefined): boolean {
    return this.iconNames.indexOf(iconName) >= 0;
  }

  loadIcon(iconName: string, _iconFamily?: string | undefined): SVGIcon {
    return this.icon(iconName);
  }

  get iconNames() {
    if (this._iconNames == undefined) {
      const nodes = this.svgDoc.querySelectorAll("symbol");
      this._iconNames = [];
      nodes.forEach((symbol) => {
        const name = this.nameFunc(symbol);
        this._iconNames!.push(name);
      });
    }
    return this._iconNames;
  }

  icon(name: string, classes?: TClassNamesArg): SVGIcon {
      return new SVGIcon(this.svgElement(name), classes);
  }

  svgElement(name: string) {
    const symbol = this.svgDoc.getElementById(name);
    if (!symbol) {
      throw new Error(`Unknown icon name ${name}`);
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", symbol!.getAttribute("viewBox")!);
    for (const [name, value] of Object.entries(this.iconAttributes)) {
      svg.setAttribute(name, value);
    }

    for (let i = 0; i < symbol.children.length; i += 1) {
      const child = symbol.children[i];
      svg.appendChild(child.cloneNode(true));
    }
    return svg;
  }
}

export class SVGIconFamiliesLoader implements ISVGIconLoader {
  _iconNames: string[];
  _families: { [name: string]: ISVGIconLoader };

  constructor(families: { [name: string]: ISVGIconLoader }) {
    this._families = { ...families };
    this._iconNames = [];
    for (const [_familyName, loader] of Object.entries(families)) {
      for (const iconName of loader.iconNames) {
        if (this._iconNames.indexOf(iconName) < 0) {
          this._iconNames.push(iconName);
        }
      }
    }
  }

  has(iconName: string, iconFamily?: string | undefined): boolean {
    if (iconFamily == undefined) {
      for (const [_familyName, loader] of Object.entries(this._families)) {
        if (loader.has(iconName)) {
          return true;
        }
      }
      return false;
    } else {
      if (!(iconFamily in this._families)) {
        throw new Error(`Unknown icon family: ${iconFamily}`);
      }
      return this._families[iconFamily].has(iconName);
    }
  }

  loadIcon(iconName: string, iconFamily?: string | undefined): SVGIcon {
    if (iconFamily == undefined) {
      for (const [_familyName, loader] of Object.entries(this._families)) {
        if (loader.has(iconName)) {
          return loader.loadIcon(iconName);
        }
      }
      throw new Error(`Unknown icon in families: ${iconName}`);
    } else {
      if (!(iconFamily in this._families)) {
        throw new Error(`Unknown icon family: ${iconFamily}`);
      }
      return this._families[iconFamily].loadIcon(iconName);
    }
  }

  families(iconName: string): string[] {
    const r = [] as string[];
    for (const [familyName, loader] of Object.entries(this._families)) {
      if (loader.has(iconName)) {
        r.push(familyName);
      }
    }
    if (r.length == 0) {
      throw new Error(`Unknown icon in families: ${iconName}`);
    }
    return r;
  }

  get iconNames(): string[] {
    return this._iconNames;
  }
}
