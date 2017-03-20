/*
to dos:

- turn player into physics object
- give player "shield" ability to deflect balls
- respawn player when hit by ball
- check if that's any fun at all

- create a series of rooms for balls to bounce in
- trigger ball velocity when player enters sensor
- 

*/


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

class Edge {
  constructor( world, from, to ){
    `world: Box2D.b2World,
from: p5.Vector,
to: p5.Vector`
    this.from = from;
    this.to = to;
    let shape_floor = new Box2D.b2EdgeShape();
    shape_floor.Set( new Box2D.b2Vec2( from.x, 
                                       from.y ),
                     new Box2D.b2Vec2( to.x,
                                       to.y ))
    let static_body_def = new Box2D.b2BodyDef();
    let floor = world.CreateBody( static_body_def );
    floor.CreateFixture( shape_floor, 0 );
  }
  draw(){
    push();
    stroke( 0, 255, 0 );
    line( this.from.x,
          this.from.y,
          this.to.x,
          this.to.y );
    pop();
  }
}

////////////////////////////////////////////////////////////////////////////////
const p = new Player();
const e = new Enemy();
let edges = [];

// create world
let gravity = new Box2D.b2Vec2( 0, 0 );
let world = new Box2D.b2World( gravity );

// create four edges that contain the phyzax
const corners = [ createVector( 150, 150 ),
                  createVector( 350, 150 ),
                  createVector( 350, 350 ),
                  createVector( 150, 350 )];
const pairs = [[0,1],[1,2],[2,3],[3,0]];
for (i in pairs){
  console.log( i );
  edges.push( new Edge( world,
                        corners[ pairs[i][0]],
                        corners[ pairs[i][1]] ));
}

// create 2 more edges 
edges.push(
  new Edge( world,
            createVector( 200, 300 ),
            createVector( 250, 350 )));
edges.push(
  new Edge( world,
            createVector( 350, 450 ),
            createVector( 450, 400 )));

// create a sphere
let cfixshape = new Box2D.b2CircleShape();
cfixshape.set_m_radius( 10 );
let cfixdef = new Box2D.b2FixtureDef();
cfixdef.set_shape( cfixshape );
cfixdef.set_density( 1 );
cfixdef.set_friction( 0 );
cfixdef.set_restitution( 1 );
let cboddef = new Box2D.b2BodyDef();
cboddef.set_type( Box2D.b2_dynamicBody );
cboddef.set_position( new Box2D.b2Vec2( 250, 220 ));
let cbody = world.CreateBody( cboddef );
cbody.CreateFixture( cfixdef );

// create a box
let shape = new Box2D.b2PolygonShape();
shape.SetAsBox( 10, 10 );
let fixture_def = new Box2D.b2FixtureDef();
fixture_def.set_density( 10 );
fixture_def.set_friction( 1 );
fixture_def.set_restitution( 1 );
fixture_def.set_shape( shape );
let body_def = new Box2D.b2BodyDef();
body_def.set_type( Box2D.b2_dynamicBody );
body_def.set_position( new Box2D.b2Vec2( 250, 250 ));
let body = world.CreateBody( body_def );
body.CreateFixture( fixture_def );
body.SetLinearVelocity( new Box2D.b2Vec2( 0, 100 ));

function setup() {
  createCanvas( 512, 512 );
  ellipseMode( CENTER );
  rectMode( CENTER );
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
  // draw edges
  for (i in edges){ edges[i].draw(); }
  // draw box
  push();
  translate( body.GetPosition().get_x(),
             body.GetPosition().get_y() );
  rotate( body.GetAngle() );
  rect( 0, 0, 20, 20 );
  line( 0, 0, 10, 0 );
  pop();
  // draw circle
  push();
  translate( cbody.GetPosition().get_x(),
             cbody.GetPosition().get_y() );
  rotate( cbody.GetAngle() );
  ellipse( 0, 0, 20, 20 );
  line( 0, 0, 10, 0 );
  pop();
  //
}

////////////////////////////////////////////////////////////////////////////////
