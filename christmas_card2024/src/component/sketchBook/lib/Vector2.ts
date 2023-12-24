export class Vector2 {
  public x: number;
  public y: number;
  /**
   * 
   * @param x 
   * @param y 
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * @description
   * @returns 
   */
  public getX() {
    return this.x;
  }

  /**
   * @description
   * @returns 
   */
  public getY() {
    return this.y;
  }

  public copy(){
    return new Vector2(this.x, this.y);
  }

  /**
   * @description
   * @param x 
   */
  public setX(x: number) {
    this.x = x;

    return this;
  }

  /**
   * @description
   * @param y 
   */
  public setY(y: number) {
    this.y = y;

    return this;
  }

  /**
   * @description
   * @param w 
   * @returns 
   */
  public add(w: Vector2) {
    this.x += w.x;
    this.y += w.y;

    return this;
  }

  /**
   * @description
   * @param v 
   * @param w
   * @returns 
   */
  public static add(v: Vector2, w: Vector2){
    return new Vector2(v.x + w.x, v.y + w.y);
  }

  /**
   * @description
   * @param w 
   * @returns 
   */
  public sub(w: Vector2) {
    this.x -= w.x;
    this.y -= w.y;

    return this;
  }

  /**
   * @description
   * @param v 
   * @param w 
   * @returns 
   */
  public static sub(v: Vector2, w: Vector2){
    return new Vector2(v.x - w.x, v.y - w.y);
  }

  /**
   * @description
   * @param s 
   * @returns 
   */
  public mult(s: number) {
    this.x *= s;
    this.y *= s;

    return this;
  }

  /**
   * @description
   * @param v 
   * @param s 
   * @returns 
   */
  public static mult(v: Vector2, s: number){
    return new Vector2(v.x * s, v.y * s);
  }

  /**
   * @description
   * @param v 
   * @param w
   * @returns 
   */
  public static multVec(v: Vector2, w: Vector2){
    return new Vector2(v.x * w.x, v.y * w.y);
  }

  /**
   * @description
   * @param s 
   * @returns 
   */
  public div(s: number) {
    this.x /= s;
    this.y /= s;

    return this;
  }
  
  /**
   * @description
   * @param v 
   * @param s 
   * @returns 
   */
  public static div(v: Vector2, s: number){
    return new Vector2(v.x / s, v.y / s);
  }

  /**
   * @description
   * @param v 
   * @param w
   * @returns 
   */
  public static divVec(v: Vector2, w: Vector2){
    return new Vector2(v.x / w.x, v.y / w.y);
  }
  
  /**
   * @description
   * @param v 
   * @returns 
   */
  public dist(v: Vector2): number{
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy + dy);
  }
  
  /**
   * @description
   * @returns 
   */
  public magSq(): number{
    return (this.x * this.x + this.y * this.y);
  }

  /**
   * @description
   * @returns 
   */
  public mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  
  /**
   * @description
   * @returns 
   */
  public normalize(){
    const m = this.mag();
    if(m != 0 && m != 1){
      this.div(m);
    }

    return this;
  }
  
  /**
   * @description
   * @param max 
   * @returns 
   */
  public limit(max: number){
    if(this.magSq() > max * max){
      this.normalize();
      this.mult(max);
    }

    return this;
  }
  
  /**
   * @description
   * @param len 
   * @returns 
   */
  public setMag(len: number){
    this.normalize();
    this.mult(len);
    return this;
  }
  
  /**
   * @description
   * @returns 
   */
  public heading(): number{
    const angle = Math.atan2(this.y, this.x);
    return angle;
  }

}