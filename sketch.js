let wBox
let font
let fontn
let sData='Happy Birthday'
let wData='ISA'
let points=[]
let particals=[]
let check=0
function preload(){
 font=loadFont('txt1.ttf')
 fontn=loadFont('txt.ttf')
 bell=loadSound('music1.mp3')
 song=loadSound('birthday.mp3')
}

class Partical{
    constructor(x,y,x1,y2,r=int(random(255)),g=int(random(255)), b=int(random(255))){
    this.color=color (r,g,b)
    this.pos=createVector(x, y) 
    this.dest=createVector(x1,y2)
    this.acc=p5.Vector.random2D().setMag(0.1)
    this.vel=createVector(0,0)
}

update(){
    let tmp=p5.Vector.sub(this.dest, this.pos)
    if (tmp.mag()>2){
        this.acc-this.acc.rotate(0.05)
        this.vel.add(tmp)
        this.vel.limit(2)
        this.pos.add(this.vel)
    }
    else{
        this.pos=this.dest
    }}

disp(){
    this.update()
    fill(this.color)
    circle(this.pos.x, this.pos.y,5)
}
}

function setup(){
    pixelDensity(1)
    bell.setVolume(0.1)
    createCanvas(window.innerWidth, window.innerHeight);
    textFont(font)
    tSize=1000
    while(1){
        let tmp=font.textBounds (sData,0,0,tSize)
        if(tmp.w>width-40 || tmp.h>height/2.5){
            tSize-=5
        }
        else{
            break
        }
    }
    wBox=font.textBounds (sData,0,0,tSize)
    wxdt=(width/2-wBox.x)-wBox.w/2
    wydt=height/2-20
    tpoints=font.textToPoints (sData,0,0,tSize,{
    sampleFactor:0.08
    })
    tSize=1000
    while(1){
        let tmp=fontn.textBounds (wData,0,0,tSize)
        if(tmp.w>width-40 || tmp.h>height/2.5){
            tSize-=5
        }
        else{
            break
        }
    }
    nBox=fontn.textBounds (wData,0,0,tSize)
    nxdt=(width/2-nBox.x)-nBox.w/2
    nydt=wydt+nBox.h+10
    t1points=fontn.textToPoints (wData,0,0,tSize,{
        sampleFactor:0.08})
    points=[...tpoints.map(point=> ({x:point.x+wxdt,y: point.y+wydt,z:0})),
    ...t1points.map(point=>({x:point.x+nxdt,y:point.y+nydt,z:1}))]
}

function draw() {
background(10);
for (let i=0;i<particals.length;i++){
particals[i].disp()
}

// noFill()
// noStroke()
if (mouseIsPressed && points.length>0){
let tmp=points.splice (int(random(points.length)),1) 
if(int(random(10))==5){
            bell.play()}
if(tmp[0].z==0)
    particals.push(new Partical (mouseX, mouseY, tmp[0].x, tmp[0].y))
else
    particals.push(new Partical(mouseX,mouseY,tmp[0].x,tmp[0].y,255,255,255))

if(points.length==0){
    song.play()
}
}
}