type NavigationType = {
  classList: string[]
}

/**
 * navigationの作成
 * @param props 
 * @returns 
 */
export const Navigation = (props: NavigationType): HTMLElement => {
  const menuNavigation = document.createElement("nav");
  menuNavigation.classList.add(...props.classList);
  return menuNavigation;
}