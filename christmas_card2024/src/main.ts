import { Home } from "./component/home/Home";
import "./assets/style/sanitize.scss"
import "./assets/style/main.scss"
import PageNationSound from "./assets/sound/page.mp3";


const main = () => {
  const mainBody = document.body;
  Home({ mainBody: mainBody });
  // PageNation
  const navigationLink = document.querySelector(".navigationLink");
  if (!(navigationLink instanceof HTMLAnchorElement)) {
    throw new Error("Error!!");
  }

  const audioElement = document.createElement("audio");
  audioElement.classList.add(...["audio"]);
  audioElement.src = PageNationSound;
  mainBody.appendChild(audioElement);

  // AudioContextの作成
  const audioContext = new AudioContext();
  const track = audioContext.createMediaElementSource(audioElement);
  // GainNodeを作成 
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5;
  // StereoPannerNodeの作成
  const stereoPanner = audioContext.createStereoPanner();
  stereoPanner.pan.value = 0.0;
  navigationLink.addEventListener("click", () => {
    // console.log("Hello")
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    track.connect(gainNode).connect(stereoPanner).connect(audioContext.destination);
    //再生
    audioElement.play();
    // audioElement.loop = true;
    audioElement.loop = false;
  })
  
}

window.addEventListener("load", main);

