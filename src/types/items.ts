export interface ILabeled {
  name: string;
  label: string;
  longLabel: string;
}

export interface ILabeledPartial {
  name: string;
  label?: string;
  longLabel?: string;
}

export interface ISelectable {
  selected: boolean;
}

export interface IEnablable {
  enabled: boolean;
}

export interface IItemInfo extends ILabeled, ISelectable, IEnablable {}

export interface IItemInfoPartial extends ILabeledPartial {
  selected?: boolean;
  enabled?: boolean;
}

export interface IItem<T> extends IItemInfo {
  item: T;
}

export interface IItemPartial<T> extends IItemInfo {
  item: T;
}

export class Labeled implements ILabeled {
  name: string;
  label: string;
  longLabel: string;

  constructor(arg: ILabeledPartial) {
    this.name = arg.name;
    this.label = arg.label != undefined ? arg.label : this.name;
    this.longLabel = arg.longLabel != undefined ? arg.longLabel : this.label;
  }
}

export class ItemInfo
  extends Labeled
  implements ILabeled, ISelectable, IEnablable
{
  enabled: boolean;
  selected: boolean;
  constructor(arg: IItemInfoPartial) {
    super(arg);
    this.selected = arg.selected != undefined ? arg.selected : false;
    this.enabled = arg.enabled != undefined ? arg.enabled : true;
  }
}

export class Item<T> extends ItemInfo implements IItem<T> {
  //@ts-ignore
  _item: T;
  constructor(name: string, item: T);
  constructor(arg: IItemInfo, item: T);
  constructor(arg: IItemPartial<T>);
  constructor(arg: string | IItemInfoPartial | IItem<T>, item?: T) {
    if (typeof arg == "string") {
      arg = { name: arg };
    }

    super(arg);

    if ("item" in arg) {
      this._item = arg.item;
    }
    if (item != undefined) {
      this._item = item;
    }
  }

  get item(): T {
    return this._item;
  }
  set item(value: T) {
    this._item = value;
  }
}
