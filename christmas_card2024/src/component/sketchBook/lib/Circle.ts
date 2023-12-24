import P5 from "p5"
export class Circle {
  private canvas: P5;
  private segments: number;
  constructor(canvas: P5, segments: number = 64) {
    this.canvas = canvas;
    this.segments = segments;
  }

  public draw() {
    this.canvas.beginShape();
    [...Array(this.segments).keys()].forEach((theta) => {
      const radian = (this.canvas.radians(360) / this.segments) * theta;
      const x = Math.cos(radian);
      const y = Math.sin(radian);
      const z = 0;
      this.canvas.vertex(x, y, z);
      // const u = 0.5 + Math.cos(radian) * 0.5;
      // const v = 0.5 + Math.sin(radian) * 0.5;
      // this.canvas.vertex(x, y, z, u, v);
    })
    this.canvas.endShape();
  }
}