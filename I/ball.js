class Ball{
    constructor(x=random(0,width),y=random(0,height),c=random(0,360)){
        let options={
            restitution:0.8
        }
        this.color=c
        this.object=Bodies.circle(x,y,ballSize/2)
        this.object.restitution=0.9
        Composite.add(engine.world,this.object)
    }
    draw(){
        fill(this.color,255,255)
        ellipse(this.object.position.x,this.object.position.y,ballSize,ballSize)
    }

    changeColor(){
        this.color=random(0,360)
    }
    
    checkReached(pointArray){
        if(abs(rotationX) >0.8 || abs(rotationY)>0.8){
            this.object.isStatic=false;
        }
        else{
        for(let i of pointArray){
        if(dist(this.object.position.x,this.object.position.y,i.x,i.y)<9){
            Body.setPosition(this.object,{x:i.x,y:i.y})
            this.object.isStatic=true;
        }}
        }
        
    }
    
}
