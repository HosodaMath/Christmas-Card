import P5 from "p5";
import { Vector2 } from "./Vector2";
export class Star {
  private p: P5;
  private position: Vector2;
  private radius: number;
  private vertNum: number;
  constructor(p: P5, position: Vector2, radius: number, vertNum: number) {
    this.p = p;
    this.position = position;
    this.radius = radius;
    this.vertNum = vertNum * 2.0;
  }

  public draw(fillColor: P5.Color) {
    let radius = 0;
    let outRadius = this.radius;
    let inRadius = outRadius * 0.5;
    this.p.push();
    this.p.fill(fillColor);
    this.p.translate(this.position.x, this.position.y, 0);
    this.p.rotate(this.p.radians(-90));
    // this.p.rotate(this.p.radians(this.p.frameCount));
    this.p.beginShape();
    [...Array(this.vertNum).keys()].forEach((theta) => {
      if (theta % 2 == 0) {
        radius = outRadius;
      } else {
        radius = inRadius;
      }
      const x = this.p.cos(this.p.radians(360 * theta / this.vertNum));
      const y = this.p.sin(this.p.radians(360 * theta / this.vertNum));
      this.p.vertex(x * radius, y * radius, 0);
    })
    this.p.endShape();
    this.p.pop();
  }
}