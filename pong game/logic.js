let board;
let boardHeight = 500;
let boardWidth = 500;
let context;
 // Player
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 5;

// Ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1,
  velocityY: 2
    };
    
    let player1 = {
      x: 10,
      y: boardHeight / 2 - 25,
      width: playerWidth,
      height: playerHeight,
      velocity: 0,
      score: 0
    };

    let player2 = {
      x: boardWidth - playerWidth - 10,
      y: boardHeight / 2 - 25,
      width: playerWidth,
      height: playerHeight,
      velocity: 0,
      score: 0
    };

    let gameOver = false;

    window.onload = function() {
      board = document.getElementById("board");
      board.height = boardHeight;
      board.width = boardWidth;
      context = board.getContext("2d");

      function render() {
        context.clearRect(0, 0, boardWidth, boardHeight);
        context.fillStyle = "gold";
        context.fillRect(player1.x, player1.y, player1.width, player1.height);
        context.fillRect(player2.x, player2.y, player2.width, player2.height);
        context.fillRect(ball.x, ball.y, ball.width, ball.height);
        context.font = "20px cursive";
        context.fillText(`Player 1: ${player1.score}`, 10, 30);
        context.fillText(`Player 2: ${player2.score}`, boardWidth - 120, 30);
      }

      const resetBtn = document.getElementById('resetbtn');

      resetBtn.addEventListener('click',()=>{
        player1.score = 0;
        player2.score = 0;
      })

      function update() {
        if (gameOver) {
          context.fillStyle = "black";
          context.font = "40px Arial";
          context.fillText("Game Over", boardWidth / 2 - 100, boardHeight / 2);
          return;
        }

        render();

        // Update player positions
        player1.y += player1.velocity;
        player2.y += player2.velocity;

        // Check if the players hit the top or bottom wall
        if (player1.y <= 0) {
          player1.y = 0;
        } else if (player1.y + player1.height >= boardHeight) {
          player1.y = boardHeight - player1.height;
        }

        if (player2.y <= 0) {
          player2.y = 0;
        } else if (player2.y + player2.height >= boardHeight) {
          player2.y = boardHeight - player2.height;
        }

        // Update ball position
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        // Check if the ball hits the left or right wall
        if (ball.x <= 0) {
          // Player 2 scores a point
          player2.score++;
          resetBall();
          checkGameOver();
        } else if (ball.x + ball.width >= boardWidth) {
          // Player 1 scores a point
          player1.score++;
          resetBall();
          checkGameOver();
        }

        // Check if the ball hits the top or bottom wall
        if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
          ball.velocityY = -ball.velocityY; // Reverse the vertical direction
        }
// Check if the ball hits the players' paddles
        if (
          ball.x <= player1.x + player1.width &&
          ball.y + ball.height >= player1.y &&
          ball.y <= player1.y + player1.height
        ) {
          ball.velocityX = -ball.velocityX; // Reverse the horizontal direction
        }

        if (
          ball.x + ball.width >= player2.x &&
          ball.y + ball.height >= player2.y &&
          ball.y <= player2.y + player2.height
        ) {
          ball.velocityX = -ball.velocityX; // Reverse the horizontal direction
        }

        // Call requestAnimationFrame again to continue the animation loop
        requestAnimationFrame(update);
      }

      function resetBall() {
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
        ball.velocityX = -ball.velocityX;
        ball.velocityY = Math.random() > 0.5 ? -1 : 1; // Randomize the vertical direction
      }

      document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" && player2.y >= 0) {
          player2.velocity = -playerVelocityY;
        } 
        else if (event.key === "ArrowDown" && player2.y <= boardHeight - player2.height) {
          player2.velocity = playerVelocityY;
        }
        if (event.key === "s" && player1.y >= 0) {
          player1.velocity = -playerVelocityY;
        } 
        else if (event.key === "z" && player1.y <= boardHeight - player1.height) {
          player1.velocity = playerVelocityY;
        }
      });

      document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          player2.velocity = 0;
        }

        if (event.key === "s" || event.key === "z") {
          player1.velocity = 0;
        }
      });

      function checkGameOver() {
        if (player1.score === 5 || player2.score === 5) {
          gameOver = true;
        }
      }

      resetBall();
      update();
      checkGameOver();
    };
  
