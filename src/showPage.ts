import { IUIPiece, UIPBase, UIPParent } from "mts-uip";
import logoUrl from "./assets/mts_icon_a.raw.svg";
import { NavTab } from "./navTabsUI";
import { TShowPageItem } from "./showPageData";
import { IItem, Item } from "./types/items";
import { ContentSwitcher } from "./uip/contentSwitch";

export class ShowPage extends UIPBase {
  menuElement: HTMLElement;
  mainMenu: NavTab<IItem<IUIPiece>>;
  private _showMenu = false;
  private _items: IItem<IUIPiece>[] = [];
  contentParent: HTMLElement;
  contentSwitcher: ContentSwitcher;

  constructor(pageItems: TShowPageItem[]) {
    const title = `MTS PROJECT - SHOW - UIP01`;
    const html = `
  <div class="">
  <div class="_header relative bg-stone-300 border-b-2 md:border-b-4  border-b-red-500">
    <h1 class="container mx-auto flex justify-between py-2 px-1">
    <div class="flex gap-4 items-center">
      <img class="_logo inline-block" width="32" src="${logoUrl}"/>
      <div class="_menu_button relative text-emerald-800 text-lg select-none cursor-pointer">[Menu]
      <div class="_menu z-50 absolute hidden top-full left-0"></div> 
      </div>
    </div>
    <span class="_title text-2xl md:text-4xl font-bold text-emerald-800">${title}</span>
    </h1>
  </div>

  <main class="container mx-auto"></main>
  </div>
  `;
    super(html);
    this.menuElement = this.root.querySelector("._menu")!;
    this.contentParent = this.root.querySelector("main")!;
    this.contentSwitcher = new ContentSwitcher(this.contentParent);
    for (const item of pageItems) {
      if (item.data instanceof Array) {
        this._items.push(
          new Item(item, new ShowSubPages(item.data as IItem<IUIPiece>[]))
        );
      } else {
        this._items.push(item as IItem<IUIPiece>);
      }
    }

    this.mainMenu = new NavTab(
      this._items,
      (item) => {
        this.selectMainItem(item);
      },
      {
        rootClasses: `<tw class=" bg-orange-900 border-4 border-orange-200 rounded-md"/>`,
        listClasses: `<tw class="flex-col gap-2 p-2"/>`,
        itemClasses: `<tw class="bg-orange-200 text-orange-900 text-center rounded-lg"/>`,
        selectedClasses: `<tw class="text-red-700"/>`,
      }
    );

    this.selectMainItem(this._items[0]);
    this.menuElement.appendChild(this.mainMenu.root);
    // this.mainMenu.selected(pageItems[0].name);
    this.root.querySelector("._menu_button")!.addEventListener("click", () => {
      this.showMenu(!this.showMenu());
    });
  }

  showMenu(state?: boolean) {
    if (state != undefined && state != this._showMenu) {
      this._showMenu = state;
      if (this._showMenu) {
        this.menuElement.classList.remove("hidden");
      } else {
        this.menuElement.classList.add("hidden");
      }
    }
    return this._showMenu;
  }

  selectMainItem(item: IItem<IUIPiece>) {
    this.showMenu(false);
    this.contentSwitcher.switchContent(item.data);
    this.mainMenu.selected(item.name);
  }
}

class ShowSubPages extends UIPParent {
  _currentContent?: IUIPiece;
  _switcher: ContentSwitcher;
  constructor(items: IItem<IUIPiece>[]) {
    super("<div></div>");
    const subMenu = new NavTab(
      items,
      (item) => {
        subMenu.selected(item.name);
        this._switcher.switchContent(item.data);
      },
      {
        rootClasses: `<tw class="bg-stone-800 text-stone-200"/>`,
        selectedClasses: `<tw class="bg-stone-300 text-orange-800"/>`,
        itemClasses: ``,
        unselectedClasses: `<tw class="hover:bg-stone-600">`,
      }
    );
    this.appendChild(subMenu);
    this.appendChild(items[0].data);
    this._switcher = new ContentSwitcher(this.root, items[0].data.root);
    subMenu.selected(items[0].name);
  }

  currentContent(content: IUIPiece) {
    if (content != undefined && content !== this._currentContent) {
      if (this._currentContent) {
        this.removeChild(this._currentContent);
      }
      this.appendChild(content);
      this._currentContent = content;
    }

    return this._currentContent;
  }
}
