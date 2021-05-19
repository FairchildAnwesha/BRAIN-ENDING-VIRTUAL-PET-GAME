//Create variables here
var dog, happyDog, foodS, foodStock
var dogIMG, happydogIMG
var database;

function preload()
{
  dogIMG= loadImage("images/dogImg.png")
  happydogIMG= loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database= firebase.database();

  dog = createSprite(250, 150)
  dog.scale= 0.5
  dog.addImage("doggo",dogIMG);
  dog.addImage("hellokitty", happydogIMG)
  
  
  foodStock= database.ref('food');
  foodStock.on("value", readStock)
}


function draw() { 
background(46, 139, 87);

if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.changeImage("hellokitty", happydogIMG)
    
  }

  drawSprites();

  textSize(23);
  fill("white");

text("Food Stock:"+ foodS, 250, 400);
  //add styles here

}

function readStock(data)
{
  foodS= data.val();

}

function writeStock(x)
{

  if(x<=0){
    x=0
  }
  else
  {
    x=x-1
  }

  database.ref('/').update({
    food: x
  })
}

