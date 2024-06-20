const canvas = document.querySelector("canvas");
const desc = document.querySelector(".main-desc");

let helps = [
    "Fivem ATM Hacking Minigame recreated by Walker V",
    "Navigate with W,A,S,D and confirm with Space for the left code block.",
    "Use the Arrow Keys and ENTER for the right code block"
]

setInterval(() => {
    let help = helps[Math.floor(Math.random()*helps.length)]
    desc.innerText = help;
}, 10000);

let width = 18;
let height = 10;
let blockSize = 50;
var countdown;

const app = new PIXI.Application({
    view: canvas,
    width: width*blockSize,
    height: height*blockSize,
    backgroundColor: 0x181818
});

app.ticker.maxFPS = 5;

const graphics = new PIXI.Graphics();

let state = "main";

const mainScene = new PIXI.Container();
const gameScene = new PIXI.Container();
var updateScene;

const style = new PIXI.TextStyle({ fill: "#21B700", fontSize: 50 });
const startGame = new PIXI.Text("Start Game", style);
startGame.interactive = true;
startGame.buttonMode = true;
startGame.anchor.set(0.5, 0.5);
startGame.position.set((width*blockSize)/2, (height*blockSize)/2);
startGame.on('click', () => {
    app.stage.removeChild(mainScene);
    app.stage.addChild(gameScene);
    updateScene = createGameScene(gameScene);
    state = "game";
});
mainScene.addChild(startGame);

const winScene = new PIXI.Container();
const success = new PIXI.Text("ATM Hacked Successfully", style);
success.anchor.set(0.5, 0.5);
success.position.set((width*blockSize)/2, (height*blockSize)/2);
winScene.addChild(success);

const loseScene = new PIXI.Container();
const failure = new PIXI.Text("Failure", style);
failure.anchor.set(0.5, 0.5);
failure.position.set((width*blockSize)/2, (height*blockSize)/2);
loseScene.addChild(failure);

