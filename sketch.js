var database , foodstock , dog , happydog , foodS ;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);
  dog = createSprite(200,300,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.5;
}


function draw() {  
background("white");
if(foodS !== undefined){
  textSize(20);
  text("press up arrow to feed the dog", 50 ,50);
  text("food remaining "+foodS,300,200);

if(foodS === 0){
  foodS = 20;
}
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImage);
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImage);
}
  drawSprites();
}
}
function writeStock(x){
  if(x<=0){
    x =0;
  }
  else{
     x = x-1;
  }
database.ref('/').update({
  food:x
})
}
function readStock(data)
{
foodS = data.val();
}

