type Heading1Type = {
  classList: string[],
  textContents: string,
}
/**
 * HTMLHeadingElementの作成
 * @param props 
 * @returns 
 */
export const Heading1 = (props: Heading1Type): HTMLHeadingElement => {
  const title = document.createElement("h1");
  title.classList.add(...props.classList);
  title.textContent = props.textContents;
  return title;
}