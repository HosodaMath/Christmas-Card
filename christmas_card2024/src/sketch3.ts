import { Menu } from "./component/common/Menu"
import { sketchBook3 } from "./component/sketchBook/sketchBook3/sketchBook3"
import "./assets/style/sanitize.scss"
import "./assets/style/main.scss"
export const sketch3 = () => {
  const sketchBody = document.body;
  Menu({ mainBody: sketchBody });
  sketchBook3();
}

window.addEventListener("load", sketch3);