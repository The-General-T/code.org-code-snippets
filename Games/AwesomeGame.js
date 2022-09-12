// Sprites
var mainMap = createSprite(200,200);
mainMap.setAnimation("mainMap");
mainMap.visible = false;
mainMap.scale *= 5;

var shopColliders = createSprite(165,-45,200,200);
var shopWindow1= createSprite(95,95,65,69);
var shopWindow2= createSprite(235,97,65,69);
shopColliders.visible = false;
shopWindow1.visible = false;
shopWindow2.visible = false;

var tColliders = createSprite(-185,335,200,150);
var tWindow1 = createSprite(-255,445,65,69);
var tWindow2 = createSprite(-115,445,65,69);
tColliders.visible = false;
tWindow1.visible = false;
tWindow2.visible = false;

var lakeCollider1 = createSprite(375,-115,65,490);
var lakeCollider2 = createSprite(465,95,169,69);
var lakeCollider3 = createSprite(515, 435,65,600);
lakeCollider1.visible = false;
lakeCollider2.visible = false;
lakeCollider3.visible = false;
var room2 = createSprite(200,1195);
room2.visible = false;
room2.scale *= 5;
room2.setAnimation("map2");

var shopInteraction = createSprite(160,100);
shopInteraction.scale -= 0.5;
shopInteraction.setCollider("rectangle",0,0,10,10,0);
shopInteraction.visible = false;

var trainingInteraction = createSprite(-180,450);
trainingInteraction.visible = false;
trainingInteraction.setCollider("rectangle",0,0,10,10,0);

var bossInteraction = createSprite();
bossInteraction.visible = false;

var startButton = createSprite(180,300);
startButton.setAnimation("startButton");
startButton.scale+=0.5;

var player = createSprite(200,200);
player.setAnimation("player");
player.scale = 2;
player.visible = false;
player.setCollider("obb",0,0,20,20,0);

var statsButton = createSprite();
statsButton.setAnimation("animation_1");
statsButton.scale = 1.5;
statsButton.visible = false;

var miniMap = createSprite(200,200);
miniMap.setAnimation("map.png_2");
miniMap.scale *= 2;
miniMap.visible = false;

var shop = createSprite(shopInteraction.x,shopInteraction.y-5);
shop.visible = false;
shop.scale = 0.9;
shop.setAnimation("shop.png_1");

var training = createSprite(trainingInteraction.x,trainingInteraction.y-5);
training.visible = false;
training.scale= 1.5;
training.setAnimation("training");

var shopKeeper = createSprite(300,212);
shopKeeper.setAnimation("shopkeep");
shopKeeper.visible = false;

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
var mainTextColor = randomNumber(0,10000) === 69 ? "blue" : "chartreuse";
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
    startButton.visible = false;
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
    startButton.x = CarsonsEaseLib.easeInQuad(easeTimer,-50,180,5);
    startButton.visible = true;
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
    startButton.destroy();
    gameStarted = true;
  }
  if (mousePressedOver(startButton)) {
    startButton.destroy();
    gameStarted = true;
    }
    drawSprites();
  }
}

// Game Functionality
function controls() {
  if (keyDown("w")) {
    player.y-=stats.speed;
  } else if (keyDown("a")) {
    player.x-=stats.speed;
  } else if (keyDown("s")) {
    player.y+=stats.speed;
  } else if (keyDown("d")) {
    player.setAnimation("playerRight");
    player.x+=stats.speed;
  } else {
    player.setAnimation("player");
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
  
  if (player.x <-340 || player.x >750) player.x = 200; // Makes barriers
  if (player.y <-340 || player.y >750) player.y = 200;
  
  if (camera.x <= -170) {camera.x = -170} else {camera.x = player.x}
  
  if (mousePressedOver(statsButton)) {
    statsScreen();
  }
  // Sets the proper coords for everything
  camera.x = player.x;
  camera.y = player.y;
  statsButton.x = player.x-150;
  statsButton.y = player.y-175;
  if (tBarShown) {
    stroke("chartreuse");
    strokeWeight(10);
    line(trainingInteraction.x,trainingInteraction.y,player.x,player.y);
  } if (sBarShown) {
    stroke("red");
    strokeWeight(10);
    line(shop.x,shop.y,player.x,player.y);
  }
}
function checkLife() {
  if (godMode) { // Changes health bar to god mode bar
    stroke("gold");
    strokeWeight(3);
    fill(rgb(randomNumber(50,250),randomNumber(50,250),randomNumber(50,250)));
    rect(player.x-150,player.y+145, stats.health+20,15);
  } else {
    stroke("gold");
    strokeWeight(3);
    fill("red");
    rect(player.x-150,player.y+145, stats.health+20,15);// Health bar
  }
  fill("white");
  textSize(20);
  text("HP",player.x - 180, player.y+155);
  text("XP",player.x - 180, player.y+185);
}
function checkLevel() {
  stroke("gold");
  strokeWeight(3);
  fill("cyan");
  rect(player.x-150,player.y+175, stats.xp+10,15);// XP bar
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
  if (player.isTouching(shopInteraction)) {
    shopRoom();
  } else if (player.isTouching(trainingInteraction)) {
    trainingRoom();
  } else if(player.isTouching(bossInteraction)) {
    bossRoom();
  } else {
    mainRoom();
  }
}
function statsScreen() {
  var ifGod = godMode ? "∞" : stats.health;
  stroke("gold"), fill("#a9a9a9"), strokeWeight(3);
  rect(player.x-200,player.y-200,110,400);
  textSize(20), fill("red");
  text("HP: "+ifGod+"\nSPD: "+Math.round(stats.speed)+"\nSTR: "+stats.strength+"\nDEF: "+stats.defense+"\nLVL: "+stats.level,player.x-180,player.y-178);
}
function xpTraining() {
  training.visible = true;
  player.visible = false;
  mainMap.visible = false;
  drawSprites();
  if (keyWentDown("enter")) {
    training.visible = false;
    player.x = -188;
    player.y = 500;
  }
}
function trainingMenu() {
  mainMap.visible = false; 
  room2.visible = false;
  player.visible = false;
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
    player.collide(shopWindow1);
    player.collide(shopWindow2);
    player.collide(shopColliders);
    player.collide(tWindow1);
    player.collide(tWindow2);
    player.collinde(tColliders);
    player.collide(tWindow1);
    player.collide(tWindow1);
    player.collide(lakeCollider1);
    player.collide(lakeCollider2);
    player.collide(lakeCollider3);
  }
}

// Rooms
function mainRoom() {
  statsButton.visible = true;
  shopKeeper.visible = false;
  mainMap.visible = true;
  room2.visible = true;
  shop.visible = false;
  player.visible = true;
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
  text("Cannot load game.",bossInteraction.x-20,bossInteraction.y+30);
  textSize(22);
  text("Error 101 - Permission Denied",bossInteraction.x-160,bossInteraction.y);
  easeTimer = 100;
  easeTimer -= e;
  if (easeTimer <= -5) easeTimer = -5;
  if(keyWentDown("enter")) player.y+=20;
}
function shopRoom() {
  shop.visible = true;
  shopKeeper.visible = true;
  player.visible = false;
  mainMap.visible = false;
  drawSprites();
  if (keyWentDown("enter")) {
    player.x = 160;
    player.y = 150;
  }
  stroke("gold");
  strokeWeight(10);
  fill("#32cd32");
  textSize(69);
  text("SHOP", shopKeeper.x - 220, shopKeeper.y-200);
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
