import { MenuData } from "../../data/menuData";
import { Anchor } from "./Anchor";
import { List } from "./List";
import { UList } from "./UList";

type MenuListType = {
  menuData: MenuData[];
}

type MenuListData = {
  menuList: HTMLUListElement,
  menuListData: HTMLLIElement[]
}

/**
 * menuList
 * @param props 
 * @returns 
 */
export const MenuList = (props: MenuListType): MenuListData => {
  const menuList = UList({ classList: ["menuList"] })
  const menuListData: HTMLLIElement[] = [];
  props.menuData.forEach((data) => {
    const list = List({ classList: ["list"] })
    const navigationLink = Anchor({ classList: data.clasList, href: data.href, textContent: data.text })
    menuList.appendChild(list)
    list.appendChild(navigationLink);
    menuListData.push(list);
  })
  const data: MenuListData = { menuList: menuList, menuListData: menuListData }
  return data;
}