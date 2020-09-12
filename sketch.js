
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var survivalTime = 0;
var invisibleG;
var obstacleGroup;
var bananaGroup;



function preload(){
  
  bg = loadImage("ground.jpg");
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(400, 400);  
  
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  invisibleG = createSprite(200, 380, 400, 10);
  invisibleG.visible = false;
  

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 }
   


function draw() {
  background(bg);
  
  monkey.collide(invisibleG);
  
 
 
 // survivalTime = survivalTime ;
 survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime, 100, 50);


  
 if(World.frameCount%300===0){
  obstacle = createSprite(300, 365, 10, 10 );
  obstacle.addImage(obstacleImage);
  obstacle.setlifetime = 1;
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;
   
  obstacleGroup.add(obstacle);
 }
  
  
  if(World.frameCount%80===0){
  banana = createSprite(390, Math.round(random(120, 300)), 10, 10);
  banana.addImage(bananaImage);
  banana.velocityX = -2;
  banana.setlifetime = 60;
  banana.scale = 0.07;
  
  bananaGroup.add(banana);
  }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.6
  
   if(monkey.isTouching(obstacleGroup)){
     reset();
   }
  
  if(monkey.isTouching(bananaGroup)){
     console.log("We are here");
     resetbanana();
  }
  
  drawSprites();
  
}


function reset(){
  obstacleGroup.destroyEach();
  score = 0;
  monkey.x = 50;
  monkey.y = 360;

}

function resetbanana(){
  banana.destroy();
  bananaGroup.visible = false;
}