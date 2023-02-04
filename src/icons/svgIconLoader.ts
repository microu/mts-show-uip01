import { SVGIcon } from "./svgIcon";

export interface ISVGIconLoader {
  iconNames: string[];
  families(iconName: string): string[];
  has(iconName: string, iconFamily?: string): boolean;
  loadIcon(iconName: string, iconFamily?: string): SVGIcon;
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
