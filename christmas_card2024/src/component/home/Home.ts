import { Menu } from "../common/Menu";
import { Heading1 } from "../base/Heading1";
import { Main } from "../base/Main";
type HomeType = {
  mainBody: HTMLElement,
}
/**
 * Home画面の作成
 */
export const Home = (props: HomeType) => {
  
  Menu({ mainBody: props.mainBody });
  const main = Main({ classList: ["wrapper", "home"] });
  const homeTitle = Heading1({ classList: ["homeTitle"], textContents: "Sketch Book" });
  props.mainBody.appendChild(main);
  main.appendChild(homeTitle);
}