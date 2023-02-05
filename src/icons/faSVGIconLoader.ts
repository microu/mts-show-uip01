//
// fortawesome SVG icon loaders provided as javascript objects
// by the following packages
//
// - @fortawesome/free-brands-svg-icons  (^6.2.1),
// - @fortawesome/free-regular-svg-icons (^6.2.1),
// - @fortawesome/free-solid-svg-icons": (^6.2.1), 
//


import { SVGIcon } from "./svgIcon";
import { ISVGIconLoader } from "./svgIconLoader";

type TFASvgIconDataImported = {
  prefix: string;
  icon: any[];
  iconName: string;
};

type TFASvgIconData = {
  iconName: string;
  iconAliases: string[];
  prefix: string;
  unicodeEmoji?: string;
  unicodeFA: string;
  width: number;
  height: number;
  pathData: string;
};

function _prepareFAIcons(_faImport: { [key: string]: TFASvgIconDataImported }) {
  const r: { [name: string]: TFASvgIconData } = {};
  for (const [_k, data] of Object.entries(_faImport)) {
    if (typeof data.icon == "undefined") {
      console.log("Undefined icon:", _k, data);
      continue;
    }

    const aliases: string[] = [];
    let unicodeEmoji: string | undefined;
    for (const a of data.icon[2] as string | number[]) {
      if (typeof a == "number") {
        unicodeEmoji = a.toString(16);
      } else {
        aliases.push(a);
      }
    }

    const iconData: TFASvgIconData = {
      iconName: data.iconName,
      iconAliases: aliases,
      prefix: data.prefix,
      unicodeEmoji,
      unicodeFA: data.icon[3],
      width: data.icon[0],
      height: data.icon[1],
      pathData: data.icon[4],
    };
    r[iconData.iconName] = iconData;
  }
  return r;
}


export class FASVGIconSetLoader implements ISVGIconLoader {
  _iconNames = [] as string[];
  _recordsMap = {} as { [nameOrAlias: string]: TFASvgIconData };

  constructor(faIconsImport: { [key: string]: TFASvgIconDataImported }) {
    const svgIcons = _prepareFAIcons(faIconsImport);
    console.log("PREPARED:", svgIcons);
    for (const [name, data] of Object.entries(svgIcons)) {
      this._iconNames.push(name);
      this._recordsMap[name] = data;
      for (const alias of data.iconAliases) {
        this._recordsMap[alias] = data;
      }
    }
    console.log("Records:", this._recordsMap);
  }

  get iconNames(): string[] {
    return this._iconNames;
  }

  get iconRecords() {
    return Object.values(this._recordsMap);
  }

  has(iconName: string, _iconFamily?: string | undefined): boolean {
    return iconName in this._recordsMap;
  }

  loadIcon(iconName: string, _iconFamily?: string | undefined): SVGIcon {
    if (!this.has(iconName)) {
      throw new Error(`Unknown icon ${iconName}`);
    }
    const iconData = this._recordsMap[iconName];

    const svg = `
    <svg class="fill-orange-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iconData.width} ${iconData.height}">
    <path d="${iconData.pathData}" />
    </svg>
    `;
    return new SVGIcon(svg);
  }

  families(_iconName: string): string[] {
    return ["default"];
  }
}
