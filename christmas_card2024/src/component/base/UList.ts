type UListType = {
  classList: string[],
}

/**
 * HTMLUListElementの作成
 * @param props 
 * @returns 
 */
export const UList = (props: UListType): HTMLUListElement => {
  const menuList = document.createElement("ul");
  menuList.classList.add(...props.classList);
  return menuList;
}