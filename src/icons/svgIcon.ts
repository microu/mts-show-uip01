import { twMerge } from "tailwind-merge";
import {
  TClassNamesArg,
  isClassNamesArg,
  $C,
  $E,
  TCreateElementArgExtended,
} from "mts-dom";
import { UIPBase } from "mts-uip";

type TSVGIconOptions = {
  classes?: TClassNamesArg;
  attributes?: { [name: string]: string };
  wrapper?: TCreateElementArgExtended;
  wrapperClasses?: TClassNamesArg;
};

export class SVGIcon extends UIPBase {
  //readonly svgElt: SVGSVGElement;

  constructor(svg: string | SVGSVGElement);
  constructor(svg: string | SVGSVGElement, classes: TClassNamesArg);
  constructor(svg: string | SVGSVGElement, options: TSVGIconOptions);
  constructor(
    svg: string | SVGSVGElement,
    classes: TClassNamesArg,
    wrapper: TCreateElementArgExtended
  );
  constructor(
    svg: string | SVGSVGElement,
    classes: TSVGIconOptions,
    wrapper: TCreateElementArgExtended
  );
  constructor(
    svg: string | SVGSVGElement,
    classesOrOptions?: TClassNamesArg | TSVGIconOptions,
    wrapper?: TCreateElementArgExtended
  ) {
    let options: TSVGIconOptions = {
      attributes: {},
    };

    if (isClassNamesArg(classesOrOptions)) {
      options.classes = $C(classesOrOptions);
    } else {
      options = { ...options, ...classesOrOptions };
    }
    if (wrapper) {
      options.wrapper = $E(wrapper);
    }

    const wrapperClasses = twMerge(
      $C(`<tw class="_svgicon_wrapper"/>`),
      $C(options.wrapperClasses)
    );
    const svgClasses = twMerge($C(`<tw class="_svgicon"/>`), $C(options.classes));
    let root: Element;
    let svgElt: SVGSVGElement;
    if (typeof svg == "string") {
      const elt = $E(svg);
      if (!(elt instanceof SVGSVGElement)) {
        throw new Error(`SVG element expected not ${elt.tagName}.`);
      }
      svgElt = elt;
    } else {
      svgElt = svg;
    }

    svgElt?.classList.add(...$C(svgClasses, true));
    svgElt.setAttribute("width", "32"); //@TODO Default width handling...
    for (const [name, value] of Object.entries(options.attributes!)) {
      svgElt.setAttribute(name, value);
    }

    if (options.wrapper) {
      root = $E(options.wrapper);
      root.classList.add(...$C(wrapperClasses, true));
      root.appendChild(svgElt);
    } else {
      root = svgElt;
    }
    super(root);
  }
}

// export class SVGIconRaw extends SVGIcon {
//   constructor(svg: string | SVGSVGElement);
//   constructor(svg: string | SVGSVGElement, classes: TClassNamesArg);
//   constructor(svg: string | SVGSVGElement, options: TSVGIconOptions);
//   constructor(svg: string | SVGSVGElement, classesOrOptions?: TClassNamesArg | TSVGIconOptions) {
//     let options: TSVGIconOptions;
//     if (isClassNamesArg(classesOrOptions)) {
//       options = {
//         classes: classesOrOptions,
//         noWrapper: true,
//       };
//     } else {
//       options = { ...classesOrOptions };
//       options.noWrapper = true;
//     }
//     super(svg, options);
//   }
// }
