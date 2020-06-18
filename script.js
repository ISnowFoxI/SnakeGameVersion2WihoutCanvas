let food = document.getElementById('food');
let snake = document.getElementById('snake');
let gc= document.getElementById('gameContainer');
let gcWidth = document.getElementById('gameContainer').clientWidth;
let gcHeight = document.getElementById('gameContainer').clientHeight;
let scoreText= document.getElementById('score');
let score= 0 ;
let direct;
let speed =10;
let gameSpeed = 65;
let div;
let taildiv;
let snakeTailX;
let snakeTailY;
let position = { };
let snakeArrayX = Math.floor(Math.random()*10)*60;
let snakeArrayY =Math.floor(Math.random()*10)*60;
let foodX = Math.floor(Math.random()*10)*60; 
let foodY = Math.floor(Math.random()*10)*60; 
//snake starting position

let snakeArray = [];

//Starting postition generator
function snakeStartPos() { 
    snake.style.left = snakeArrayX + 'px'; 
    snake.style.top = snakeArrayY + 'px'; 
    
} 

// food generator
function foodGenerator(x,y) { 
    food.style.left = x + 'px'; 
    food.style.top = y + 'px'; 
    
} 
function newFood() { 
    foodX = Math.floor(Math.random()*10)*60; 
    foodY = Math.floor(Math.random()*10)*60; 
    food.style.left = foodX + 'px'; 
    food.style.top = foodY + 'px'; 
}


//controls 
document.addEventListener("keydown", direction)
document.addEventListener("keydown", speedUp)
document.addEventListener("keyup", speedUp)

function speedUp (event) { 
    let key = event.keyCode
     if (key == 16){
        if(speed!=20)
            speed=speed*2;   
            else if (speed==20) 
            speed=10;
        }
    }

function direction(event) {
    let key = event.keyCode  
    if ((key == 37 || key == 65) && direct!="right") {
        direct = "left"
    } else if ((key == 38 || key == 87) && direct!="down") {
        direct = "up"
    } else if ((key == 39 || key == 68) && direct!="left") {
        direct = "right"
    } else if ((key == 40 || key == 83) && direct!="up") {
        direct = "down"
    }  
}

// game function, updates the screeen every 65 ms
function game () {
    //condition to generate new food while eating the current food 


//wall borders
if( snakeArrayX<=-10 || snakeArrayX>=gcWidth || snakeArrayY<=-10 || snakeArrayY>=gcHeight){
    window.location.reload();
}
//direction updater 
if (direct=="left") {
    snakeArrayX-=speed;
    snake.style.left = snakeArrayX +'px'; 
    position = { 
        x:snakeArrayX, 
        y:snakeArrayY
    }
           
        
    } else if (direct=="up") {
        snakeArrayY-=speed;
        snake.style.top=snakeArrayY+'px'
        position = { 
            x:snakeArrayX, 
            y:snakeArrayY
        }
        
    } else if ( direct=="right") {
        snakeArrayX+=speed;
        snake.style.left=snakeArrayX+'px'
        position = { 
            x:snakeArrayX, 
            y:snakeArrayY
        }
       
        
    } else if ( direct=="down") {
        snakeArrayY+=speed;
        snake.style.top=snakeArrayY+'px'
        position = { 
            x:snakeArrayX, 
            y:snakeArrayY
        }
      
        
    }    
    snakeArray.unshift(position);// tail position adder 
    if(snakeArrayX==foodX && snakeArrayY==foodY){
        score++;
        scoreText.innerHTML='Score: ' + score;;
        newFood(foodX,foodY)
        snakeBlocks()
    }
    
    
    
     //tail generator 
    function snakeBlocks() { 
        div = document.createElement("div");   
        div.className='snakeTail';    
            for(let i = 0 ; i<snakeArray.length; i++){    
                 gc.appendChild(div);  
             }
    }

    
    //snake tail adder thingy (honestly i have no idea how i wrote this xD )
    let j = 1;
    while( j <=snakeArray.length-1){ 
        
        taildiv = document.querySelector(`.snakeTail:nth-child(${j}n)`)  
         snakeTailX=snakeArray[j].x;
         snakeTailY=snakeArray[j].y;

            taildiv.style.left=snakeTailX + 'px'
            taildiv.style.top=snakeTailY+ 'px';
            j++
            
            //collision detection condition or CDC haha 
            if( snakeArrayX==snakeTailX && snakeArrayY==snakeTailY ){
                window.location.reload();
            }
            
        }
    }
    
    

   
    



//Game reset
document.addEventListener("keydown", reset)
function reset(event) { 
    let key = event.keyCode
    if (key == 82) {
        window.location.reload();
    }
     
}


snakeStartPos()
foodGenerator(foodX,foodY)


//game start 
let gameStart = setInterval(game, gameSpeed);