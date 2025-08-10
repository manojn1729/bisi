let delay=6
let frame_count=1
let rotationHistory = [];
let lastrotationZ = null;
let currentrotationZ=null;
let max_length=null;

function preload(){
  img1=loadImage('a.png')
  img2=loadImage('b.png')
  song_1 = loadSound('engine2.mp3')
  song_2sec = loadSound('short_engine.mp3')
  birthday_song=loadSound('birthday.mp3')

}
function setup(){
  createCanvas(window.innerWidth, window.innerHeight)
  background(0)
  frameRate(120)
  angleMode(DEGREES)
  currentrotationZ=rotationZ
  max_length=sqrt(width*width+height*height)
  ellipseMode(CENTER)
  birthday_song.setVolume(0.5)
  song_1.setVolume(0.3)
  song_2sec.setVolume(0.3)
}


function rotation(){
  t=millis()
  lastrotationZ=currentrotationZ
  currentrotationZ=rotationZ
  let delta_rotation=lastrotationZ-currentrotationZ
  // text(delta_rotation,100,100)
  if (abs(delta_rotation)>100){
    delta_rotation=0
  }
  rotationHistory.push({d:delta_rotation,t:millis()})
  rotationHistory=rotationHistory.filter(x=>(millis()-x.t<1000))
  let result=rotationHistory.reduce((a,c)=>(a+c.d),0)
  // text(result,100,100)
  return result
  
}

let open_width=2
let rotation_angle=0
let z_value=0

function draw(){
  background(25)
  imageMode(CENTER)
  print(song_2sec.isPlaying())
  if(abs(z_value)<200){
    z_value=rotation()
  if(1){
    if(abs(z_value)>20){
      if(!(song_2sec.isPlaying())){
        song_2sec.play()
      }
    }
    else{
      song_2sec.stop(1)
    }
  }}
  else{
    if (open_width==2){
      song_1.play()
      song_1.stop(10)
    }
    open_width*=1.04
    if(open_width>=90){
      open_width=89.9
    }
  }
  fill(125)
  let canvasRatio = width / height;
  let imgRatio = img1.width / img1.height;

  if (imgRatio < canvasRatio) {
    newHeight = height;
    newWidth = height * imgRatio;
  } else {
    newWidth = width;
    newHeight = width / imgRatio;
  }
  if(frame_count%delay==0){
    image(img1,width/2,height/2,newWidth,newHeight)
  }
  else{
    image(img2,width/2,height/2,newWidth,newHeight)
  }
  frame_count++
  push()
  translate(width/2,height/2)
  rotate(rotation_angle)
  arc(0,0,max_length,max_length,open_width,180-open_width)
  arc(0,0,max_length,max_length,180+open_width,-open_width)
  pop()
  rotation_angle+=z_value/20

  if(song_1.currentTime()>2 && !(birthday_song.isPlaying())){
    birthday_song.play()
  }
}
