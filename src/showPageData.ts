import { IUIPiece, UIPBase } from "mts-uip";
import { IItem, Item } from "./types/items";

export type ShowPageItem =
  IItem<IUIPiece>
  | IItem<IItem<IUIPiece>[]>;
export type ShowPageRoot = ShowPageItem[];

export const showPageRoot: ShowPageRoot = [
  new Item("alpha", new UIPBase(`<h1>alpha</h1>`)),
  new Item("BETA", [
    new Item("beta01", new UIPBase(`<h1>BETA-01</h1>`)),
    new Item("beta02", new UIPBase(`<h1>BETA-02</h1>`)),
    new Item("beta03", new UIPBase(`<h1>BETA-03</h1>`)),
  ]),
  new Item("gamma", new UIPBase(`<h1>gamma</h1>`)),
];
