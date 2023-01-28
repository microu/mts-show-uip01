import { IUIPiece, UIPBase } from "mts-uip";
import { IItem, Item } from "./types/items";

export type ShowPageItem =
  | IItem<IUIPiece>
  | IItem<{ children: IItem<IUIPiece> }>;
export type ShowPageRoot = ShowPageItem[];

export const showPageRoot: ShowPageRoot = [
  new Item("alpha", new UIPBase(`<h1>alpha</h1>`)),
  new Item("beta", new UIPBase(`<h1>beta</h1>`)),
  new Item("gamma", new UIPBase(`<h1>gamma</h1>`)),
];
