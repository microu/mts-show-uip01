import { IUIPiece, UIPParent } from "mts-uip";
import logoUrl from "./assets/mts_icon_a.raw.svg";
import { NavTab } from "./navTabsUI";
import { ShowPageItem, ShowPageRoot } from "./showPageData";
import { $C, classNames } from "mts-dom";
import { IItem, Item } from "./types/items";

export class ShowPage extends UIPParent {
  menuElement: HTMLElement;
  mainMenu: NavTab<IItem<IUIPiece>>;
  private _showMenu = false;
  private _items: IItem<IUIPiece>[] = [];

  constructor(rootItems: ShowPageRoot) {
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
    super(html, "main");
    this.menuElement = this.root.querySelector("._menu")!;

    for (const rootItem of rootItems) {
      if (rootItem.data instanceof Array) {
        this._items.push(
          new Item(
            rootItem,
            new ShowSubPages(rootItem.data as IItem<IUIPiece>[])
          )
        );
      } else {
        this._items.push(rootItem as IItem<IUIPiece>);
      }
    }

    this.mainMenu = new NavTab(
      this._items,
      (item) => {
        this.setRootItem(item);
      },
      {
        rootClasses: $C(
          `<tw class=" bg-orange-900 border-4 border-orange-200 rounded-md"/>`
        ),
        listClasses: $C(`<tw class="flex-col gap-2 p-2"/>`),
        itemClasses: $C(
          `<tw class="bg-orange-200 text-orange-900 text-center rounded-lg"/>`
        ),
        selectedClasses: $C(`<tw class="text-red-700"/>`),
      }
    );
    this.mainMenu.selected(rootItems[0].name);
    this.menuElement.appendChild(this.mainMenu.root);
    this.root.querySelector("._menu_button")!.addEventListener("click", () => {
      this.showMenu(!this.showMenu());
    });
  }

  showMenu(state?: boolean) {
    console.log("showMenu:", state);
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

  setRootItem(item: ShowPageItem) {
    console.log("setRootItem:", item);
    this.showMenu(false);
    this.clearChildren();

    if (item.data instanceof Array) {
      console.log("Item with children");
      const subMenu = new NavTab(item.data, (_item) => {}, {
        rootClasses: classNames(`<tw class="bg-stone-800 text-stone-200"/>`),
        selectedClasses: classNames(
          `<tw class="bg-stone-300 text-orange-800"/>`
        ),
        itemClasses: "",
        unselectedClasses: classNames(`<tw class="hover:bg-stone-600">`),
      });
      this.appendChild(subMenu);
    } else {
      this.appendChild((item as IItem<IUIPiece>).data);
    }
  }
}

class ShowSubPages extends UIPParent {
  _currentContent?: IUIPiece;
  constructor(items: IItem<IUIPiece>[]) {
    super("<div></div>");
    const subMenu = new NavTab(
      items,
      (item) => {
        subMenu.selected(item.name);
        this.currentContent(item.data);
      },
      {
        rootClasses: classNames(`<tw class="bg-stone-800 text-stone-200"/>`),
        selectedClasses: classNames(
          `<tw class="bg-stone-300 text-orange-800"/>`
        ),
        itemClasses: "",
        unselectedClasses: classNames(`<tw class="hover:bg-stone-600">`),
      }
    );
    this.appendChild(subMenu);
    subMenu.selected(items[0].name);
    this.currentContent(items[0].data);
}

  currentContent(content?: IUIPiece) {
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
