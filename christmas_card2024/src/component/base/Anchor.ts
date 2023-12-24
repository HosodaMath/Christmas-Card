type AnchorType = {
  classList: string[],
  href: string,
  textContent: string,
}

/**
 * HTMLAnchorElementの作成
 * @param props 
 * @returns 
 */
export const Anchor = (props: AnchorType): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.classList.add(...props.classList);
  link.href = props.href;
  link.textContent = props.textContent;
  return link;
}