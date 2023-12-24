import { Menu } from "./component/common/Menu"
import { sketchBook2 } from "./component/sketchBook/sketchBook2/sketchBook2"
import "./assets/style/sanitize.scss"
import "./assets/style/main.scss"
export const sketch2 = () => {
  const sketchBody = document.body;
  Menu({ mainBody: sketchBody });
  sketchBook2();
}

window.addEventListener("load", sketch2);