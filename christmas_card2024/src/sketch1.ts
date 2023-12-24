import { Menu } from "./component/common/Menu"
import { sketchBook1 } from "./component/sketchBook/sketchBook1/sketchBook1"
import "./assets/style/sanitize.scss"
import "./assets/style/main.scss"
export const sketch1 = () => {
  const sketchBody = document.body;
  Menu({ mainBody: sketchBody });
  sketchBook1();
}

window.addEventListener("load", sketch1);