class Mover {
    constructor(x , y){
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector(0, 0.1);
        this.force = createVector(0, 0.1);
        rectMode(CENTER);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.position.y >= height - this.rectHeight/2 || this.position.y <= 0 ){
            this.velocity.y = this.velocity.y * -1 ;
            this.colour = [255, 0 , 0];
        } else if (this.position.x <= 0 ||  this.position.x >= width - this.rectWidth/2){
            this.velocity.x = this.velocity.x * -1 ;
            this.colour = [255, 0 , 0];
        }
        this.acceleration.mult(0);
    }

    show() {
        push();
        strokeWeight(2);
        noStroke();
        fill(0, 0, 255, 200)
        circle(this.position.x, this.position.y, 10);
        pop();
    }
    
    
    applyForce(force){
        this.acceleration = this.acceleration.add(force);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(4);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(0.15);
        return steer;
    }

    checkEdges(){
        if (this.position.y <= 5 ){
            this.velocity.y *= -1;
        } else if (this.position.y >= height){
            this.velocity.y *= -1;
        } else if (this.position.x <= 5){
            this.velocity.x *= -1;
        } else if (this.position.x >= width){
            this.velocity.x *= -1;
        }
    }



}