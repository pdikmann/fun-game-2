new p5(); // so we can use its functions outside of setup(), draw(), etc.

class Sphere {
  // TODO: move constants (color, radius) & draw/collision code for ellipses here
}

class Enemy {
  constructor( x, y ){
    x = x ? x : 100;
    y = y ? y : 100;
    this.position = createVector( x, y );
  }
  draw(){
    push();
    fill( 255, 92, 128 );
    noStroke();
    ellipse( this.position.x, this.position.y, 20, 20 );
    pop();
  }
}

class Player {
  constructor(){
    this.position = createVector( 250, 250 );
  }
  draw(){
    push();
    fill( 255 );
    noStroke();
    ellipse( this.position.x, this.position.y, 20, 20 );
    pop();
  }
  follow( x_target, y_target ){
    let target = createVector( x_target, y_target );
    this.position.add( p5.Vector.sub( target, this.position ).limit( 100 ).div( 20 ));
  }
}

////////////////////////////////////////////////////////////////////////////////
const p = new Player();
const e = new Enemy();

let gravity = new Box2D.b2Vec2( 0, 10 );
let world = new Box2D.b2World( gravity );

let shape = new Box2D.b2PolygonShape();
shape.SetAsBox( 10, 10 );
let body_def = new Box2D.b2BodyDef();
body_def.set_type( Box2D.b2_dynamicBody );
body_def.set_position( new Box2D.b2Vec2( 250, 250 ));
let body = world.CreateBody( body_def );
body.CreateFixture( shape, 5 );

function setup() {
  createCanvas( 512, 512 );
}

function update(){
  p.follow( mouseX, mouseY );
  world.Step( 1.0 / 60.0, 3, 3 );
}

function draw() {
  update();
  //
  //clear();
  background( 92 );
  //
  p.draw();
  e.draw();
  rect( body.GetPosition().get_x(),
        body.GetPosition().get_y(),
        10, 10 );
  //
}

////////////////////////////////////////////////////////////////////////////////
