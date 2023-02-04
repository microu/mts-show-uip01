import { IUIPiece, UIPBase } from "mts-uip";
import { IconsCustomDemo } from "./show/iconsCustomDemo";
import { IItem, Item } from "./types/items";

export type TShowPageItem =
  IItem<IUIPiece>
  | IItem<IItem<IUIPiece>[]>;

export const showPageItems: TShowPageItem[] = [
  new Item("Icons", [
    new Item("Custom", new IconsCustomDemo())
  ]),
  new Item("BETA", [
    new Item("beta01", new UIPBase(`<h1>BETA-01</h1>`)),
    new Item("beta02", new UIPBase(`<h1>BETA-02</h1>`)),
    new Item("beta03", new UIPBase(`<h1>BETA-03</h1>`)),
  ]),
  new Item("gamma", new UIPBase(`<h1>gamma</h1>`)),
];
