function setup() {
  createCanvas( 512, 512 );
}

function draw() {
  clear();
  background( 192 );
  fill( 255 );
  ellipse( mouseX, mouseY, 20, 20 );
  let f = () => { return 42; }
}
