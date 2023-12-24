import P5 from "p5"
import { Star } from "../lib/Star"
import { Vector2 } from "../lib/Vector2";
/**
 * @class ShootingStar
 */
export class ShootingStar {
  private canvas: P5.Graphics;
  private position: Vector2;
  private velocity: Vector2;
  private acceleration: Vector2;
  private mass: number;
  private size: number;
  /**
   * @constructor
   * @param canvas 
   * @param position 
   * @param velocity 
   * @param acceleration 
   */
  constructor(canvas: P5.Graphics, position: Vector2, velocity: Vector2, acceleration: Vector2) {
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.mass = 1.0;
    this.size = canvas.floor(canvas.random(16, 32));
  }
  
  /**
   * 
   * @param force 
   */
  public applyForce(force: Vector2) {
    let f = Vector2.div(force, this.mass);
    this.acceleration.add(f);
  }

  public update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  /**
   * 
   */
  public draw() {
    const star = new Star(this.canvas, this.position, this.size, 5);
    star.draw(this.canvas.color(255, 255, 100));
  }
  /**
   * 
   */
  public checkEdge() {
    const width2 = this.canvas.width * 0.5;
    const height2 = this.canvas.height * 0.5;
    if (this.position.x > width2) {
      this.position.x = -width2;
      // this.position.y = this.canvas.random(-height2 + this.size, height2 - this.size);
      this.velocity.x = 0;
    } 

    if(this.position.y > height2){
      this.position.y = -height2;
      this.position.x = this.canvas.random(-width2 + this.size, width2 - this.size);
      this.velocity.y = 0;
    }
  }
}