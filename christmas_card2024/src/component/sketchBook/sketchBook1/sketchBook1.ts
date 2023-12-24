import P5 from "p5"
import { Vector2 } from "../lib/Vector2";
import { DrawingText } from "./DrawingText"
import { ShootingStar } from "./ShootingStar";
import GradationBackground from "../../../assets/image/background3.png"
import TimesNewRoman from "../../../assets/font/Times New Roman.ttf"
import BaseVertexShader from "../../../assets/shader/base.vert?raw";
import BlurFragmentShader1 from "../../../assets/shader/blur.frag?raw";
import BlurFragmentShader2 from "../../../assets/shader/blur.frag?raw";
import BloomFragmentShader from "../../../assets/shader/bloom.frag?raw";
export const sketchBook1 = () => {
  const sketch = (p: P5) => {
    let font: P5.Font;
    let backgroundImage: P5.Image;
    p.preload = () => {
      font = p.loadFont(TimesNewRoman);
      backgroundImage = p.loadImage(GradationBackground);
    }
  
    let canvas: P5.Graphics;
    let shootingStar: ShootingStar[];
    let sketchText1: DrawingText;
    let sketchText2: DrawingText;
    let blurShader1: P5.Shader, blurShader2: P5.Shader, bloomShader: P5.Shader;
    let blurCanvas1: P5.Graphics, blurCanvas2: P5.Graphics, bloomCanvas: P5.Graphics;
    p.setup = () => {
      // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.createCanvas(1280, 720, p.WEBGL);
      p.noStroke();
      canvas = p.createGraphics(p.width, p.height, p.WEBGL);
      // canvas = p.createGraphics(1280, 720, p.WEBGL);
      canvas.noStroke();
      // Drawing star
      shootingStar = [];
      [...Array(20).keys()].forEach((_index) => {
        const positionX = p.random(-p.width * 0.5, p.width * 0.5);
        const positionY = p.random(-p.height * 0.5, p.height * 0.5);
        let position = new Vector2(positionX, positionY);
        let velocity = new Vector2(0, 0);
        let acceleration = new Vector2(0, 0);
        shootingStar.push(new ShootingStar(canvas, position, velocity, acceleration));
      })
      // Drawing message1
      const position1 = p.createVector(0, -p.height * 0.1, 0);
      const fontSize1 = 72;
      const message1 = "Merry Christmas";
      sketchText1 = new DrawingText(canvas, position1, font, fontSize1, message1);
      // Drawing message2
      const position2 = p.createVector(0, p.height * 0.1, 0);
      const fontSize2 = 36;
      const message2 = "...Silent Night";
      sketchText2 = new DrawingText(canvas, position2, font, fontSize2, message2);

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
      // Drawing star 
      [...Array(shootingStar.length).keys()].forEach((index) => {
        const wind = new Vector2(0.05, 0.0);
        const gravity = new Vector2(0.0, 0.01);
        shootingStar[index].applyForce(wind);
        shootingStar[index].applyForce(gravity);
        shootingStar[index].update();
        shootingStar[index].draw();
        shootingStar[index].checkEdge();
      })
      // Drawing message1
      sketchText1.draw();
      // Drawing message2
      sketchText2.draw();

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
      bloomShader.setUniform("mouseX", p.mouseX / bloomCanvas.width);
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