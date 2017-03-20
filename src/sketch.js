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
  constructor( x, y, r){
    x = x ? x : 100;
    y = y ? y : 100;
    this.position = createVector( x, y );
    this.radius = r ? r : 10;
  }
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

class Player extends Sphere{
  // constructor(){
  //   this.position = createVector( 250, 250 );
  // }
  use_keys(){
    this.keys = true;
  }
  use_mouse(){
    this.keys = false;
  }
  use_floors( floors ){
    this.floors = floors;
  }
  draw(){
    push();
    fill( 255 );
    noStroke();
    ellipse( this.position.x, this.position.y, 20, 20 );
    pop();
  }
  not_on_floor( pos ){
    for( i in floors ){
      let f = floors[i];
      if( this.position.dist( f.position ) < f.radius ){
        return false;
      }
    }
    return true;
  }
  move(){
    if( this.keys ){
      this.run();
    } else {
      this.follow( mouseX, mouseY );
    }
  }
  run(){
    let step = createVector( 0, 0 );
    if( keyIsDown( LEFT_ARROW )) step.add( -5, 0 );
    if( keyIsDown( RIGHT_ARROW )) step.add( 5, 0 );
    if( keyIsDown( UP_ARROW )) step.add( 0, -5 );
    if( keyIsDown( DOWN_ARROW )) step.add( 0, 5 );
    step.limit( 2 );
    //...//
    this.step_safe( step );
  }
  follow( x_target, y_target ){
    let target = createVector( x_target, y_target ),
        step = p5.Vector.sub( target, this.position ).limit( 100 ).div( 20 );
    this.step_safe( step );
  }
  step_safe( step ){
    this.position.add( step );
    if( this.not_on_floor( this.position )){
      this.position.sub( step );
    }
  }
}

class Floor extends Sphere{
  highlight(){ this.draw( 1 ); }
  outline(){ this.draw( 2 ); }
  draw( mode ){
    pg.push();
    switch( mode ){
    case 1:
      pg.fill( 255, 0, 0 );
      pg.noStroke();
      break;
    case 2:
      pg.noFill();
      pg.stroke( 192 );
      break;
    default:
      pg.fill( 192 );
      pg.noStroke();
    }
    pg.translate( this.position.x,
                  this.position.y );
    pg.ellipseMode( RADIUS );
    pg.ellipse( 0, 0, this.radius, this.radius );
    pg.pop();
  }
}

////////////////////////////////////////////////////////////////////////////////
const p = new Player(),
      e = new Enemy();
let once = true,
    pg = {},
    floors = [];
p.use_floors( floors );
p.use_keys();

// create circular floor
{
  let iterations = 32,
      radius = 200,
      min_radius = 20,
      extra_radius = 30,
      frac = Math.PI * 2 / iterations;
  for ( let i = 0; i < iterations; i++ ){
    let x = cos( frac * i ) * radius + 250,
        y = sin( frac * i ) * radius + 250;
    floors[i] = new Floor( x, y, min_radius + random( extra_radius ));
  }
}

// create connection tunnel
let iterations = 12,
    radius = 200,
    min_radius = 20,
    extra_radius = 15,
    origin = createVector( 100, 100 ),
    target = createVector( 450, 450 ),
    frac = p5.Vector.sub( target, origin ).div( iterations );
for( let i = 0; i < iterations; i++ ){
  let spot = p5.Vector.add( origin, p5.Vector.mult( frac, i ));
  floors.push( new Floor( spot.x, spot.y, min_radius + random( extra_radius )));
}

function setup() {
  createCanvas( 512, 512 );
  pg = createGraphics( 512, 512 );
  ellipseMode( CENTER );
  rectMode( CENTER );
}

function update(){
  p.move();
}

function draw() {
  update();
  //
  if( once ){
    once = false;
    pg.background( 92 );
    for( i in floors ){
      floors[i].draw();
      //floors[i].outline();
    }
  }
  //
  image( pg, 0, 0 );
  //
  p.draw();
  e.draw();
  //
}

function keyPressed(){
  p.use_keys();
}

function mouseMoved(){
  p.use_mouse();
}

////////////////////////////////////////////////////////////////////////////////
