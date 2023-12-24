import P5 from "p5"
export class DrawingText {
  private canvas: P5.Graphics; 
  private position: P5.Vector;
  private font: P5.Font; 
  private fontSize: number; 
  private message: string
  constructor(canvas: P5.Graphics, position: P5.Vector, font: P5.Font, fontSize: number, message: string){
    this.canvas = canvas;
    this.position = position;
    this.font = font;
    this.fontSize = fontSize;
    this.message = message;
  }

  public draw(){
    this.canvas.push();
    this.canvas.fill(255, 255, 255);
    this.canvas.textFont(this.font);
    this.canvas.textAlign(this.canvas.CENTER, this.canvas.CENTER);
    this.canvas.textSize(this.fontSize);
    this.canvas.translate(this.position.x, this.position.y, this.position.z);
    this.canvas.text(this.message, 0, 0);
    this.canvas.pop();
  }
}