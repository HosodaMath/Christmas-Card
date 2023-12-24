import P5 from "p5"
// import { Vector2 } from "../lib/Vector2";
import { DrawingText } from "../lib/DrawingText"
import BrushScript from "../../../assets/font/Brush Script.ttf"
import GradationBackground from "../../../assets/image/background1.png"
import TreeImage3 from "../../../assets/image/Tree3.png";
import { textData } from "./textData";
import { DrawImage } from "../lib/DrawImage";
import { SnowFlake } from "../lib/SnowFlake";
import { Vector2 } from "../lib/Vector2";
export const sketchBook3 = () => {
  const sketch = (p: P5) => {
    let font: P5.Font;
    let backgroundImage: P5.Image;
    let treeImage: P5.Image;
    p.preload = () => {
      font = p.loadFont(BrushScript);
      backgroundImage = p.loadImage(GradationBackground);
      treeImage = p.loadImage(TreeImage3);
    }

    let canvas: P5.Graphics;
    let sketchText: DrawingText[];
    let tree: DrawImage[];
    let snowFlake: SnowFlake[];
    p.setup = () => {
      p.createCanvas(1280, 720, p.WEBGL);
      p.noStroke();
      // p.noLoop();
      canvas = p.createGraphics(p.width, p.height, p.WEBGL);
      canvas.noStroke();
      // Drawing Forest
      tree = [];
      const shiftScale = 230;
      [...Array(6).keys()].forEach((index) => {
        const positionX = -p.width * 0.5 + index * shiftScale;
        const positionY = -p.height * 0.05;
        const position = new Vector2(positionX, positionY);
        const scale = 1.0;
        tree.push(new DrawImage(canvas, position, scale, treeImage));
      });
       // Drawing Snow
       snowFlake = [];
       [...Array(50).keys()].forEach((_index) => {
         const positionX = p.random(-p.width * 0.5, p.width * 0.5);
         const positionY = p.random(-p.height * 0.5, p.height * 0.5);
         let position = new Vector2(positionX, positionY);
         let velocity = new Vector2(0, 0);
         let acceleration = new Vector2(0, 0);
         snowFlake.push(new SnowFlake(canvas, position, velocity, acceleration));
       });
      // Drawing message
      const data = textData(p);
      sketchText = [];
      [...Array(data.length).keys()].forEach((index) => {
        sketchText.push(new DrawingText(canvas, data[index].position, font, data[index].fontSize, data[index].message));
      });

    };

    p.draw = () => {
      p.background(0, 0, 0);
      canvas.push();
      canvas.fill(200, 40, 5);
      canvas.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      // canvas.rect(0, 0, p.width, p.height);
      canvas.image(backgroundImage, 0, 0);
      canvas.pop();
        // Draw Tree
        [...Array(tree.length).keys()].forEach((index) => {
          tree[index].draw();
      });
      // Drawing Snow Flake 
      [...Array(snowFlake.length).keys()].forEach((index) => {
        const wind = new Vector2(p.random(-0.01, 0.01), 0.0);
        const gravity = new Vector2(0.0, 0.01);
        snowFlake[index].applyForce(wind);
        snowFlake[index].applyForce(gravity);
        snowFlake[index].update();
        snowFlake[index].draw();
        snowFlake[index].checkEdge();
      });
     
      // Drawing message
      [...Array(sketchText.length).keys()].forEach((index) => {
        sketchText[index].draw(p.color(200, 200, 200));
      })

      p.push();
      p.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      p.image(canvas, 0, 0, p.width, p.height);
      p.pop();
    };

    p.windowResized = () => {
      const width = p.windowWidth;
      const height = p.windowHeight;
      p.resizeCanvas(width, height);
      canvas.resizeCanvas(width, height);
    }
  };

  new P5(sketch);
}