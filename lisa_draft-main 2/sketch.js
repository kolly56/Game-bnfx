var obst, Obg
var gameState="play";


function preload(){
b=loadAnimation("images/b1.png","images/b2.png","images/b3.png");
bg=loadImage("images/Background.jpg");
f=loadAnimation("images/f1.png","images/f2.png","images/f3.png");
ob1=loadImage("images/o1.png");
ob2=loadImage("images/o2.png");
ob3=loadImage("images/o3.png");
cav=loadImage("images/cave1.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 database = firebase.database();
 inground=createSprite(2.5*displayWidth,displayHeight-170,5*displayWidth,10);
 inground.visible=false;
bn=createSprite(displayWidth/4,displayHeight-200);
bn.addAnimation("running",b);
bn.scale=2;
database.ref('bunny/position').update({
  x:350,
  y:700
})
fx=createSprite(displayWidth/4-200,displayHeight-215);
fx.addAnimation("running",f);
fx.scale=2;
database.ref('fox/position').update({
  x:200,
  y:698
})
var bnRef  = database.ref('bunny/position');
    bnRef.on("value",function(data){
       var pos = data.val();
       bn.x=pos.x;
       bn.y=pos.y;
      })
      var fxRef  = database.ref('fox/position');
    fxRef.on("value",function(data){
       var pos = data.val();
       fx.x=pos.x;
       fx.y=pos.y;
      })
cav1=createSprite(4*displayWidth+70,660);
cav1.addImage(cav);
cav1.scale=1;
Obg=new Group();
Obsticles();


}




function draw(){
  image(bg, -500, 0, displayWidth+520, displayHeight-30)
  image(bg, displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 2*displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 3*displayWidth-20, 0, displayWidth-20, displayHeight-30)
  image(bg, 4*displayWidth-20, 0, displayWidth-20, displayHeight-30)
bn.collide(inground);
  camera.position.x = bn.x;
  camera.position.y = displayHeight/2;
  if(gameState==="play"){

    if(Obg.isTouching(bn)){
    bn.x-=20;
      
    }
  
  if(keyDown("r")){
    database.ref("bunny/position").set({
      x:bn.x+10,
      y:bn.y
      
    });
  }
  if(keyDown("f")){
    database.ref("fox/position").set({
      x:fx.x+10,
      y:fx.y
      
    });
  }
  if(keyDown("space")){
    bn.velocityY=-12;
  }
  bn.velocityY+=0.8;
  }
  if(bn.isTouching(cav1)){
    bn.visible=false;
    textSize(40)
    fill("black");
   text("Bunny escaped!",bn.x,displayHeight/2);
    gameState="end";
  }
    else
  if(fx.isTouching(bn)){
    textSize(40)
    fill("black");
   text("End!!!",bn.x,displayHeight/2);
   gameState="end";
    }
  

  drawSprites();
}

function Obsticles(){
  for(var i=600;i<4*displayWidth-20;i++){
    if(i%850===0){
      obst=createSprite(i,710);
      var rand=Math.round(random(1,3));
      switch(rand){
        case 1:obst.addImage(ob1);
        break;
        case 2:obst.addImage(ob2);
        break;
        case 3:obst.addImage(ob3);
        break;
        default:
        break;
      }
    obst.scale=2;
    Obg.add(obst);
    }
  }

}
