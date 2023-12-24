type ContainerDivType = {
  classList: string[]
}

/**
 * divnの作成
 * @param props 
 * @returns 
 */
export const ContainerDiv = (props: ContainerDivType): HTMLDivElement => {
  const menuPanel = document.createElement("div");
  menuPanel.classList.add(...props.classList);
  return menuPanel;
}