import { menuData } from "../../data/data"
import MenuOpenButton from "../../assets/image/openButton.svg"
import MenuCloseButton from "../../assets/image/closeButton.svg"
import { SVGButton } from "../base/ButtonSVG"
import { Header } from "../base/Header"
import { Navigation } from "../base/Navigation"
import { ContainerDiv } from "../base/Container"
import { MenuList } from "../base/MenuList"
type MenuType = {
  mainBody: HTMLElement
}

/**
 * Menu画面の作成
 * @returns 
 */
export const Menu = (props: MenuType): void => {
  const menuHeader = Header({ classList: ["menuHeader"] });
  const menuNavigation = Navigation({ classList: ["menuNavigation"] })
  const menuOpenButton = SVGButton({ classList: ["button", "buttonMenu", "menuOpen"], imageSrc: MenuOpenButton })
  const menuCloseButton = SVGButton({ classList: ["button", "buttonMenu", "menuClose"], imageSrc: MenuCloseButton })
  const menuPanel = ContainerDiv({ classList: ["menuPanel"] })
  const menuList = MenuList({ menuData: menuData });
  const menuListData = menuList.menuListData;

  menuHeader.appendChild(menuNavigation);
  menuNavigation.appendChild(menuOpenButton);
  menuNavigation.appendChild(menuPanel);
  menuPanel.appendChild(menuCloseButton);
  menuPanel.appendChild(menuList.menuList);

  props.mainBody.appendChild(menuHeader);

  menuOpenButton.addEventListener("click", () => {
    menuPanel.animate(
      { translate: ["-50vw", "0vw"] },
      { fill: "forwards", easing: "ease", duration: 1200 });

    menuListData.forEach((list, key) => {
      list.animate(
        { opacity: [0, 1] },
        { fill: "forwards", easing: "ease", delay: 100 * key, duration: 2200 })
    })
  })

  menuCloseButton.addEventListener("click", () => {
    menuPanel.animate(
      { translate: ["0vw", "-50vw"], boxShadow: ["0 15px 10px 5px #f0f8ff75", "0 15px 10px 5px #f0f8ff00"] },
      { fill: "forwards", easing: "ease", duration: 1200 })

    menuListData.forEach((list, key) => {
      list.animate(
        { opacity: [1, 0] },
        { fill: "forwards", easing: "ease", delay: 200 * key, duration: 1200 })
    })
  })
}