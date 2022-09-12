/*
*
* RandomShapes - Me
* CarsonsEaseLib - Carson G.
*
*/


var health_1 = createSprite(20,25),
    health_2 = createSprite(70,25),
    health_3 = createSprite(120,25);

var player_ship = createSprite(200,200);
var laser = createSprite(player_ship.x, player_ship.y);
var titleShip = createSprite(460,300);
var enemy = createSprite(randomNumber(5,395),0);
var special_enemy = createSprite(randomNumber(5,395),-50);


var gameStarted;

var god_timer = 10000;a

var score = 0;

var health_total = 3;


//Health
health_1.setAnimation("fullHeart");
health_2.setAnimation("fullHeart");
health_3.setAnimation("fullHeart");

//Hearts Group
var hearts = createGroup();
hearts.add(health_1);
hearts.add(health_2);
hearts.add(health_3);
hearts.setScaleEach(0.25);
hearts.setVisibleEach(false);

//Player Ship
player_ship.setAnimation("playerShip");
player_ship.visible = false;

//Enemies
enemy.setAnimation("redEnemy");
enemy.scale /=3;
enemy.visible = false;

special_enemy.setAnimation("specialEnemy");
special_enemy.visible = false;

//Title Screen Ship
titleShip.setAnimation("titelScreenShip");
titleShip.visible = true;

//Laser
laser.setAnimation("laser");
laser.visible = false;
laser.scale /=3;

function draw() {
  //Using Ternary Operator to check if the game is started.
  gameStarted ? mainGame() : preGame();
}


function preGame() {
  if (keyDown("h")) {
    titleShip.visible=false;
    background("GRAY");
    RandomShapes.randomEllipse(5,5);//Using my "RandomShapes" library I am working on.
    fill("red");
    textSize(40);
    textFont("Brush Script MT");
    text("How To Play:",98,35);
    fill("#32cd32");
    textSize(20);
    text("Use WASD to move your player around!\nShoot as many enemies as you can\nuntil you lose all your lives!\nShoot the special enemy to gain a \nmoment of invunerability!",80,60);
  } else {
    titleShip.visible=true;
    background("black");
    RandomShapes.randomEllipse(5,5,"white");
    fill("red");
    textSize(40);
    textFont("Brush Script MT");
    text("Space Game",100,55);//Welcome Text
    textSize(25);
    text("SPACE -> start\n  H -> Help",130,75);
  
    //checks if SPACE is pressed
    if (keyWentDown("space")) gameStarted = true;
  }
  loopTitleScreen();
}

function mainGame() {
  background("black");
  titleShip.visible = false;
  player_ship.visible = true;
  enemy.visible = true;
  hearts.setVisibleEach(true);
  controls();
  checkScore();
  checkLives();
  loopEnemies();
  drawSprites();
}


function controls() {
  //Uses WASD to move.
  if (keyDown("w")) {
    player_ship.y -= 1.5;
  } else if (keyDown("a")) {
    player_ship.x -= 1.5;
  } else if (keyDown("s")) {
    player_ship.y += 1.5;
  } else if (keyDown("d")) {
    player_ship.x += 1.5;
  } 
  
  //Shooting the laser
  laser.y-=5;
  if (keyWentDown("space")) {
    laser.y = player_ship.y - 10;
    laser.visible = true;
  }
  
  //Possible secrets...
}


function checkScore() {
  if (laser.isTouching(enemy)) enemy.y=-50, score++;
  if (laser.isTouching(special_enemy) && health_total==3) special_enemy.y=-100,health_1.setAnimation("specialHeart"),health_2.setAnimation("specialHeart"),health_3.setAnimation("specialHeart"), score+=5;
  if (score >= 100) {
    return winScreen();
  }
}


function checkLives() {
  if ((enemy.isTouching(player_ship) && health_total == 3) || (special_enemy.isTouching(player_ship)  && health_total == 3)) {
    health_total = 2;
    health_3.setAnimation("emptyHeart");
  } else   if ((enemy.isTouching(player_ship) && health_total == 2) || (special_enemy.isTouching(player_ship)  && health_total == 2)) {
    health_total = 1;
    health_2.setAnimation("emptyHeart");
  } else if ((enemy.isTouching(player_ship) && health_total == 1) || (special_enemy.isTouching(player_ship)  && health_total == 1)) {
    health_total = 0;
    health_1.setAnimation("emptyHeart");
    loseScreen();
  }
}

function winScreen() {
  killAll();
  background("black");
  RandomShapes.randomEllipse(10,10,"white");
  
}

function loopTitleScreen() {
  drawSprites();
  titleShip.x-=5;
  if (titleShip.x <=-125) titleShip.x = 525;
}

function loopEnemies() {
  enemy.y+=2;
  if (enemy.y>=450) enemy.y = -50;
  
  if (score >=30 && health_total == 3) special_enemy.y+=5; else return;
}

function loseScreen() {
  killAll();
  background("black");
  RandomShapes.randomEllipse(10,10,"white");
}

function killAll() {
  //Hearts | enemy | special_enemy | player
  hearts.destroyEach();
  enemy.destroy();
  special_enemy.destroy();
  player_ship.destroy();
  fill("red");
}
