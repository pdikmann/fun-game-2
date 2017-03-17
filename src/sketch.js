new p5(); // so we can use its functions outside of setup(), draw(), etc.

class Player {
  constructor(){
    this.position = createVector( 250, 250 );
  }
  draw(){
    fill( 255 );
    noStroke();
    ellipse( this.position.x, this.position.y, 20, 20 );
  }
  follow( x_target, y_target ){
    let target = createVector( x_target, y_target );
    this.position.add( p5.Vector.sub( target, this.position ).limit( 100 ).div( 20 ));
  }
}

////////////////////////////////////////////////////////////////////////////////
const p = new Player();

function setup() {
  createCanvas( 512, 512 );
}

function update(){
  p.follow( mouseX, mouseY );
}

function draw() {
  update();
  //
  clear();
  background( 128 );
  p.draw();
}