function createGameScene() {
    for(let w=0; w<width; w++){
        for(let h=0; h<height; h++){
            graphics.lineStyle(2, 0xD7F0D7, 1);
            graphics.beginFill(0x181818);
            graphics.drawRect(w*blockSize, h*blockSize, blockSize, blockSize);
            graphics.endFill();
        }
    }

    graphics.beginFill(0x181818);
    graphics.drawRect(3*blockSize,0, 12*blockSize, blockSize);
    graphics.endFill();

    gameScene.addChild(graphics);

    const strstyle = new PIXI.TextStyle({ fill: "#21B700", fontSize: 25, fontWeight: "bold"});

    for(let w=0; w<width; w++){
        for(let h=1; h<height; h++){
            let str = genStr(1);
            let strText = new PIXI.Text(str, strstyle);
            strText.position.set((w*blockSize)+18, (h*blockSize)+12);
            gameScene.addChild(strText);
            setInterval(() => {
                let str2 = genStr(1);
                strText.text = str2;
            }, 200);
        }
    }

    let firstF = genStr(1);
    let firstS = genStr(1);
    let firstT = genStr(1);

    let secondF = genStr(1);
    let secondS = genStr(1);
    let secondT = genStr(1);

    let firstRandomX = randomInteger(0, width-3);
    let firstRandomY = randomInteger(1, height-1);

    let secondRandomX = randomInteger(0, width-3);
    let secondRandomY = randomInteger(1, height-1);

    while(firstRandomX == secondRandomX || firstRandomX+1 == secondRandomX || firstRandomX+2 == secondRandomX || secondRandomX+1 == firstRandomX || secondRandomX+2 == firstRandomX){
        secondRandomX = randomInteger(0, width-3);
    }
    
    let savedZones = new PIXI.Graphics();
    savedZones.lineStyle(2, 0xD7F0D7, 1);
    savedZones.beginFill(0x181818);
    savedZones.drawRect(firstRandomX*blockSize, firstRandomY*blockSize, blockSize, blockSize);
    savedZones.drawRect((firstRandomX+1)*blockSize, firstRandomY*blockSize, blockSize, blockSize);
    savedZones.drawRect((firstRandomX+2)*blockSize, firstRandomY*blockSize, blockSize, blockSize);
    savedZones.drawRect(secondRandomX*blockSize, secondRandomY*blockSize, blockSize, blockSize);
    savedZones.drawRect((secondRandomX+1)*blockSize, secondRandomY*blockSize, blockSize, blockSize);
    savedZones.drawRect((secondRandomX+2)*blockSize, secondRandomY*blockSize, blockSize, blockSize);
    savedZones.endFill();
    gameScene.addChild(savedZones);

    let firstTextF = new PIXI.Text(firstF, strstyle);
    firstTextF.position.set((firstRandomX*blockSize)+18, (firstRandomY*blockSize)+12);
    gameScene.addChild(firstTextF);
    let firstTextS = new PIXI.Text(firstS, strstyle);
    firstTextS.position.set(((firstRandomX+1)*blockSize)+18, (firstRandomY*blockSize)+12);
    gameScene.addChild(firstTextS);
    let firstTextT = new PIXI.Text(firstT, strstyle);
    firstTextT.position.set(((firstRandomX+2)*blockSize)+18, (firstRandomY*blockSize)+12);
    gameScene.addChild(firstTextT);

    let secondTextF = new PIXI.Text(secondF, strstyle);
    secondTextF.position.set((secondRandomX*blockSize)+18, (secondRandomY*blockSize)+12);
    gameScene.addChild(secondTextF);
    let secondTextS = new PIXI.Text(secondS, strstyle);
    secondTextS.position.set(((secondRandomX+1)*blockSize)+18, (secondRandomY*blockSize)+12);
    gameScene.addChild(secondTextS);
    let secondTextT = new PIXI.Text(secondT, strstyle);
    secondTextT.position.set(((secondRandomX+2)*blockSize)+18, (secondRandomY*blockSize)+12);
    gameScene.addChild(secondTextT);

    let firstSaved = new PIXI.Container();

    let startZone1 = new PIXI.Graphics();
    startZone1.lineStyle(2, 0xA8BFA6, 1);
    startZone1.beginFill(0xD6F4D4);
    startZone1.drawRect(0*blockSize, 0*blockSize, blockSize, blockSize);
    startZone1.drawRect(1*blockSize, 0*blockSize, blockSize, blockSize);
    startZone1.drawRect(2*blockSize, 0*blockSize, blockSize, blockSize);
    startZone1.endFill();
    firstSaved.addChild(startZone1);

    let firstTextFS = new PIXI.Text(firstF, strstyle);
    firstTextFS.position.set((0*blockSize)+18, (0*blockSize)+12);
    firstSaved.addChild(firstTextFS);
    let firstTextSS = new PIXI.Text(firstS, strstyle);
    firstTextSS.position.set((1*blockSize)+18, (0*blockSize)+12);
    firstSaved.addChild(firstTextSS);
    let firstTextTS = new PIXI.Text(firstT, strstyle);
    firstTextTS.position.set((2*blockSize)+18, (0*blockSize)+12);
    firstSaved.addChild(firstTextTS);

    let secondSaved = new PIXI.Container();

    let startZone2 = new PIXI.Graphics();
    startZone2.lineStyle(2, 0xA8BFA6, 1);
    startZone2.beginFill(0xD6F4D4);
    startZone2.drawRect((width-3)*blockSize, 0*blockSize, blockSize, blockSize);
    startZone2.drawRect((width-2)*blockSize, 0*blockSize, blockSize, blockSize);
    startZone2.drawRect((width-1)*blockSize, 0*blockSize, blockSize, blockSize);
    startZone2.endFill();
    secondSaved.addChild(startZone2);

    let secondTextFS = new PIXI.Text(secondF, strstyle);
    secondTextFS.position.set(((width-3)*blockSize)+18, (0*blockSize)+12);
    secondSaved.addChild(secondTextFS);
    let secondTextSS = new PIXI.Text(secondS, strstyle);
    secondTextSS.position.set(((width-2)*blockSize)+18, (0*blockSize)+12);
    secondSaved.addChild(secondTextSS);
    let secondTextTS = new PIXI.Text(secondT, strstyle);
    secondTextTS.position.set(((width-1)*blockSize)+18, (0*blockSize)+12);
    secondSaved.addChild(secondTextTS);

    gameScene.addChild(firstSaved);
    gameScene.addChild(secondSaved);

    let time = new PIXI.Text("15:00", strstyle);
    time.position.set((width*blockSize)/2, blockSize/2);
    time.anchor.set(0.5,0.5);
    gameScene.addChild(time);

    const keysMaps = {};
    const speed = 10;

    document.onkeydown = (event) => {
        keysMaps[event.code] = true;
    };

    document.onkeyup = (event) => {
        keysMaps[event.code] = false;
    };

    let countdown = new Countdown(time, 15);
    countdown.start();

    let completed = 0;
    let spaceUsed = false;
    let enterUsed = false;

    return (delay) => {
        if (keysMaps['KeyA'] &&  (firstSaved.position.x>0)) {
            firstSaved.position.x -= blockSize;
        }
        if (keysMaps['KeyD'] && (firstSaved.position.x<(width*blockSize)-(3*blockSize))) {
            firstSaved.position.x += blockSize;
        }
        if (keysMaps['KeyW'] && (firstSaved.position.y>0)) {
            firstSaved.position.y -= blockSize;
        }
        if (keysMaps['KeyS'] && (firstSaved.position.y<(height-1)*blockSize)) {
            firstSaved.position.y += blockSize;
        }

        if (keysMaps['ArrowLeft'] && secondSaved.position.x > -15*blockSize) {
            secondSaved.position.x -= blockSize;
        }
        if (keysMaps['ArrowRight'] && secondSaved.position.x<0) {
            secondSaved.position.x += blockSize;
        }
        if (keysMaps['ArrowUp'] && (secondSaved.position.y>0)) {
            secondSaved.position.y -= blockSize;
        }
        if (keysMaps['ArrowDown'] && (secondSaved.position.y<(height-1)*blockSize)) {
            secondSaved.position.y += blockSize;
        }

        if (keysMaps['Space'] ){
            if(firstSaved.position.x == firstRandomX*blockSize && firstSaved.position.y == firstRandomY*blockSize){
                if(spaceUsed == false) { 
                    completed++;
                    spaceUsed = true; 
                }
            } else {
                app.stage.removeChild(gameScene);
                app.stage.addChild(loseScene)
            }
        }   

        if (keysMaps['Enter'] ){
            let x = 750+secondSaved.position.x;
            if(x == secondRandomX*blockSize && secondSaved.position.y == secondRandomY*blockSize){
                if(enterUsed == false) { 
                    completed++;
                    enterUsed = true; 
                }
            } else {
                app.stage.removeChild(gameScene);
                app.stage.addChild(loseScene);
            }
        }

        if(completed == 2){
            countdown.stop();
        }

    }
}

