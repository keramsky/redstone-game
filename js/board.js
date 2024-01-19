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
let rsgSpawnSpeed = 3000;
let changeSpawnRSGSpeed = 150;

startButtonElement.addEventListener('click', function(){
    boardElement.style.filter = "blur(0px)";
    startButtonElement.remove();
    startGame();
});

checkIfKeyPressed();

let rsg = [

];

function setTimer(){
    let sec = 2;
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

    if(boost === 1){
        let boostRSGElementID = rsgID;

        setTimeout(() => {
            let boostRSGElement = document.querySelector(`.id${boostRSGElementID}`);
            boostRSGElement.remove();
            for(let i = 0; i < rsg.length; i++){
                if (rsg[i].id === boostRSGElementID){
                    rsg[i].boost = undefined;
                    rsg[i].id = undefined;
                    rsg[i].height = undefined;
                    rsg[i].width = undefined;
                    break;
                }
            }
        }, 7000);
    }

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

function movePlayer() {
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

function checkIfKeyPressed(){

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
            movePlayer();
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
            movePlayer();
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
                rsg[i].width = undefined;
                rsg[i].height = undefined;
                playCollectSound();
            }
        }
        if(playerX <= rsg[i].width + rsgSizeX && playerX >= rsg[i].width){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >=rsg[i].height){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
                playCollectSound();
            }
        }
        if(playerY + playerSize >= rsg[i].height && playerY + playerSize <= rsg[i].height + rsgSizeY){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
                playCollectSound();
            }
        }
        if(playerY <= rsg[i].height + rsgSizeY && playerY >= rsg[i].height){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore(rsg[i].boost);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
                playCollectSound();
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

    let niceMemeVideo = document.createElement("video");
    niceMemeVideo.src = "video/nice-meme-video.mp4";
    niceMemeVideo.autoplay = "1";
    niceMemeVideo.style.position = "fixed";
    niceMemeVideo.style.top = "50px";
    niceMemeVideo.style.left = "50px";
    niceMemeVideo.style.width = "400px";

    setTimeout(() => {
        niceMemeVideo.remove();
    }, 3400);

    restartButton.addEventListener('click', function(){
        restartButton.remove();
        scoreText.remove();

        resetStats();
        startGame();
    });

    document.body.appendChild(niceMemeVideo);
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

function spawnRSGSpeed(speed){
    speed -= changeSpawnRSGSpeed;

    if(speed < 500){
        changeSpawnRSGSpeed = 0;
        speed = 500;
    }

    setTimeout(() => {
        if(!end){
            spawnRSG(0);
            console.log(speed);
        }
        spawnRSGSpeed(speed)
    }, speed);
}

function playCollectSound() {
    let audio = new Audio("audio/collect-rsg.mp3");
    audio.play()
}

function startGame(){
    score = 0;
    end = false;

    setTimer();
    
    let i = 1;
    let randNum = Math.floor(Math.random() * 20);
    setInterval(() => {
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

    if(!end){
        spawnRSG(0);
    }

    spawnRSGSpeed(rsgSpawnSpeed - changeSpawnRSGSpeed);
}