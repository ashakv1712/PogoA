const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
//const Render = Matter.Render;

var jumpSound, winSound;
var ground, gameState, engine, world, home, player;
var wall1, wall2, wall3;

function preload() {
  homeimg = loadImage("home.png");
  goimg = loadImage("go.png");
  jumpSound = loadSound("jump.mp3");
  winSound = loadSound("tada.mp3");
}
function setup() {
  createCanvas(800, 400);

  gameState = "start";

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  home = new Home(720, 390, 100, 10);
  player = new Player(100, 300, 40);
  ground = new Ground(400, 400);

  wall1 = new Wall(200, 250);
  wall2 = new Wall(400, 150);
  wall3 = new Wall(600, 250);
}

function draw() {
  //Render.run(render);
  if (gameState === "start") {
    background("black");
    textSize(20);
    fill("red");
    text("Press Up Arrow to Start, and move the pogo man to the end.", 50, 200);
    if (keyCode === UP_ARROW) {
      gameState = "play";
    }
  }
  if (gameState === "play") {
    rectMode(CENTER);
    background(0);

    home.display();
    player.display();
    imageMode(CENTER);
    // image(homeimg, width - 77, 360, 130, 150);

    wall1.display();
    wall2.display();
    wall3.display();

    if (
      player.body.position.x > 700 &&
      player.body.position.x < 800 &&
      player.body.position.y >= 340
    ) {
      gameState = "end";
    }
    if (gameState === "end") {
      background("black");
      textSize(30);
      text("YOU WIN", 380, 200);
      winSound.play();
    }

    // camera.position.x = player.body.position.x + 150;

    if (player.body.position.x > 800) {
      gameState = "lose";
      background("black");
      imageMode(CENTER);
      image(goimg, 400, 200, 100, 100);
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && gameState === "play") {
    Matter.Body.applyForce(player.body, player.body.position, {
      x: 0,
      y: -100,
    });
    jumpSound.play();
  }
  if (keyCode === LEFT_ARROW && gameState === "play") {
    Matter.Body.applyForce(player.body, player.body.position, { x: -50, y: 0 });
  }
  if (keyCode === RIGHT_ARROW && gameState === "play") {
    Matter.Body.applyForce(player.body, player.body.position, { x: 50, y: 0 });
  }
}
