import P5 from "p5";
import { Vector2 } from "../lib/Vector2";
type TextData = {
  position: Vector2,
  fontSize: number,
  message: string,
}
export const textData = (p: P5) => {
  const fontSize = 96;
  const data: TextData[] = [
    { position: new Vector2(-p.width * 0.20, -fontSize * 2.5), fontSize: 64, message: "Merry" },
    { position: new Vector2(-p.width * 0.20, -fontSize * 1.5), fontSize: 64, message: "Christmas" },
    { position: new Vector2(0.0, -fontSize * 2.0), fontSize: 64, message: "and" },
    { position: new Vector2(p.width * 0.20, -fontSize * 2.5), fontSize: 64, message: "Happy" },
    { position: new Vector2(p.width * 0.20, -fontSize * 1.5), fontSize: 64, message: "new year" },
  ];

  return data;
}