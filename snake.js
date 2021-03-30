
function init(){
    canvas=document.getElementById("mycanvas");
    W=H=canvas.width=canvas.height=1000;
    pen=canvas.getContext('2d'); //draw something on the game object
    cs=62;
    gameover=false;
    food=getrandom();
    snake={
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        

        createsnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawsnake:function(){
            for(var i=0;i<this.init_len;i++){
            pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-4,cs-4);
            }
        },
        updatesnake:function(){
            var headx=this.cells[0].x;
            var heady=this.cells[0].y;
            if(headx==food.x && heady==food.y){
                food=getrandom();
            }
            else{
                this.cells.pop();
            }
            var nextX,nexty;
            if(this.direction=="right"){
                nextX=headx+1;
                nexty=heady;
            }
            else if(this.direction=="left"){
                nextX=headx-1;
                nexty=heady;
            }
            else if(this.direction=="down"){
                nextX=headx;
                nexty=heady+1;
            }
            else if(this.direction=="up"){
                nextX=headx;
                nexty=heady-1;
            }
            this.cells.unshift({x:nextX,y:nexty});
              
            var lastx=Math.round(W/cs);
            var lasty=Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].y>lasty || this.cells[0].x>lastx){
                gameover=true;
            }
        }
    };
    snake.createsnake();
    function keypressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
    }
    document.addEventListener('keydown',keypressed)


}
function getrandom(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);
    var food={
        x:foodx,
        y:foody,
        color:"red",
    }
    return food;
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
}
function update(){
    snake.updatesnake();
    

}
function gameloop(){
     if(gameover==true){
      clearInterval(f);  
      alert("gameover");
    } 
    draw();
    update();
  
}
init();
var f=setInterval(gameloop,100);