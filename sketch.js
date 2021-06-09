//Create variables here
var dog;
var dogImage, happyDogImage;

var foodS, foodStock;

var database;

function preload()
{
  dogImage = loadImage("images/dogImg.png")

  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250, 325, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  if(keyWentUp(UP_ARROW)) {
    dog.addImage(dogImage);
  }

  textSize(24);
  fill("snow");
  text("Press the Up Arrow Key to Feed the Dog!",  30, 90);

  textSize(20);
  text("Food Left: " + foodS, 30, 40);

  drawSprites();
}

//Function to read the values from DB and assign to variable foodS
function readStock(data) {
  foodS = data.val();
}

//Function to write to values from DB and update them
function writeStock(food) {
  if(food == 0) {
    food = 20;
  }
  else {
    food-=1;
  }

  database.ref('/').update({
    food: food
  });
}