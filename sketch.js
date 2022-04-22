var canvas, dolphin, dolphin_ani, bg, bg1, fish_ani, coin_ani, whale_ani;
var coinGroup, coin, fish, fishGroup, score, whaleGroup, netGroup, gameState="play"
var lives=3

function preload(){
    dolphin_ani=loadAnimation("D0.png","D1.png","D2.png","D3.png","D4.png","D5.png","D6.png","D7.png");
    dolphin_collided=loadAnimation("D0.png")
    fish_ani = loadAnimation("F0.png","F1.png","F2.png","F3.png","F4.png","F5.png","F6.png","F7.png");
    coin_ani=loadAnimation("C0.png","C1.png","C2.png","C3.png","C4.png","C5.png","C6.png","C7.png","C8.png","C9.png","C10.png","C11.png","C12.png","C13.png","C14.png","C15.png","C16.png","C17.png","C18.png","C19.png","C20.png","C21.png")
    whale_ani=loadAnimation("W0.gif","W1.gif","W2.gif","W3.gif","W4.gif")
    bg_img=loadImage("bg.jpg")
    net_img=loadImage("net.png")
}

function setup() {
    createCanvas(600,400);
    score = 0;
    dolphin = createSprite(50,350,20,10)
    dolphin.addAnimation("SwimmingDolphin", dolphin_ani)
    dolphin.addAnimation("CollidedDolphin", dolphin_collided)
    dolphin.scale = 0.6


    bg1 = createSprite(900,200,600,400)
    bg1.addImage(bg_img)
    bg = createSprite(300,200,600,400)
    bg.addImage(bg_img)

    
    dolphin.depth = bg.depth+1
    fishGroup=new Group()
    coinGroup=new Group()
    whaleGroup=new Group()
    netGroup=new Group()
}

function draw() {
    background("#ffffff")
    if(gameState === "play"){
        for (i=0; i<coinGroup.length;i++){
            if(coinGroup.get(i).isTouching(dolphin)){
                coinGroup.get(i).destroy()
                score+=1
            }
        }
        for (i=0; i<fishGroup.length;i++){
            if(fishGroup.get(i).isTouching(dolphin)){
                fishGroup.get(i).destroy()
                score+=3
            }
        }
        if(keyDown("RIGHT_ARROW")){
            bg.velocityX = -(4+3*score/100)
            bg1.velocityX = -(4+3*score/100)
            spawnCoins()
            spawnFish()
            spawnWhale()
            spawnNet()
            coinGroup.setVelocityXEach(-(4+3*score/100))
            coinGroup.setLifetimeEach(-1)
            fishGroup.setVelocityXEach(-(6+15*score/100))
            fishGroup.setLifetimeEach(-1)
            whaleGroup.setVelocityXEach(-(6+15*score/100))
            whaleGroup.setLifetimeEach(-1)
            netGroup.setVelocityXEach(-(4+3*score/100))
            netGroup.setLifetimeEach(-1)

        }
        else{
            bg.velocityX = 0
            bg1.velocityX = 0
            coinGroup.setVelocityXEach(0)
            fishGroup.setVelocityXEach(-(6+3*score/100))
            whaleGroup.setVelocityXEach(-(6+3*score/100))
            netGroup.setVelocityXEach(0)
        }
        if(bg.x < -300){
            bg.x = 900
        }
        if(bg1.x < -300){
            bg1.x = 900
        }
        if(keyDown("UP_ARROW")){
            dolphin.y-=5
        }
        if(keyDown("DOWN_ARROW")){
            dolphin.y+=5
        }
        if(dolphin.y > 360){
            dolphin.y = 360
        }
        if(dolphin.y < 40){
            dolphin.y = 40
        }
        if((whaleGroup.isTouching(dolphin) && lives != 0) || (netGroup.isTouching(dolphin) && lives != 0)){
            whaleGroup.destroyEach()
            coinGroup.destroyEach()
            netGroup.destroyEach()
            fishGroup.destroyEach()
            lives--
        }
        if(lives==0){
            gameState ="end"
        }
    }
    else if(gameState === "end"){
        bg.velocityX = 0
        bg1.velocityX = 0
        coinGroup.setVelocityXEach(0)
        fishGroup.setVelocityXEach(0)
        whaleGroup.setVelocityXEach(0)
        netGroup.setVelocityXEach(0)
        dolphin.changeAnimation("CollidedDolphin", dolphin_collided)
        
    }
    drawSprites()
    textSize(20)
    fill("black")
    text("Score:"+score, 500,50)
    text("Lives:"+lives, 500,80)
    if(gameState === "end"){
        textSize(50)
        text("Game Over!!", 150,200)
    }
}
function spawnCoins(){
    if(frameCount % Math.round(random(80,200))==0){
        coin = createSprite(600, 200, 20,20)
        coin.setCollider("circle", 0,0,40)
        coin.velocityX = -3
        coin.addAnimation("CoinSpin", coin_ani)
        coin.scale = 0.25
        coin.lifetime=200
        coin.y=Math.round(random(50,350))
        coinGroup.add(coin)
    }
}
function spawnFish(){
    if(frameCount % Math.round(random(120,200))==0){
        fish = createSprite(600, 200, 20,20)
        fish.velocityX = -3
        fish.addAnimation("fishSwin", fish_ani)
        fish.scale = 0.25
        fish.lifetime=200
        fish.y=Math.round(random(50,350))
        fishGroup.add(fish)
    }
}
function spawnWhale(){
    if(frameCount % Math.round(random(100,240))==0){
        whale = createSprite(600, 200, 20,20)
        whale.velocityX = -3
        whale.addAnimation("whaleSwin", whale_ani)
        whale.scale = 0.25
        whale.lifetime=200
        whale.debug = true
        whale.setCollider("circle", 0, 0, 100)
        whale.y=Math.round(random(50,350))
        whaleGroup.add(whale)
    }
}
function spawnNet(){
    if(frameCount % Math.round(random(100,240))==0){
        net = createSprite(600, 80, 20,20)
        net.velocityX = -3
        net.addImage(net_img)
        net.scale = 0.15
        net.lifetime = 200
        netGroup.add(net)
    }
}