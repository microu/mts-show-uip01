import { classNames, toogleClasses } from "mts-dom";
import { IUIPiece, IUIPParent, UIPBase, UIPParent } from "mts-uip";
import { ILabeled, Item } from "./types/items";
import { twMerge } from "tailwind-merge";

type TNavTabsUIOptions = {
  rootClasses?: string | string[];
  listClasses?: string | string[];
  itemClasses?: string | string[];
  selectedClasses?: string | string[];
  unselectedClasses?: string | string[];
};

type TNavTabsUIOptionsKeys = keyof TNavTabsUIOptions;

const NavTabsUIOptionsDefault: TNavTabsUIOptions = {
  rootClasses: classNames(
    `<tw class="select-none cursor-pointer text-base font-bold"/>`
  ),
  listClasses: classNames(`<tw class="w-fit mx-auto">`),
  itemClasses: classNames(`<tw class="_item px-2">`),
  selectedClasses: classNames(`<tw class="_selected">`),
  unselectedClasses: classNames(`<tw class="_unselected">`),
};

export class NavTab<T extends ILabeled> extends UIPBase {
  tabsParent: IUIPParent;
  tabs: Item<IUIPiece>[] = [];
  _selected = "";
  selectedClasses: string[];
  unselectedClasses: string[];
  listener: ((item: T) => void) | undefined;

  constructor(
    items: T[],
    listener?: (item: T) => void,
    options?: TNavTabsUIOptions
  ) {
    if (options == undefined) {
      options = {};
    }
    const opt: TNavTabsUIOptions = {};
    for (const [name, _value] of Object.entries(NavTabsUIOptionsDefault)) {
      if (name.endsWith("Classes")) {
        const key = <TNavTabsUIOptionsKeys>name;
        opt[key] = twMerge(
          classNames(NavTabsUIOptionsDefault[key]),
          classNames(options[key])
        );
      }
    }

    const html = `
    <nav class="${opt.rootClasses}"> 
    <ul class="flex ${opt.listClasses}">
    </ul>
    </nav>`;
    super(html);

    this.listener = listener;

    this.selectedClasses = (<string>opt.selectedClasses).split(/\s+/);
    this.unselectedClasses = (<string>opt.unselectedClasses).split(/\s+/);
    this.tabsParent = new UIPParent(this.root.querySelector("ul")!);

    for (const item of items) {
      if (item.label == undefined) {
        item.label = item.name;
      }

      const li = new UIPBase(`
      <li class="${opt.itemClasses}">${item.label}</a></li>
      `);
      this.tabsParent.appendChild(li);
      this.tabs.push(new Item<IUIPiece>(item.name, li));

      li.root.addEventListener("click", (e) => {
        e.stopPropagation()
        if (this.listener) {
          this.listener(item);
        }
      });
    }
    if (this.tabs.length > 0) {
      this.selected(this.tabs[0].name);
    }
  }

  selected(name?: string) {
    if (name == this._selected) {
      return this._selected;
    }

    if (name !== undefined) {
      for (const tab of this.tabs) {
        if (tab.name == name) {
          toogleClasses(
            tab.item.root,
            this.unselectedClasses,
            this.selectedClasses
          );
        } else {
          toogleClasses(
            tab.item.root,
            this.selectedClasses,
            this.unselectedClasses
          );
        }
      }
      this._selected = name;
    }
    return this._selected;
  }
}
