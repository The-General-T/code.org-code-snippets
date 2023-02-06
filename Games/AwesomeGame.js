/*
* © General Tromboni 2020
* This is a work in progress. I will update this as I continue.
*/
var Sprites = {
  mainMap: createSprite(200,200),
  shopColliders: createSprite(165,-45,200,200),
  shopWindow1: createSprite(95,95,65,69),
  shopWindow2: createSprite(235,97,65,69),
  tColliders: createSprite(-185,335,200,150),
  tWindow1: createSprite(-255,445,65,69),
  tWindow2: createSprite(-115,445,65,69),
  lakeCollider1: createSprite(375,-115,65,490),
  lakeCollider2: createSprite(465,95,169,69),
  lakeCollider3: createSprite(515, 435,65,600),
  room2: createSprite(200,1195),
  shopInteraction: createSprite(160,100),
  trainingInteraction: createSprite(-180,450),
  bossInteraction: createSprite(514,-48,50,50),
  player: createSprite(200,200),
  startButton: createSprite(180,300),
  shopKeeper: createSprite(300,212),
  statsButton: createSprite(),
  miniMap: createSprite(200,200)
  
  
};
// Sprites
Sprites.mainMap.setAnimation("mainMap");
Sprites.mainMap.visible = false;
Sprites.mainMap.scale *= 5;

Sprites.shopColliders.visible = false;
Sprites.shopWindow1.visible = false;
Sprites.shopWindow2.visible = false;

Sprites.tColliders.visible = false;
Sprites.tWindow1.visible = false;
Sprites.tWindow2.visible = false;

Sprites.lakeCollider1.visible = false;
Sprites.lakeCollider2.visible = false;
Sprites.lakeCollider3.visible = false;

Sprites.room2.visible = false;
Sprites.room2.scale *= 5;
Sprites.room2.setAnimation("map2");

Sprites.shopInteraction.scale -= 0.5;
Sprites.shopInteraction.setCollider("rectangle",0,0,10,10,0);
Sprites.shopInteraction.visible = false;

Sprites.trainingInteraction.visible = false;
Sprites.trainingInteraction.setCollider("rectangle",0,0,10,10,0);

Sprites.bossInteraction.visible = false;

Sprites.startButton.setAnimation("startButton");
Sprites.startButton.scale+=0.5;

Sprites.player.setAnimation("player");
Sprites.player.scale = 2;
Sprites.player.visible = false;
Sprites.player.setCollider("obb",0,0,20,20,0);

Sprites.statsButton.setAnimation("animation_1");
Sprites.statsButton.scale = 1.5;
Sprites.statsButton.visible = false;

Sprites.miniMap.setAnimation("map.png_2");
Sprites.miniMap.scale *= 2;
Sprites.miniMap.visible = false;

var shop = createSprite(Sprites.shopInteraction.x,Sprites.shopInteraction.y-5);
shop.visible = false;
shop.scale = 0.9;
shop.setAnimation("shop.png_1");

var training = createSprite(Sprites.trainingInteraction.x,Sprites.trainingInteraction.y-5);
training.visible = false;
training.scale= 1.5;
training.setAnimation("training");

Sprites.shopKeeper.setAnimation("shopkeep");
Sprites.shopKeeper.visible = false;

// Utils
var stats = {
  health: 20,
  speed: 4,
  strength: 1,
  defense: 1,
  level: 1,
  xp: 0
};

var defeats = 0;
var gameStarted;
var MAXHEALTH = 250;
var godMode = false;
var xpNeeded = 50;
var trainingStarted;
var easeTimer = 100;
var e = 1.1;
var mainTextColor = randomNumber(0,1000) === 69 ? "blue" : "chartreuse";
var tBarShown;
var sBarShown;
var isOwner = getUserId() === "HeGXh4puv9qt55qB9A4FQZ3YmDQ" ? true : false;

