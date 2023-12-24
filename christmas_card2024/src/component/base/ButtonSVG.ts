import { loadSVG } from "../../util/loadSVG";
type SVGButtonType = {
  classList: string[],
  imageSrc: string,
}
/**
 * 
 * @param props 
 * @returns 
 */
export const SVGButton = (props: SVGButtonType): HTMLButtonElement => {
  const button = document.createElement("button");
  button.classList.add(...props.classList);
  loadSVG(props.imageSrc).then((svg) => {
    button.innerHTML = svg;
  })

  return button;
}