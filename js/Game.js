class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
    car1.addImage("c1",c1)
    car2.addImage("c2",c2)
    car3.addImage("c3",c3)
    car4.addImage("c4",c4)
  }


  play(){
    form.hide();

    Player.getPlayerInfo();
     player.getCarsFinished()
    if(allPlayers !== undefined){
background(groundImg)
image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("blue")
          ellipse(x,y,80,100)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        text(allPlayers[plr].name ,x,y - 50)
      }

    }

    if(keyIsDown(UP_ARROW ) && player.index !== null && player.rank != 4){
      player.distance +=10
      player.update();
      
    }
if(player.distance>=4150 && player.rank != 4){
  gameState =2
  player.rank = player.rank+1
  player.update()
  player.updateCarsFinished(player.rank)
}
if(player.rank === 4){
game.update(2)
this.end()
}

    drawSprites();
  }
  end(){
    console.log("game over")
    background("black")
    Player.getPlayerInfo()
    var y = 200
    for(var i in allPlayers){
      fill("red")
      text(allPlayers[i].name + ":"+ allPlayers [i].rank,200,y)
      y = y+50
    }
  }
}
