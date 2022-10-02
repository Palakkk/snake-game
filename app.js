const snakeBoard=document.getElementById("snakeboard");
const snakeBoard_ctx=snakeBoard.getContext("2d");
document.addEventListener("keydown", changeDirection);

const snake_col='red';
const snake_bor='darkblue';
const board_background='black';
const board_border='black';
let foodX;
let foodY;
let dx=20, dy=0;
let changing_direction=false;
//snake coordinates initially
let snake=[
    {x:200, y:200}, 
    {x:180, y:200}, 
    {x:160, y:200},
]
let score=0; 

//main function
function main(){
    if (game_over()){
        document.getElementById("gameover").innerHTML="GAME OVER";
        // document.location.reload();
        return;
    } 
    changing_direction = false;
    //on every tick clear canvas, move the snake position, draw the snake at  that position, vapis main
    setTimeout(function onTick(){
        clearCanvas();
        draw_food();
        drawSnake();
        moveSnake();
        main();
    },100)      
}

//called by main 
//canvas color,border-color
function clearCanvas() {
    snakeBoard_ctx.fillStyle = board_background;
    snakeBoard_ctx.strokestyle = board_border;
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}
//draw the snake 
function drawSnake(){
    snake.forEach(drawSnakePart);
}
//draw eacj snake part
function drawSnakePart(snakePart){
    snakeBoard_ctx.fillStyle = snake_col;
    snakeBoard_ctx.strokestyle= snake_bor;
    snakeBoard_ctx.fillRect(snakePart.x,snakePart.y,20,20);  
    snakeBoard_ctx.strokeRect(snakePart.x,snakePart.y,20,20);  
}
function draw_food(){
    snakeBoard_ctx.fillStyle = 'white';
    snakeBoard_ctx.strokestyle = 'grey';
    snakeBoard_ctx.fillRect(foodX, foodY, 20, 20);
    snakeBoard_ctx.strokeRect(foodX, foodY, 20, 20);
}

//move the snake 
function moveSnake(){
    
    const head={x: snake[0].x+dx, y:snake[0].y+dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === foodX && snake[0].y === foodY;
    if(has_eaten_food){
        score+=10;
        document.getElementById('score').innerHTML=score;
        gen_food();               
    }
    else{
        snake.pop();
    } 
}

//change direction
function changeDirection(event){
    if(changing_direction) return
    changing_direction=true;
    LEFT_KEY=37;
    UP_KEY=38;
    RIGHT_KEY=39;
    DOWN_KEY=40;

    const keyPressed=event.keyCode;
    const goingLeft = dx===-20;          //yeh kya kiya hai???
    const goingUp = dy===-20;
    const goingRight = dx===20;
    const goingDown = dy===20;

    if(keyPressed === LEFT_KEY && !goingRight){
        dx=-20;
        dy=0;
    }
    if(keyPressed === UP_KEY && !goingDown){
        dx=0;
        dy=-20;
    }
    if(keyPressed === RIGHT_KEY && !goingLeft){
        dx=20;
        dy=0;
    }
    if(keyPressed === DOWN_KEY && !goingUp){
        dx=0;
        dy=20;
    }

}

//food

function random_food(min,max){
    return Math.round((Math.random()*(max-min)+min)/20)*20;
}
function gen_food(){
    foodX=random_food(0,snakeBoard.width-10);
    foodY=random_food(0,snakeBoard.height-10);

    snake.forEach(function snake_has_eaten(part){
        const has_eaten = part.x == foodX && part.y == foodY;
        if(has_eaten) gen_food();
    });
}

//for game over
function game_over(){
    //if collided with itself
    for(let i=4;i<snake.length;i++){
        const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(has_collided) return true;
    }

    //if collided with boundary
    const leftB=snake[0].x<0;  
    const RightB=snake[0].x>snakeBoard.width-20;  
    const UpB= snake[0].y<0;  
    const DownB= snake[0].y>snakeBoard.height-20;  

    return leftB || RightB || UpB || DownB
 
}

//calling main function 
main();
gen_food();
