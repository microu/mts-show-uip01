import "./style.css";
import { ShowPage } from "./showPage";
import { showPageRoot } from "./showPageData";

document
  .querySelector<HTMLDivElement>("#app")!
  .appendChild(new ShowPage(showPageRoot).root);
