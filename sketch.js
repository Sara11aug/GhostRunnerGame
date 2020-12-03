//declaring the variables
var ghost,ghostStand,ghostJump;

var tower,towerImg;

var door,climber,invisibleBlock
var doorGroup, climberGroup,invisibleBlockGroup;
var doorImage,climberImage;

var sound;

var gameState="play";

var score=0;

function preload() {
  //loading the images
  ghostStand=loadImage("ghost-standing.png");
  ghostJump=loadImage("ghost-jumping.png");
  
  towerImg=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  
  //loading the sound
  sound=loadSound("spooky.wav");
}

function setup() {
  //creating the canvas
  createCanvas(600,600);
  
  //adding the sound
  sound.loop();
  
  //creating the ghost
  ghost=createSprite(300,100);
  ghost.addImage(ghostStand);
  ghost.scale=0.3;
  
  //creating the tower
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  
  //creating groups
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  //background color
  background("black");
  
  //gameState play and end
  if (gameState==="play"){
    //increasing the depth
    ghost.depth=ghost.depth+1;

    
    score = Math.round(getFrameRate());
    console.log(getFrameRate);
    
    //making the tower move
    tower.velocityY=-3;
    if (tower.y<300){
      tower.y=tower.height/2;
    }

    //making the ghost move with the keys
    if (keyDown("space")){
      ghost.velocityY=-5;
    }
    //adding gravity
    ghost.velocityY=ghost.velocityY+0.8;
    
    if (keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-10;
    }
    if (keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+10;
    }

    //calling function doors
    doors();

    //changing the gameState to end
    if (ghost.y<0 || ghost.y>600 || ghost.isTouching(climberGroup)){
      gameState="end";
      ghost.velocityY=0;
      ghost.destroy();
    }

    //drawing the sprites
    drawSprites();
    
    fill("yellow");
    textSize(20);
    text("Score : "+ score, 250,50)
    
  } else if (gameState==="end"){
    //displaying the text 'GameOver'
    textSize(30);
    fill("yellow")
    text("GameOver",220,300);
    score=0;
  }
}

//creating the function doors
function doors() {
  if (frameCount%200===0){
    //creating the door and climbers
    door = createSprite(200,0);
    door.addImage(doorImage);
    climber = createSprite(200,15);
    climber.addImage(climberImage);
    climber.scale=0.7;
    
    //creating the invisibleBlock
    invisibleBlock = createSprite(200,10);
    invisibleBlock.visible=false;
    
    //positions of door, climber and invisibleBlock
    door.x=Math.round(random(150,450));
    climber.x=door.x;
    climber.y=door.y+55;
    climber.width=door.width;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    //assigning the velocities
    door.velocityY=5;
    climber.velocityY=5;
    invisibleBlock.velocityY=5;
    
    //assigning lifetime
    door.lifetime=500;
    climber.lifetime=500;
    invisibleBlock.lifetime=500;
    
    //doorGroup
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}