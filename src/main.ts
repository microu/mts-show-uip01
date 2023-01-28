import "./style.css";
import { ShowPage } from "./showPage";
import { showPageRoot } from "./showPageData";

const showPage = new ShowPage(showPageRoot);
showPage.setRootItem(showPageRoot[0]);
document.querySelector<HTMLDivElement>("#app")!.appendChild(showPage.root);
