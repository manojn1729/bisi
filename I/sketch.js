let pos;
let startRun=true;
let balls=[]
let ground=[]
let textPoints=[]
var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    Body=Matter.Body,
    Composite = Matter.Composite;
let ballSize=15
let previousCollision=[]
let idCollision=[]
let keySongs=[]
let bSong
const detector=Matter.Detector.create()

function preload(){
    font=loadFont('wsl.ttf')
    for(let i=1;i<3;i++){
      keySongs.push(loadSound(`sound/${i}.mp3`))
    }
    bSong=loadSound('sound/birthday.mp3')
}

function setupPoints(textData="ISA"){
    textFont(font)
    textBox=getTextBound(textData)
    textSize(textBox.s)
    textP=font.textToPoints(textBox.t,0,height,textBox.s,{sampleFactor:0.02})
    dx=width/2-(textBox.x+textBox.w/2)
    dy=height/2-(textBox.y+textBox.h/2)
    for(let i=0;i<textP.length;i++){
        let x=textP[i]
        x.x=x.x+dx;
        x.y=x.y+dy;
        textPoints[i]=x
    }
    for(i of keySongs){
      i.setVolume(0.1)
    }
    // textPoints=textPoints.slice(0,3)
    // textPoints=textPoints.filter((x,i)=>i%2==0)
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1)
  engine=Engine.create()
  Engine.constraintIterations=4
  runner=Runner.create()
  Runner.run(runner,engine)
  setupPoints()
  addBoundry()
  // for(let i=0;i<textPoints.length-2;i++){
  //   balls.push(new Ball())
  // }
  // Matter.Detector.setBodies(detector,balls.map(x=>x.object))
}

function draw() {
  // for(i of textPoints){
  //   ellipse(i.x,i.y,15,15)
  // }
  if(startRun){
    background(0)
    if(mouseIsPressed==true){
      startRun=false
      if(startRun==false){
      for(let i=0;i<textPoints.length-2;i++){
        balls.push(new Ball())
      }
      Matter.Detector.setBodies(detector,balls.map(x=>x.object))
      }
    }}
  else{
  background(0,0,0,15);
  colorMode(HSB,360,100,100,100)
  engine.world.gravity.x=map(rotationY,-PI,PI,-2.001,2.001)
  engine.world.gravity.y=map(rotationX,-PI,PI,-2.001,2.001)
  ellipseMode(CENTER)
  for(let i of balls ){
    i.draw()
    i.checkReached(textPoints)
  }

  if(accelerationX>8){
    for(let i of textPoints){
      fill(100)
      ellipse(i.x,i.y,ballSize/2,ballSize/2)
    }
  }
  // if (mouseIsPressed){
  //   engine.world.gravity.x=1
  //   engine.world.gravity.y=1
  // }
  // else{
  //   engine.world.gravity.x=-0.2
  //   engine.world.gravity.y=-0.2
  // }
  if(balls.map(x=>x.object.isStatic).reduce((a,c)=>a*c,1)){
    if(!(bSong.isPlaying())){
      bSong.play()
    }
  }
  {
    allCollisions=Matter.Detector.collisions(detector)
    uniqueCollisions=allCollisions.map(x=>x.bodyA.id).concat(allCollisions.map(x=>x.bodyB.id))
    uniqueCollisions=[... new Set(uniqueCollisions)]
    presentCollisions=uniqueCollisions.filter(x=>!previousCollision.includes(x))
    previousCollision=uniqueCollisions;
    if(presentCollisions.length>0){
      print('detected')
      idCollision=balls.map(x=>x.object.id)
      idCollision=presentCollisions.map(p=>(idCollision.indexOf(p)))
      for(i of idCollision){
        balls[i].changeColor()
      }
          let tmp=floor(random(0,keySongs.length))
          if(!(keySongs[tmp].isPlaying())){
            keySongs[tmp].play()
          }
    }
  }
  
  }
}

function addBoundry(){
  let options={
    isStatic:true,
    restitution:0.8
  }
  ground.push(Bodies.rectangle(width/2,height+10,width,20,options))
  ground.push(Bodies.rectangle(width/2,-10,width,20,options))
  ground.push(Bodies.rectangle(-10,height/2,20,height,options))
  ground.push(Bodies.rectangle(width+10,height/2,20,height,options))
  for(i of ground){
    i.restitution=1
  }
  Composite.add(engine.world,ground)
}

function getTextBound(text){
    let tSize=1000
    while(true){
        let textBox=font.textBounds(text,0,height,tSize)
        if(textBox.w+textBox.x>width-100 || textBox.h>(height-100)){
            tSize-=5
            if(tSize>1000 || tSize<0){
                break
            }
        }
        else{
            return {"s":tSize,"t":text,...textBox}
        }
    }
}
