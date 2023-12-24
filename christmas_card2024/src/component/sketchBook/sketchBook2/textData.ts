import P5 from "p5";
import { Vector2 } from "../lib/Vector2";
type TextData = {
  position: Vector2,
  fontSize: number,
  message: string,
}
export const textData = (p: P5) => {
  const fontSize = 14;
  const data: TextData[] = [
    { position: new Vector2(0.0, -p.height * 0.4), fontSize: 72, message: "Merry Christmas" },
  ];

  return data;
}