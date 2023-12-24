/**
 * svgコードを読み込みむ
 * @param url 
 * @returns 
 */
export const loadSVG = async (url: string): Promise<string> => {
  const code = await fetch(url);
  const svg = await code.text();
  return svg;
}