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

// create world
let gravity = new Box2D.b2Vec2( 0, 10 );
let world = new Box2D.b2World( gravity );

// create a floor
let shape_floor = new Box2D.b2EdgeShape();
shape_floor.Set( new Box2D.b2Vec2( 200, 300 ),
                 new Box2D.b2Vec2( 300, 330 ))
let static_body_def = new Box2D.b2BodyDef();
let floor = world.CreateBody( static_body_def );
floor.CreateFixture( shape_floor, 0 );

// create a box
let shape = new Box2D.b2PolygonShape();
shape.SetAsBox( 10, 10 );
let fixture_def = new Box2D.b2FixtureDef();
fixture_def.set_density( 10 );
fixture_def.set_restitution( 1 );
fixture_def.set_shape( shape );
let body_def = new Box2D.b2BodyDef();
body_def.set_type( Box2D.b2_dynamicBody );
body_def.set_position( new Box2D.b2Vec2( 250, 250 ));
let body = world.CreateBody( body_def );
body.CreateFixture( fixture_def );

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
  push();
  translate( body.GetPosition().get_x(),
             body.GetPosition().get_y() );
  rotate( body.GetAngle() );
  rect( 0, 0, 10, 10 );
  pop();
  //
}

////////////////////////////////////////////////////////////////////////////////
