import P5 from "p5";
import { Vector2 } from "./Vector2";
export class DrawImage {
  private canvas: P5.Graphics;
  private position: Vector2;
  private scale: number;
  private image: P5.Image;
  constructor(canvas: P5.Graphics, position: Vector2, scale: number, image: P5.Image){
    this.canvas = canvas;
    this.position = position;
    this.scale = scale;
    this.image = image;
  }

  public draw(){
    this.canvas.push();
    this.canvas.translate(this.position.x, this.position.y, 0.0);
    this.canvas.scale(this.scale);
    this.canvas.image(this.image, 0, 0);
    this.canvas.pop();
  }
}