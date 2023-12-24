type ListType = {
  classList: string[],
}

/**
 * HTMLLIElementの作成
 * @param props 
 * @returns 
 */
export const List = (props: ListType): HTMLLIElement => {
  const list = document.createElement("li");
  list.classList.add(...props.classList);
  return list;
}