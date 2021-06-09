const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score = 0;


var gameState = "onSling";


//storing location variable 
//bg.png is a default image 
var bg = "sprites/bg.png";

function preload() {
   

    selectBackground();

    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    //if conditions work for true and false 
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    pig1.Scoreofgame();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    pig3.Scoreofgame();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    
    text("score: 0-0"+ score, 300, 50);
    
}

//mouseDragged and mouseReleased and keyPressed are automatic functions and get called based on events
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(bird.body);
    }
}

//our own function not predefined 
//async means that this fucntion does not play automatically/synchronically and waits for response 
 async function selectBackground(){

    //fetch is a function that can fetch data from any site called
    //await helps to wait for the response from the link before accessing
    var sky = await fetch("http://worldtimeapi.org/api/timezone/America/New_york");
    //json is a function that changes the format to JSON format 
    var JSONsky = await sky.json(); 
     

     var DateTime = JSONsky.datetime; 
     console.log(DateTime);

     //slice is a function that can go up to the place we want in Datetime number
     var myTime = DateTime.slice(11,13); 
     console.log(myTime);

     //this if condition allows us to select an image for the background 
     if(myTime > 6 && myTime < 19){
         
        bg = "sprites/bg.png";

     }

     else {

        bg = "sprites/bg2.jpg";

     }

     //this variable is going to be the one that gets the image loaded
     backgroundImg = loadImage(bg)
} 