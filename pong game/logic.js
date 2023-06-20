let board;
let boardheight=500;
let boardwidth=500;
let context;

//player
let playerwidth=10;
let playerheight=50;
let playervelocityY=0;

//ball
let ballwidth=10;
let ballheight=10;
let ball={
    x:boardwidth/2,
    y:boardheight/2,
    width:ballwidth,
    height:ballheight,
    velocityX:1,
    velocityY:2
}

let player1={
    x:10,
    y:boardheight/2-25,
    width:playerwidth,
    height:playerheight,
    velocity:0
}

let player2={
    x:boardwidth-playerwidth-10,
    y:boardheight/2-25,
    width:playerwidth,
    height:playerheight,
    velocity:0
}


window.onload =function(){
    board=document.getElementById("board");
    board.height=boardheight;
    board.width=boardwidth;
    context=board.getContext("2d");

    context.fillStyle="skyblue";
    context.fillRect(player1.x,player1.y,playerwidth,playerheight);

    requestAnimationFrame(update);

}

function update(){
    requestAnimationFrame(update);
    context.fillRect(player2.x,player2.y,playerwidth,playerheight);

    context.fillRect(ball.x,ball.y,ballwidth,ballheight);
}