// Main Game Functions
function draw() {
  if (gameStarted) {
    mainGame();
  } else {
    preGame();
  }
}
function mainGame() {
  checkLocation();
}
function preGame() {
  // Makes it to only I can play it
  if (!isOwner) {
    background("black");
    textSize(20);
    fill(mainTextColor);
    text("Cannot load game.",CarsonsEaseLib.easeInQuad(easeTimer,0,50,5),50);
    textSize(15);
    text("Error 101 - Permission Denied",CarsonsEaseLib.easeInQuad(easeTimer,-50,50,5),200);
     easeTimer -= e;
    if (easeTimer <= -5) easeTimer = -5;
  } else {
    if (keyDown("h")) {
    Sprites.startButton.visible = false;
    background("black");
    textSize(40);
    fill(mainTextColor);
    text("Welcome to\nthe\nAwesome Game!", 50,50);
    textSize(20);
    text("Use WASD to move around!\n"+"GO explore and get strong\nenough to defeat the\nevil being in\nthe castle!\n"+"Press T or P to\nhighlight locations",50,200);
  } else if (keyDown("c")) {
    background("black");
    textSize(40);
    fill(mainTextColor);
    text("Credits\nadded soon",100,100);
  } else { 
    Sprites.startButton.x = CarsonsEaseLib.easeInQuad(easeTimer,-50,180,5);
    Sprites.startButton.visible = true;
    background("black");
    textSize(40);
    fill(mainTextColor);
    text("Welcome to\nthe\nAwesome Game!", CarsonsEaseLib.easeInQuad(easeTimer,0,50,5),50);
    textSize(20);
    text("Press START to start!\nHold H for help!",CarsonsEaseLib.easeInQuad(easeTimer,-50,50,5),200);
    easeTimer -= e;
    if (easeTimer <= -5) easeTimer = -5;
  }
  if (isOwner && keyWentDown("space")) {
    Sprites.startButton.destroy();
    gameStarted = true;
  }
  if (mousePressedOver(Sprites.startButton)) {
    Sprites.startButton.destroy();
    gameStarted = true;
    }
    drawSprites();
  }
}

// Game Functionality
function controls() {
  if (keyDown("w")) {
    Sprites.player.y-=stats.speed;
  } else if (keyDown("a")) {
    Sprites.player.x-=stats.speed;
  } else if (keyDown("s")) {
    Sprites.player.y+=stats.speed;
  } else if (keyDown("d")) {
    Sprites.player.setAnimation("playerRight");
    Sprites.player.x+=stats.speed;
  } else {
    Sprites.player.setAnimation("player");
  }
  
  //Make "waypoint bars" appear"
  if (keyWentDown("t") && !tBarShown) {
    tBarShown = true;
  } else if (keyWentDown("t") && tBarShown) {
    tBarShown = false;
  }
  
  if (keyWentDown("p") && !sBarShown) {
    sBarShown = true;
  } else if (keyWentDown("p") && sBarShown) {
    sBarShown = false;
  }
  
  if (Sprites.player.x <-340 || Sprites.player.x >750) Sprites.player.x = 200; // Makes barriers
  if (Sprites.player.y <-340 || Sprites.player.y >750) Sprites.player.y = 200;
  
  if (camera.x <= -170) {camera.x = -170} else {camera.x = Sprites.player.x}
  
  if (mousePressedOver(Sprites.statsButton)) {
    statsScreen();
  }
  // Sets the proper coords for everything
  camera.x = Sprites.player.x;
  camera.y = Sprites.player.y;
  Sprites.statsButton.x = Sprites.player.x-150;
  Sprites.statsButton.y = Sprites.player.y-175;
  if (tBarShown) {
    stroke("chartreuse");
    strokeWeight(10);
    line(Sprites.trainingInteraction.x,Sprites.trainingInteraction.y,Sprites.player.x,Sprites.player.y);
  } if (sBarShown) {
    stroke("red");
    strokeWeight(10);
    line(shop.x,shop.y,Sprites.player.x,Sprites.player.y);
  }
}
function checkLife() {
  if (godMode) { // Changes health bar to god mode bar
    stroke("gold");
    strokeWeight(3);
    fill(rgb(randomNumber(50,250),randomNumber(50,250),randomNumber(50,250)));
    rect(Sprites.player.x-150,Sprites.player.y+145, stats.health+20,15);
  } else {
    stroke("gold");
    strokeWeight(3);
    fill("red");
    rect(Sprites.player.x-150,Sprites.player.y+145, stats.health+20,15);// Health bar
  }
  fill("white");
  textSize(20);
  text("HP",Sprites.player.x - 180, Sprites.player.y+155);
  text("XP",Sprites.player.x - 180, Sprites.player.y+185);
}
function checkLevel() {
  stroke("gold");
  strokeWeight(3);
  fill("cyan");
  rect(Sprites.player.x-150,Sprites.player.y+175, stats.xp+10,15);// XP bar
  if (stats.xp >= xpNeeded) { // Checks if the player is ready to level up
    stats.xp = 0;
    xpNeeded += 25;
    stats.level++;
  if (stats.health === MAXHEALTH) { // Checks if the players health is maxed out
    stats.health += 0;
  } else {
    stats.health+=5;
  }
  stats.speed+=0.5;
  stats.strength+=2;
  stats.defense+=2;
  SimpleSyntax.debug("LEVEL UP");
  god(true);
  // Sets temporary invincibility
  setTimeout(function(){
    god(false);
  },3000);
  }
}
function checkLocation() {
  if (Sprites.player.isTouching(Sprites.shopInteraction)) {
    shopRoom();
  } else if (Sprites.player.isTouching(Sprites.trainingInteraction)) {
    trainingRoom();
  } else if(Sprites.player.isTouching(Sprites.bossInteraction)) {
    bossRoom();
  } else {
    mainRoom();
  }
}
function statsScreen() {
  var ifGod = godMode ? "∞" : stats.health;
  stroke("gold"), fill("#a9a9a9"), strokeWeight(3);
  rect(Sprites.player.x-200,Sprites.player.y-200,110,400);
  textSize(20), fill("red");
  text("HP: "+ifGod+"\nSPD: "+Math.round(stats.speed)+"\nSTR: "+stats.strength+"\nDEF: "+stats.defense+"\nLVL: "+stats.level,Sprites.player.x-180,Sprites.player.y-178);
}
function xpTraining() {
  training.visible = true;
  Sprites.player.visible = false;
  Sprites.mainMap.visible = false;
  drawSprites();
  if (keyWentDown("enter")) {
    training.visible = false;
    Sprites.player.x = -188;
    Sprites.player.y = 500;
  }
}
function trainingMenu() {
  Sprites.mainMap.visible = false; 
  Sprites.room2.visible = false;
  Sprites.player.visible = false;
  background("black");
  textSize(40);
  fill("#32cd32");
  text("Training!", 50,50);
  textSize(20);
  text("Press ENTER to start!\nClick on all the hearts to gain xp!",50,200);
  if (keyDown("enter")) trainingStarted = true;
}
function colliders() {
  if (!isOwner) {
    Sprites.player.collide(Sprites.shopWindow1);
    Sprites.player.collide(Sprites.shopWindow2);
    Sprites.player.collide(Sprites.shopColliders);
    Sprites.player.collide(Sprites.tWindow1);
    Sprites.player.collide(Sprites.tWindow2);
    Sprites.player.collinde(Sprites.tColliders);
    Sprites.player.collide(Sprites.tWindow1);
    Sprites.player.collide(Sprites.tWindow1);
    Sprites.player.collide(Sprites.lakeCollider1);
    Sprites.player.collide(Sprites.lakeCollider2);
    Sprites.player.collide(Sprites.lakeCollider3);
  }
}

