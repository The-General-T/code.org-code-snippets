var Sprites = {
  /* Holds the information on the games sprites */
  danny: createSprite(50,200),
  krabs: createSprite(350, 200),
  sun: createSprite(350, 50),
  leftSword: createSprite(65, 325),
  rightSword: createSprite(325, 325),
  coin: createSprite(randomNumber(100,300), randomNumber(100,300)),
  husk: createSprite(185, 245),
  gameOverText: createSprite(200,50),
  winDanny: createSprite(60, 240),
  winKrabs: createSprite(60, 240)
  
}, Game = {
  /* Holds the scoring information */
  scoreDanny: 0,
  scoreKrabs: 0,
  welcomeText: "Welcome to the LBMPG!!\nControls: \"H\" | Objective: \"O\"\nUpdates: \"U\"",
  updates: ["Somehow made the game optimized",
            "Adding mobile controls",
            "Adding more In-game music", 
            "Able to skip songs in the music array"],
  gameStarted: false
}, Debugging = {
  debug: function debug() {
    Sprites.danny.debug = true;
    Sprites.krabs.debug = true;
    Sprites.sun.debug = true;
    Sprites.leftSword.debug = true;
    Sprites.rightSword.debug = true;
    Sprites.coin.debug = true;
    Sprites.husk.debug = true;
    Sprites.gameOverText.debug = true;
    Sprites.winDanny.debug = true;
    Sprites.winKrabs.debug = true;
  },
  noDebug: function noDebug() {
    Sprites.danny.debug = false;
    Sprites.krabs.debug = false;
    Sprites.sun.debug = false;
    Sprites.leftSword.debug = false;
    Sprites.rightSword.debug = false;
    Sprites.coin.debug = false;
    Sprites.husk.debug = false;
    Sprites.gameOverText.debug = false;
    Sprites.winDanny.debug = false;
    Sprites.winKrabs.debug = false;
  },
  fakeStartup: function fakeStart() {
    /* CALL ONLY IN THE CONSOLE */
    console.log(Sprites);
    console.log(Game);
    console.log(Debugging);
  }
}, Music = {
   list: ["LBMPG-Music.mp3",
   "Astronomia-Marching-Band-Music-Coffin-dance-meme.mp3",
   "School_Song_-_FULL_ENSEMBLE.mp3", "Hey-Hey-(1).mp3","Stars-And-Stripes-Forever.mp3"]
};

/* Plays one random song from the "Music.list" array.... and loops it until you change it. */
playSound(Music.list[randomNumber(0,Music.list.length-1)], true);

/* Danny */
Sprites.danny.setAnimation("images.jpeg_1");
Sprites.danny.scale /= 2; 
Sprites.danny.setCollider("circle");
Sprites.danny.visible = false;

/* Krabs */
Sprites.krabs.setAnimation("krabs.png_1");
Sprites.krabs.setCollider("circle");
Sprites.krabs.visible = false;

/* Sun */
Sprites.sun.setAnimation("sun.png_1");
Sprites.sun.setCollider("circle");
Sprites.sun.visible = false;

/* Coin */
Sprites.coin.setAnimation("coin");
Sprites.coin.scale -= 0.1;
Sprites.coin.setCollider("circle");
Sprites.coin.visible = false;

/* Swords */
Sprites.leftSword.setAnimation("leftSword");
Sprites.rightSword.setAnimation("rightSword");
Sprites.leftSword.visible = false;
Sprites.rightSword.visible = false;

/* Husk */
Sprites.husk.setAnimation("husk.png_1");
Sprites.husk.scale /= 2;
Sprites.husk.visible = false;

/* Game Over */
Sprites.gameOverText.setAnimation("textGameOver_1");
Sprites.gameOverText.visible = false;
Sprites.gameOverText.scale -= 0.1;

/* Win sprites */
Sprites.winDanny.setAnimation("winDanny");
Sprites.winDanny.visible = false;
Sprites.winKrabs.setAnimation("winKrabs");
Sprites.winKrabs.visible = false;

/* Draw Function */
function draw() {
  Game.gameStarted ? mainGame() : preGame();
}

/* Changes the music */
function changeMusic() {
  var music = Music.list[randomNumber(0,Music.list.length-1)];
  stopSound();
  playSound(music, true);
  Debugging.debug("Changed music: "+music);
}

/* Controls */
function controls() {
  /* Danny controls */
  if (keyDown("w")) {
    Sprites.danny.setAnimation("dannyUp");
    Sprites.danny.y-=3;
    //Debugging.debug("W key pressed");
  } else if (keyDown("a")) {
    Sprites.danny.setAnimation("dannyLeft");
    Sprites.danny.x-=3;
    //Debugging.debug("A key pressed");
  } else if (keyDown("s")) {
    Sprites.danny.setAnimation("dannyDown");
    Sprites.danny.y+=3;
    //Debugging.debug('S key pressed');
  } else if (keyDown("d")) {
    Sprites.danny.setAnimation("images.jpeg_1");
    Sprites.danny.x+=3;
    //Debugging.debug("D key pressed");
  } else {
    Sprites.danny.setAnimation("images.jpeg_1");
  }
  
  /* Krabs controls */
  if (keyDown("up")) {
    Sprites.krabs.y-=3;
    //Debugging.debug("UP arrow pressed");
  } else if (keyDown("left")) {
    Sprites.krabs.setAnimation("krabs.png_1");
    Sprites.krabs.x-=3;
    //Debugging.debug("LEFT arrow pressed");
  } else if (keyDown("down")) {
    Sprites.krabs.y+=3;
    //Debugging.debug("DOWN arrow pressed");
  } else if (keyDown("right")) {
    Sprites.krabs.setAnimation("kravsRight");
    Sprites.krabs.x+=3;
    //Debugging.debug("RIGHT arrow pressed");
  } else {
    Sprites.krabs.setAnimation("krabs.png_1");
  }
  
  /* Changes the music */
  if (keyWentDown("ENTER")) {
    changeMusic();
  }
  
  /* DEV TOOLS */
  if (keyWentDown("shift")) {
    Debugging.debug();
  } else if (keyWentUp("alt")) {
    Debugging.noDebug();
  }
}

