import { removeAllChildren } from "mts-dom";
import { IUIPiece, UIPBase } from "mts-uip";

export class ContentSwitcher extends UIPBase {
  private _currentContent?: Element;

  constructor(parent: Element, currentContent?: Element) {
    super({ element: parent });
    if (currentContent != undefined) {
      if (!(currentContent.parentElement === parent)) {
        throw new Error("currentContent must be a child of parent.")
      }
      this._currentContent = currentContent
    }
  }


  switchContent(content?: Element | IUIPiece) {

    if (content != undefined) {
      const domContent = content instanceof Element ? content : content.root;
      
      if (this._currentContent) {
        this.root.replaceChild(domContent, this._currentContent)
      } else {
        this.root.appendChild(domContent)
      }
      
      this._currentContent = domContent;

    } else {
      if (this._currentContent) {
        this.root.removeChild(this._currentContent)
      }
      this._currentContent = undefined;
    }



  }
}
