var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup , extraBulletGroup , extraBullet;

var lifeImage , bulletImage; 

var life =200 ; 
var lifetime = 3;
var score=0;
var gameState=1
var bullets=100;
function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg");
  lifeImage = loadImage("heart.png");
  bulletImage = loadImage ("bullets.png");
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  

  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  extraBulletGroup = createGroup();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
  bulletCount = createElement("h1")
}

function draw() {
    

  createCanvas(windowWidth , windowHeight);
 background("#BDA297")
  
  heading.html("Life: "+lifetime)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  bulletCount.html("bullets:"+bullets);
  bulletCount.style('color:red');
  bulletCount.position(width-500,20);

  if(gameState===1){
    gun.y=mouseY  
    
    if (frameCount % 80 === 0) {
      showExtraBullets();
    }

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }


    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }

    if(bullets < 1){
       handleGameOver1(extraBulletGroup);
    }

    if(extraBulletGroup.collide(backBoard)){
      extraBulletGroup.destroyEach();
    }
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(extraBulletGroup.collide(bulletGroup)){
      handleBulletCollision(extraBulletGroup);
    }

    drawSprites();
  }
   showLife();
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(100,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function showExtraBullets(){
  extraBullet = createSprite(800,random(100,700),40,40);
  extraBullet.addImage(bulletImage);
  extraBullet.scale=0.10
  extraBullet.velocityX = -8;
  extraBullet.lifetime = 400;
  extraBulletGroup.add(extraBullet);
}

function drawredBubble(){
  redbubble = createSprite(800,random(100,140),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet);
  bullets=bullets-1;
}


function showLife() {
  image(lifeImage   , 370 , 50  , 20 ,20);
 fill("white");
 rect( 400, 50, 185, 20);
 fill("red");
 rect( 400,  50, life, 20);
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 

    /* blast= sprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.add(blastImg) */

    /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
    image(blastImg) */
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleBulletCollision(extraBulletGroup){
  if (life > 0) {
    bullets = bullets+10;
  }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) 

  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  extraBulletGroup.destroyEach()
}

function handleGameOver1(extraBulletGroup){
  
  if(bullets > 0 ){
    bullets = bullets-1
  }
  else if(bullets <=0){
    bullets = bullets-0
  }
  extraBulletGroup.destroyEach();
  

  if (bullets <= 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
}

function handleGameover(bubbleGroup){
  
    if(life > 0 ){
      life = life-200/3
    }
    else if(life <=0){
      life = life-0
    }
    lifetime = lifetime - 1
    bubbleGroup.destroyEach();
    

    if (life <= 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
}