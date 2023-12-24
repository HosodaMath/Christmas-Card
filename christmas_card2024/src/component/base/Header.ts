type HeaderType = {
  classList: string[]
}

/**
 * headerの作成
 * @param props 
 * @returns 
 */
export const Header = (props: HeaderType): HTMLElement => {
  const menuHeader = document.createElement("header");
  menuHeader.classList.add(...props.classList);
  return menuHeader;
}