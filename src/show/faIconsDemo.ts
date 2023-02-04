import { UIPParent } from "mts-uip";
import { faBrands } from "../icons/faBrandsIconsLoader";
import { faRegular } from "../icons/faRegularIconLoader";
import { faSolid } from "../icons/faSolidIconLoader";

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
      console.log("Loading FA icon:", name);
      regularIcons.appendChild(faRegular.loadIcon(name));
    }
    this.appendChild(regularIcons);

    const solidIcons = new UIPParent(`<div class="flex gap-2"></div>`);

    n = faSolid.iconNames.length;

    for (let i = 0; i < 16; i += 1) {
      const name = faSolid.iconNames[Math.floor(Math.random() * n)];
      console.log("Loading FA icon:", name);
      solidIcons.appendChild(faSolid.loadIcon(name));
    }
    this.appendChild(solidIcons);

    const brandIcons = new UIPParent(`<div class="flex gap-2"></div>`);

    n = faBrands.iconNames.length;

    for (let i = 0; i < 16; i += 1) {
      const name = faBrands.iconNames[Math.floor(Math.random() * n)];
      console.log("Loading FA icon:", name);
      brandIcons.appendChild(faBrands.loadIcon(name));
    }

    this.appendChild(brandIcons);
  }
}
