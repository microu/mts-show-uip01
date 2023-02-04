import "./style.css";
import { ShowPage } from "./showPage";
import { showPageItems } from "./showPageData";

const showPage = new ShowPage(showPageItems);
document.querySelector<HTMLDivElement>("#app")!.appendChild(showPage.root);
