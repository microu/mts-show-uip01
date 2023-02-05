import { UIPParent } from "mts-uip";
import boxicons, { boxiconsLogos, boxiconsRegular, boxiconsSolid } from "../icons/boxicons";
import { faBrands } from "../icons/faBrandsIconLoader";
import { faRegular } from "../icons/faRegularIconLoader";
import { faSolid } from "../icons/faSolidIconLoader";
import { hi24Outline } from "../icons/heroiconOutline24";
import { hi20Solid } from "../icons/heroiconSolid20";
import { hi24Solid } from "../icons/heroiconSolid24";

export class FAIconsDemo extends UIPParent {
  constructor() {
    super(
      `
    <div>
    <header><h1 class="select-none cursor-pointer">FA Icons Demo</h1></header>
    <main class="">
    </main>
    </div>
    `,
      "main"
    );

    this.updateIcons();
    this.root.querySelector("header>h1")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.updateIcons();
    });
  }

  updateIcons() {
    this.clearChildren();

    let n = faRegular.iconNames.length;

    const regularIcons = new UIPParent(`<div class="flex gap-2"></div>`);

    for (let i = 0; i < 16; i += 1) {
      const name = faRegular.iconNames[Math.floor(Math.random() * n)];
      regularIcons.appendChild(faRegular.loadIcon(name));
    }
    this.appendChild(regularIcons);

    const solidIcons = new UIPParent(`<div class="flex gap-2"></div>`);

    n = faSolid.iconNames.length;

    for (let i = 0; i < 16; i += 1) {
      const name = faSolid.iconNames[Math.floor(Math.random() * n)];
      solidIcons.appendChild(faSolid.loadIcon(name));
    }
    this.appendChild(solidIcons);

    const brandIcons = new UIPParent(`<div class="flex gap-2"></div>`);
    n = faBrands.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = faBrands.iconNames[Math.floor(Math.random() * n)];
      brandIcons.appendChild(faBrands.loadIcon(name));
    }
    this.appendChild(brandIcons);

    const hero24SolidIcons = new UIPParent(`<div class="flex gap-2"></div>`);
    n = hi24Solid.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = hi24Solid.iconNames[Math.floor(Math.random() * n)];
      hero24SolidIcons.appendChild(hi24Solid.loadIcon(name));
    }
    this.appendChild(hero24SolidIcons);

    const hero20SolidIcons = new UIPParent(`<div class="flex gap-2"></div>`);
    n = hi20Solid.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = hi20Solid.iconNames[Math.floor(Math.random() * n)];
      hero20SolidIcons.appendChild(hi20Solid.loadIcon(name));
    }
    this.appendChild(hero20SolidIcons);

    const hero24OutlineIcons = new UIPParent(`<div class="flex gap-2"></div>`);
    n = hi24Outline.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = hi24Outline.iconNames[Math.floor(Math.random() * n)];
      hero24OutlineIcons.appendChild(hi24Outline.loadIcon(name));
    }
    this.appendChild(hero24OutlineIcons);

    const boxiconsRegularElt = new UIPParent(`<div class="flex gap-2"></div>`);
    n = boxiconsRegular.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = boxiconsRegular.iconNames[Math.floor(Math.random() * n)];
      boxiconsRegularElt.appendChild(boxiconsRegular.loadIcon(name));
    }
    this.appendChild(boxiconsRegularElt);

    const boxIconsLogosElt = new UIPParent(`<div class="flex gap-2"></div>`);
    n = boxiconsLogos.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = boxiconsLogos.iconNames[Math.floor(Math.random() * n)];
      boxIconsLogosElt.appendChild(boxiconsLogos.loadIcon(name));
    }
    this.appendChild(boxIconsLogosElt);

    const boxIconsSolidElt = new UIPParent(`<div class="flex gap-2"></div>`);
    n = boxiconsSolid.iconNames.length;
    for (let i = 0; i < 16; i += 1) {
      const name = boxiconsSolid.iconNames[Math.floor(Math.random() * n)];
      boxIconsSolidElt.appendChild(boxiconsSolid.loadIcon(name));
    }
    this.appendChild(boxIconsSolidElt);
  }
}