app.stage.addChild(mainScene);

app.ticker.add(
    (delay) => {
        if (state === "game") {
            updateScene(delay);
        }
    }
);

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function Countdown(elem, seconds) {
    var that = {};
  
    that.elem = elem;
    that.seconds = seconds;
    that.totalTime = seconds * 100;
    that.usedTime = 0;
    that.startTime = +new Date();
    that.timer = null;
  
    that.count = function() {
      that.usedTime = Math.floor((+new Date() - that.startTime) / 10);
  
      var tt = that.totalTime - that.usedTime;
      if (tt <= 0) {
        that.elem.text = '00.00';
        clearInterval(that.timer);
        app.stage.removeChild(gameScene);
        app.stage.addChild(loseScene)
      } else {
        var mi = Math.floor(tt / (60 * 100));
        var ss = Math.floor((tt - mi * 60 * 100) / 100);
        var ms = tt - Math.floor(tt / 100) * 100;
  
        that.elem.text = that.fillZero(ss) + "." + that.fillZero(ms);
      }
    };
    
    that.init = function() {
      if(that.timer){
        clearInterval(that.timer);
        that.elem.text = '00.00';
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = +new Date();
        that.timer = null;
      }
    };
  
    that.start = function() {
      if(!that.timer){
         that.timer = setInterval(that.count, 1);
      }
    };

    that.stop = function() {
        if (that.timer) clearInterval(that.timer);
        app.stage.removeChild(gameScene);
        app.stage.addChild(winScene);
    };

    that.fillZero = function(num) {
        return num < 10 ? '0' + num : num;
    };

    return that;
}
