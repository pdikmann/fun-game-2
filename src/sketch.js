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
  follow( x_target, y_target ){
    let target = createVector( x_target, y_target ),
        step = p5.Vector.sub( target, this.position ).limit( 100 ).div( 20 );
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
    push();
    switch( mode ){
    case 1:
      fill( 255, 0, 0 );
      noStroke();
      break;
    case 2:
      noFill();
      stroke( 192 );
      break;
    default:
      fill( 192 );
      noStroke();
    }
    translate( this.position.x,
               this.position.y );
    ellipseMode( RADIUS );
    ellipse( 0, 0, this.radius, this.radius );
    pop();
  }
}

////////////////////////////////////////////////////////////////////////////////
const p = new Player();
const e = new Enemy();
let floors = [];
p.use_floors( floors );

let iterations = 32,
    radius = 200,
    min_radius = 20,
    extra_radius = 60,
    frac = Math.PI * 2 / iterations;
for ( let i = 0; i < iterations; i++ ){
  let x = cos( frac * i ) * radius + 250,
      y = sin( frac * i ) * radius + 250;
  floors[i] = new Floor( x, y, min_radius + random( extra_radius ));
}

function setup() {
  createCanvas( 512, 512 );
  ellipseMode( CENTER );
  rectMode( CENTER );
}

function update(){
  p.follow( mouseX, mouseY );
}

function draw() {
  update();
  //
  background( 92 );
  //
  for( i in floors ){
    //floors[i].draw();
    floors[i].outline();
  }
  p.draw();
  e.draw();
  //
}

////////////////////////////////////////////////////////////////////////////////
