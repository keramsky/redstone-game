let playerY = 175;
let playerX =  400;
let playerSize = 100;
let rsgSizeX = 30;
let rsgSizeY = 24;
let rsgID = 1;
let score = 0;
let end = false;
let stopSpawnRSG;

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

function spawnRSG(){

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
    rsgElement.src = "images/rsg.png";

    rsgContainerElement.appendChild(rsgElement);

    rsgElement.style.position = `absolute`;
    rsgElement.style.left = `${rsgX}px`;
    rsgElement.style.top = `${rsgY}px`;

    rsg.push({id: rsgID, height: rsgY, width: rsgX});

    rsgID++;
}

function movePlayer(){
    document.body.addEventListener("keydown", (event) => {
        if(!end){
            if(event.key === 'ArrowUp' && playerY > 0){
                playerElement.style.top = `${playerY - 10}px`;
                playerY -= 10;
                checkContact();
            }
            else if(event.key === 'ArrowDown' && playerY < 350){
                playerElement.style.top = `${playerY + 10}px`;
                playerY += 10;  
                checkContact();
            }
            else if(event.key === 'ArrowRight' && playerX < 800){
                playerElement.style.left = `${playerX + 10}px`;
                playerX += 10;  
                checkContact();
            }
            else if(event.key === 'ArrowLeft' && playerX > 0){
                playerElement.style.left = `${playerX - 10}px`;
                playerX -= 10;  

                checkContact();
            }  
        }
    });
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
                updateScore();
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerX <= rsg[i].width + rsgSizeX && playerX >= rsg[i].width){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >=rsg[i].height){
                currentRSG.remove();
                updateScore();
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY + playerSize >= rsg[i].height && playerY + playerSize <= rsg[i].height + rsgSizeY){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore();
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY <= rsg[i].height + rsgSizeY && playerY >= rsg[i].height){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                currentRSG.remove();
                updateScore();
                console.log();
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
    }
}

function updateScore(){
    score++;
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
    stopSpawnRSG = setInterval(() => {
        if(!end){
            spawnRSG();
        }
    }, 2000);
}