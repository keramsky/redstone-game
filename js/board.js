let playerY = 175;
let playerX =  400;
let playerSize = 100;
let playerSpeed = 10;
let playerSpeedDiagonal = 5;
let rsgSizeX = 30;
let rsgSizeY = 24;
let rsgID = 1;
let score = 0;
let end = false;
let stopSpawnRSG;
let isUpArrowPressed = false;
let isRightArrowPressed = false;
let isLeftArrowPressed = false;
let isDownArrowPressed = false;
let scoreWithBooster = 10;


startButtonElement.addEventListener('click', function(){
    boardElement.style.filter = "blur(0px)";
    startButtonElement.remove();
    startGame();
});

movePlayer();

let rsg = [

];

function setTimer(){
    let sec = 60;
    timerElement.innerHTML = `${sec}`;

    timer = setInterval(() => {
        sec--;
        timerElement.innerHTML = `${sec}`;
        if(sec < 1){
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function spawnRSG(boost){

    let rsgX = Math.floor(Math.random() * 860);
    let rsgY = Math.floor(Math.random() * 410);

    if(rsgX < 30){
        rsgX = 30;
    }

    if(rsgY < 30){
        rsgY = 30;
    }



    let rsgElement = document.createElement("img");

    rsgElement.classList.add(`id${rsgID}`);
    if(boost === 1){
        rsgElement.src = "images/rsg2.png";
    } else {
        rsgElement.src = "images/rsg.png";
    }

    rsgContainerElement.appendChild(rsgElement);

    rsgElement.style.position = `absolute`;
    rsgElement.style.left = `${rsgX}px`;
    rsgElement.style.top = `${rsgY}px`;

    if(boost === 1){
        rsg.push({boost: 1, id: rsgID, height: rsgY, width: rsgX});
    } else {
        rsg.push({boost: 0, id: rsgID, height: rsgY, width: rsgX});
    }


    rsgID++;
}

function checkBla() {
    if(!end){
        if (isUpArrowPressed && isRightArrowPressed && (playerY > 0 && playerX < 800)) {
            playerElement.style.left = `${playerX + playerSpeedDiagonal}px`;
            playerX += playerSpeedDiagonal;  
    
            playerElement.style.top = `${playerY - playerSpeedDiagonal}px`;
            playerY -= playerSpeedDiagonal;  
            checkContact();
        }
    
        else if (isUpArrowPressed && isLeftArrowPressed && (playerY > 0 && playerX > 0)) {
            playerElement.style.left = `${playerX - playerSpeedDiagonal}px`;
            playerX -= playerSpeedDiagonal;  
    
            playerElement.style.top = `${playerY - playerSpeedDiagonal}px`;
            playerY -= playerSpeedDiagonal;  
            checkContact();
        }
    
        else if (isDownArrowPressed && isRightArrowPressed && (playerY < 350 && playerX < 800)) {
            playerElement.style.left = `${playerX + playerSpeedDiagonal}px`;
            playerX += playerSpeedDiagonal;  
    
            playerElement.style.top = `${playerY + playerSpeedDiagonal}px`;
            playerY += playerSpeedDiagonal;  
            checkContact();
        }
    
        else if (isDownArrowPressed && isLeftArrowPressed && (playerY < 350 && playerX > 0)) {
            playerElement.style.left = `${playerX + playerSpeedDiagonal}px`;
            playerX -= playerSpeedDiagonal;  
    
            playerElement.style.top = `${playerY + playerSpeedDiagonal}px`;
            playerY += playerSpeedDiagonal;  
            checkContact();
        }
    
    
        else if (isUpArrowPressed && playerY > 0) {
            playerElement.style.top = `${playerY - playerSpeed}px`;
            playerY -= playerSpeed;
            checkContact();
        }
        else if (isDownArrowPressed && playerY < 350) {
            playerElement.style.top = `${playerY + playerSpeed}px`;
            playerY += playerSpeed;  
            checkContact();
        }
        else if (isLeftArrowPressed && playerX > 0) {
            playerElement.style.left = `${playerX - playerSpeed}px`;
            playerX -= playerSpeed;  
            checkContact();
        }
        else if (isRightArrowPressed && playerX < 800) {
            playerElement.style.left = `${playerX + playerSpeed}px`;
            playerX += playerSpeed;  
            checkContact();
        }
    }


}

function movePlayer(){

    if(!end){
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                isUpArrowPressed = true;
            } else if (event.key === 'ArrowRight') {
                isRightArrowPressed = true;
            } else if (event.key === 'ArrowLeft') {
                isLeftArrowPressed = true;
            } else if (event.key === 'ArrowDown') {
                isDownArrowPressed = true;
            }
            checkBla();
        });
        
        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowUp') {
                isUpArrowPressed = false;
            } else if (event.key === 'ArrowRight') {
                isRightArrowPressed = false;
            } else if (event.key === 'ArrowLeft') {
                isLeftArrowPressed = false;
            } else if (event.key === 'ArrowDown') {
                isDownArrowPressed = false;
            }
            checkBla();
        });
    }

}

function checkContact(){
    if(rsg.length == 0){
        return;
    }

    for(let i = 0; i < rsg.length; i++){
        let currentRSG = document.querySelector(`.id${rsg[i].id}`);

        if(playerX + playerSize >= rsg[i].width && playerX + playerSize <= rsg[i].width + rsgSizeX){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >= rsg[i].height){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerX <= rsg[i].width + rsgSizeX && playerX >= rsg[i].width){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >=rsg[i].height){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY + playerSize >= rsg[i].height && playerY + playerSize <= rsg[i].height + rsgSizeY){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY <= rsg[i].height + rsgSizeY && playerY >= rsg[i].height){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
    }
}

function updateScore(boost){
    if(boost === 1){
        score += scoreWithBooster;
    } else {
        score++;
    }

    scoreElement.innerHTML = `${score}`;
}

function endGame(){
    end = true;
    boardElement.style.filter = "blur(7px)";

    let scoreText = document.createElement("p");
    scoreText.classList.add("score-text");
    scoreText.innerHTML = `Your score is ${score}`;

    let restartButton = document.createElement("button");
    restartButton.classList.add("start-button");
    restartButton.classList.add("js-restart-button");
    restartButton.innerHTML = "restart";

    restartButton.style.left = "340px";

    restartButton.addEventListener('click', function(){
        restartButton.remove();
        scoreText.remove();

        resetStats();
        startGame();
    });

    startButtonContainerElement.appendChild(scoreText);
    startButtonContainerElement.appendChild(restartButton);

}

function resetStats(){
    boardElement.style.filter = "blur(0px)";
    scoreElement.innerHTML = 0;
    score = 0;
    clearInterval(stopSpawnRSG);

    while(rsg.length > 0){
        rsg.pop();
    }

    rsgContainerElement.innerHTML = "";

    playerY = 175;
    playerX = 400;

    playerElement.style.left = "400px";
    playerElement.style.top = "175px";

}

function startGame(){
    score = 0;
    end = false;

    setTimer();
    
    let i = 1;
    let randNum = Math.floor(Math.random() * 20);
    setInterval(() => {
        console.log(i);
        console.log(randNum);
        if (i === randNum){
            if(!end){
                spawnRSG(1);
            }
        }
        if(i === 20 || i === 40){
            i = 0;
            randNum = Math.floor(Math.random() * 20);
        }

        i++;
        
    }, 1000);

    stopSpawnRSG = setInterval(() => {
        if(!end){
            spawnRSG(0);
        }
    }, 2000);
}