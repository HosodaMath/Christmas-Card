import P5 from "p5"
import { Vector2 } from "../lib/Vector2";
import { DrawingText } from "../lib/DrawingText"
import { SnowFlake } from "../lib/SnowFlake";
import { DrawImage } from "../lib/DrawImage";
import TimesNewRoman from "../../../assets/font/Brush Script.ttf"
import GradationBackground from "../../../assets/image/background4.png"
import TreeImage from "../../../assets/image/Tree.png";
import SnowMan from "../../../assets/image/SnowMan2.png";
import BaseVertexShader from "../../../assets/shader/base.vert?raw";
import BlurFragmentShader1 from "../../../assets/shader/blur.frag?raw";
import BlurFragmentShader2 from "../../../assets/shader/blur.frag?raw";
import BloomFragmentShader from "../../../assets/shader/bloom.frag?raw";
import { textData } from "./textData";
export const sketchBook2 = () => {
  const sketch = (p: P5) => {
    let font: P5.Font;
    let backgroundImage: P5.Image;
    let treeImage: P5.Image;
    let snowManImage: P5.Image;
    p.preload = () => {
      font = p.loadFont(TimesNewRoman);
      backgroundImage = p.loadImage(GradationBackground);
      treeImage = p.loadImage(TreeImage);
      snowManImage = p.loadImage(SnowMan);
    }

    let canvas: P5.Graphics;
    let tree: DrawImage[];
    let snowMan: DrawImage[];
    let snowFlake: SnowFlake[];
    let sketchText: DrawingText[];
    let blurShader1: P5.Shader, blurShader2: P5.Shader, bloomShader: P5.Shader;
    let blurCanvas1: P5.Graphics, blurCanvas2: P5.Graphics, bloomCanvas: P5.Graphics;
    p.setup = () => {
      // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.createCanvas(1280, 720, p.WEBGL);
      p.noStroke();
      // p.noLoop();
      canvas = p.createGraphics(p.width, p.height, p.WEBGL);
      canvas.noStroke();
      // Drawing SnowMan
      snowMan = [];
      const shiftScale1 = 200;
      [...Array(10).keys()].forEach((index) => {
        if (index % 2 == 0) {
          const positionX = -p.width * 0.5 + index * shiftScale1;
          const positionY = p.height * 0.175;
          const position = new Vector2(positionX, positionY);
          const scale = 0.275;
          snowMan.push(new DrawImage(canvas, position, scale, snowManImage));
        }
      });
      // Drawing Forest
      tree = [];
      const shiftScale2 = 230;
      [...Array(10).keys()].forEach((index) => {
        const positionX = -p.width * 0.5 + index * shiftScale2;
        const positionY = -p.height * 0.25;
        const position = new Vector2(positionX, positionY);
        const scale = 1.0;
        tree.push(new DrawImage(canvas, position, scale, treeImage));
      });

      // Drawing Snow
      snowFlake = [];
      [...Array(20).keys()].forEach((_index) => {
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


      blurCanvas1 = p.createGraphics(p.width, p.height, p.WEBGL);
      blurCanvas1.noStroke();
      blurShader1 = blurCanvas1.createShader(BaseVertexShader, BlurFragmentShader1);

      blurCanvas2 = p.createGraphics(p.width, p.height, p.WEBGL);
      blurCanvas2.noStroke();
      blurShader2 = blurCanvas2.createShader(BaseVertexShader, BlurFragmentShader2);

      bloomCanvas = p.createGraphics(p.width, p.height, p.WEBGL);
      bloomCanvas.noStroke();
      bloomShader = bloomCanvas.createShader(BaseVertexShader, BloomFragmentShader);
    };

    p.draw = () => {
      p.background(0, 0, 0);
      canvas.push();
      canvas.fill(200, 40, 5);
      canvas.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      // canvas.rect(0, 0, p.width, p.height);
      canvas.image(backgroundImage, 0, 0);
      canvas.pop();
      // Draw SnowMan
      [...Array(snowMan.length).keys()].forEach((index) => {
        snowMan[index].draw();
      });
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
      // Draw Snow Hill
      canvas.beginShape();
      canvas.vertex(-p.width * 0.5, p.height * 0.5, 0.0);
      canvas.vertex(-p.width * 0.5, p.height * 0.3, 0.0);
      canvas.vertex(p.width * 0.5, p.height * 0.3, 0.0);
      canvas.vertex(p.width * 0.5, p.height * 0.5, 0.0);
      canvas.endShape();


      // Drawing message
      [...Array(sketchText.length).keys()].forEach((index) => {
        sketchText[index].draw(p.color(200, 200, 0));
      })


      const uResolution = [p.width, p.height];
      const texelSize1 = [1.0 / blurCanvas1.width, 1.0 / blurCanvas1.height]
      const direction1 = [1.0, 0.0];
      blurCanvas1.background(0, 0, 0);
      blurCanvas1.push();
      blurCanvas1.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      blurCanvas1.shader(blurShader1);
      blurShader1.setUniform("uResolution", uResolution);
      blurShader1.setUniform("texelSize", texelSize1);
      blurShader1.setUniform("direction", direction1);
      blurShader1.setUniform("uTexture", canvas);
      blurCanvas1.rect(0, 0, blurCanvas1.width, blurCanvas1.height);
      blurCanvas1.resetShader();
      blurCanvas1.pop();

      const texelSize2 = [1.0 / blurCanvas2.width, 1.0 / blurCanvas2.height]
      const direction2 = [0.0, 1.0];
      blurCanvas2.background(0, 0, 0);
      blurCanvas2.push();
      blurCanvas2.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      blurCanvas2.shader(blurShader2);
      blurShader2.setUniform("uResolution", uResolution);
      blurShader2.setUniform("texelSize", texelSize2);
      blurShader2.setUniform("direction", direction2);
      blurShader2.setUniform("uTexture", blurCanvas1);
      blurCanvas2.rect(0, 0, blurCanvas2.width, blurCanvas2.height);
      blurCanvas2.resetShader();
      blurCanvas2.pop();


      bloomCanvas.background(0, 0, 0);
      bloomCanvas.push();
      bloomCanvas.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      bloomCanvas.shader(bloomShader);
      bloomShader.setUniform("uResolution", uResolution);
      bloomShader.setUniform("mouseX", 1.0);
      bloomShader.setUniform("uTexture1", canvas);
      bloomShader.setUniform("uTexture2", blurCanvas2);
      bloomCanvas.rect(0, 0, bloomCanvas.width, bloomCanvas.height);
      bloomCanvas.resetShader();
      bloomCanvas.pop();

      p.push();
      p.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      p.image(bloomCanvas, 0, 0, p.width, p.height);
      p.pop();
    };

    p.windowResized = () => {
      const width = p.windowWidth;
      const height = p.windowHeight;
      p.resizeCanvas(width, height);
      canvas.resizeCanvas(width, height);
      blurCanvas1.resizeCanvas(width, height);
      blurCanvas2.resizeCanvas(width, height);
      bloomCanvas.resizeCanvas(width, height);
    }
  };

  new P5(sketch);
}