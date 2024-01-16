let playerY = 175;
let playerX =  400;
let rsgX;
let rsgY;
let playerSize = 100;
let rsgSizeX = 30;
let rsgSizeY = 24;

startButtonElement.addEventListener('click', function(){
    boardElement.style.filter = "blur(0px)";
    startButtonElement.remove();
    startGame();
});

function setTimer(){
    let sec = 60;
    timerElement.innerHTML = `${sec}`;

    timer = setInterval(() => {
        sec--;
        timerElement.innerHTML = `${sec}`;
        if(sec < 1){
            clearInterval(timer);
        }
    }, 1000);
}

function spawnRSG(){
    rsgX = Math.floor(Math.random() * 860);
    rsgY = Math.floor(Math.random() * 410);

    if(rsgX < 30){
        rsgX = 30;
    }

    if(rsgY < 30){
        rsgY = 30;
    }

    rsgContainerElement.innerHTML = `<img class="rsg js-rsg" src="images/rsg.png">`

    rsgElement = document.querySelector('.js-rsg');

    rsgElement.style.left = `${rsgX}px`;
    rsgElement.style.top = `${rsgY}px`;
}

function movePlayer(score){
    document.body.addEventListener("keydown", (event) => {
        if(event.key === 'ArrowUp' && playerY > 0){
            playerElement.style.top = `${playerY - 10}px`;
            playerY -= 10;
            checkContact(score);
        }
        else if(event.key === 'ArrowDown' && playerY < 350){
            playerElement.style.top = `${playerY + 10}px`;
            playerY += 10;
            checkContact(score);
        }
        else if(event.key === 'ArrowRight' && playerX < 800){
            playerElement.style.left = `${playerX + 10}px`;
            playerX += 10;
            checkContact(score);
        }
        else if(event.key === 'ArrowLeft' && playerX > 0){
            playerElement.style.left = `${playerX - 10}px`;
            playerX -= 10;  
            checkContact(score);
        }
    });
}

function checkContact(score){
    if(playerX + playerSize >= rsgX && playerX + playerSize <= rsgX + rsgSizeX){
        if(playerY <= rsgY + rsgSizeY && playerY + playerSize >= rsgY){
            rsgElement.remove();
            score++;
            updateScore(score);
            rsgX = undefined;
            rsgY = undefined;
        }
    }
    if(playerX <= rsgX + rsgSizeX && playerX >= rsgX){
        if(playerY <= rsgY + rsgSizeY && playerY + playerSize >= rsgY){
            rsgElement.remove();
            score++;
            updateScore(score);
            rsgX = undefined;
            rsgY = undefined;
        }
    }
    if(playerY + playerSize >= rsgY && playerY + playerSize <= rsgY + rsgSizeY){
        if(playerX <= rsgX + rsgSizeX && playerX + playerSize >= rsgX){
            rsgElement.remove();
            score++;
            updateScore(score);
            rsgX = undefined;
            rsgY = undefined;
        }
    }
    if(playerY <= rsgY + rsgSizeY && playerY >= rsgY){
        if(playerX <= rsgX + rsgSizeX && playerX + playerSize >= rsgX){
            rsgElement.remove();
            score++;
            updateScore(score);
            rsgX = undefined;
            rsgY = undefined;
        }
    }
}

function updateScore(score){
    scoreElement.innerHTML = `${score}`;
}

function startGame(){
    let score = 0;

    setTimer();
    spawnRSG();
    movePlayer(score);
}