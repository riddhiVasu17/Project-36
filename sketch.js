var bg;
var dog, dogImg, happyImg, rest;
var database;
var foodS, foodStock;

function preload()
{ 
  bg = loadImage("images/bg2.jpg");
  dogImg = loadImage("images/dogSit.png");
  happyImg = loadImage("images/dogHappy.png");
  rest = loadImage("images/dogRest.png");
}

function setup() {
  createCanvas(1500, 700);
  
  database = firebase.database();
  
  dog = createSprite(600, 550);
  dog.addImage(dogImg);
  dog.scale = (0.7);

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(bg);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyImg);
  }

  drawSprites();
  
  fill("#004D40");
  textSize(35);
  textFont("Comic Sans MS");
  text("Press Up Arrow to feed Oreo", 490, 270);

  fill(255);
  textSize(30);
  textFont("Times New Roman");
  text("Food Left : " +foodS +" 🥛", 40, 660);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
    
    dog.addImage(rest);
  }
  else {
    x = x - 1;
  }

  database.ref("/").update({
    Food : x
  })
}