// Rooms
function mainRoom() {
  Sprites.statsButton.visible = true;
  Sprites.shopKeeper.visible = false;
  Sprites.mainMap.visible = true;
  Sprites.room2.visible = true;
  shop.visible = false;
  Sprites.player.visible = true;
  training.visible = false;
  colliders();
  drawSprites();
  controls();
  checkLevel();
  checkLife();
  secrets();
  fill("black");
}
function bossRoom() {
  background("black");
  textSize(20);
  fill(mainTextColor);
  text("Cannot load game.",Sprites.player.x-70,Sprites.player.y+30);
  textSize(22);
  text("Error 101 - Permission Denied",Sprites.player.x-190,Sprites.player.y + 10);
  easeTimer = 100;
  easeTimer -= e;
  if (easeTimer <= -5) easeTimer = -5;
  if(keyWentDown("enter")) Sprites.player.y+=20;
}
function shopRoom() {
  shop.visible = true;
  Sprites.shopKeeper.visible = true;
  Sprites.player.visible = false;
  Sprites.mainMap.visible = false;
  drawSprites();
  if (keyWentDown("enter")) {
    Sprites.player.x = 160;
    Sprites.player.y = 150;
  }
  stroke("gold");
  strokeWeight(10);
  fill("#32cd32");
  textSize(69);
  text("SHOP", Sprites.shopKeeper.x - 220, Sprites.shopKeeper.y-200);
  textSize(30);
  text("Select from a variety of \nitems!", Sprites.shopKeeper.x - 240, Sprites.shopKeeper.y-150);
}
function trainingRoom() {
  if (trainingStarted) {
    xpTraining();
  } else {
    trainingMenu();
  }
}

// Extras
function secrets() {
  if ((keyWentDown("space") && keyWentDown("enter")) && !godMode) {
    god(true);
  } else if ((keyWentDown("space") && keyWentDown("enter")) && godMode) {
    god(false);
  }
}
function god(bool) {
  godMode = bool;
}
