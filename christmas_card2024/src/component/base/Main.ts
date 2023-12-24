type MainType = {
  classList: string[]
}

/**
 * mainタグの作成
 * @param props 
 * @returns 
 */
export const Main = (props: MainType): HTMLElement => {
  const main = document.createElement("main");
  main.classList.add(...props.classList);
  return main;
}