/* Puts the main screen on */
function wallpaper() {
  background("lightBlue");
  fill("darkGreen");
  rect(0,250, 400, 250);
  fill("brown");
  textSize(20);
  text("Score(P1): " + Game.scoreDanny, 25, 25); /* Player 1 Info */
  fill("red");
  text("Score(P2): " + Game.scoreKrabs, 25, 50); /* Player 2 Info */
  noFill();
}

function mainGame() {
  controls();
  wallpaper();
  checkScore();
  changeSprites();
  drawSprites();
}
function preGame() {
  background("lightblue");
  rect(0,250, 400, 250);
  textSize(24);
  fill("#32cd32"); /* My favorite color btw */
  text(Game.welcomeText, 10, 40);
  Sprites.leftSword.visible = true;
  Sprites.rightSword.visible = true;
  Sprites.leftSword.rotation += 3;
  Sprites.rightSword.rotation -= 3;
  drawSprites();
  if (keyDown("h")) {
    Game.welcomeText = "Use \"WASD\" for Danny\nAnd \"The arrow keys\" for\nKrabs.";
  } else if (keyDown("o")) {
    Game.welcomeText = "Collect the most coins!\nThe player who gets to \n100 coins first wins!\nIf you go off the screen, \nyou lose a point";
  } else if (keyDown("u")) {
    Game.welcomeText = Game.updates.join("\n");
  } else {
    Game.welcomeText = "Welcome to the LBMPG!!\nControls: \"H\" | Objective: \"O\"\nUpdates: \"U\"";
  }
  if (keyDown("space")) Game.gameStarted = true;
}

function checkScore() {
  checkWin();
  /*  If the coin is touched  */
  if (Sprites.danny.isTouching(Sprites.coin)) {
    moveCoin();
    addScoreDanny(1); //Made a function so its easily changable
  } else if (Sprites.krabs.isTouching(Sprites.coin)) {
    moveCoin(); 
    addScoreKrabs(1);
  }
  
  
  /* Something extra */
  if ((Game.scoreDanny === 69 && Sprites.danny.x === 69 && Sprites.danny.y === 69) || (Game.scoreKrabs === 69 && Sprites.krabs.x === 69 && Sprites.krabs.y === 69)) {
    Sprites.sun.x = 69;
    Sprites.sun.y = 69;
    Sprites.sun.rotationSpeed = 69;
  }
  
  
  /*  If a player goes off screen  */
  if (Sprites.danny.x >=420 || Sprites.danny.x<=-20 ||  Sprites.danny.y >=420 || Sprites.danny.x <=-20) {
    Game.scoreDanny--;
    Game.scoreKrabs++;
    Sprites.danny.x = 200;
    Sprites.danny.y = 200;
  } else if (Sprites.krabs.x >=420 || Sprites.krabs.x<=-20 ||  Sprites.krabs.y >=420 || Sprites.krabs.x <=-20) {
    Game.scoreKrabs--;
    Game.scoreDanny++;
    Sprites.krabs.x = 200;
    Sprites.krabs.y = 200;
  }
}

/* Makes all the main sprites visible */
function changeSprites() {
  Sprites.danny.visible = true;
  Sprites.krabs.visible = true;
  Sprites.sun.visible = true;
  Sprites.leftSword.visible = false;
  Sprites.rightSword.visible = false;
  Sprites.coin.visible = true;
}

/* Checks if a player wins */
function checkWin() {
  if (Game.scoreDanny == 100) {
    winScreen("Player 1");
  } else if (Game.scoreKrabs == 100) {
    winScreen("Player 2");
  } else if (Game.scoreKRabs == 100 && Game.scoreDanny == 100) {
     return killSprites();
  }
}

/* Sets the final win screen */
function winScreen(sprite) {
  var winText = sprite+" \nwins!!";
  var rotate = 3;
  killSprites();
  Sprites.gameOverText.visible = true;
  Sprites.husk.visible = true;
  Sprites.husk.rotation+= 3;
  if (sprite == "Player 1") {
    rotate++;
    Sprites.winDanny.visible = true;
    Sprites.winDanny.rotation+=rotate;
  } else if (sprite == "Player 2") {
    rotate++;
    Sprites.winKrabs.visible = true;
    Sprites.winKrabs.rotation+=rotate;
  }
  fill("red");
  background("cyan");
  textSize(30);
  text(winText,155,125);
  
}

/* Moves the coin randomly */
function moveCoin() {
  Sprites.coin.x = randomNumber(100,300);
  Sprites.coin.y = randomNumber(100,300);
}

/* Kills all the main Sprites */
function killSprites() {
  Sprites.danny.destroy();
  Sprites.krabs.destroy();
  Sprites.coin.destroy();
  Sprites.sun.destroy();
}

/* Returns adding Danny's Score */
function addScoreDanny(amount) {
 return Game.scoreDanny += amount;
}

/* Returns adding Krabs' Score */
function addScoreKrabs(amount) {
 return Game.scoreKrabs += amount;
}
