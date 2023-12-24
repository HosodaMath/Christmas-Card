import P5 from "p5"
import { Vector2 } from "./Vector2";
export class DrawingText {
  private canvas: P5.Graphics; 
  private position: Vector2;
  private font: P5.Font; 
  private fontSize: number; 
  private message: string
  constructor(canvas: P5.Graphics, position: Vector2, font: P5.Font, fontSize: number, message: string){
    this.canvas = canvas;
    this.position = position;
    this.font = font;
    this.fontSize = fontSize;
    this.message = message;
  }

  public draw(color: P5.Color){
    this.canvas.push();
    this.canvas.fill(color);
    this.canvas.textFont(this.font);
    this.canvas.textAlign(this.canvas.CENTER, this.canvas.CENTER);
    this.canvas.textSize(this.fontSize);
    this.canvas.translate(this.position.x, this.position.y, 0.0);
    this.canvas.text(this.message, 0, 0);
    this.canvas.pop();
  }
}