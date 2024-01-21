let playerY = 175;
let playerX =  400;
let playerSize = 60;
let playerSpeed = 1;
let playerSpeedDiagonal = 5;
let rsgSizeX = 30;
let rsgSizeY = 25;
let rsgID = 1;
let score = 0;
let end = true;
let stopSpawnRSG;
let stopSpawnBOOST;
let isUpArrowPressed = false;
let isRightArrowPressed = false;
let isLeftArrowPressed = false;
let isDownArrowPressed = false;
let scoreWithBooster = 10;
let rsgSpawnSpeed = 3000;
let changeSpawnRSGSpeed = 150;
let boostRSGElementID;

startButtonElement.addEventListener('click', function(){
    boardElement.style.filter = "blur(0px)";
    startButtonElement.remove();
    startGame();
});


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
        rsgElement.src = "images/rsgBlue.png";
    } else {
        rsgElement.src = "images/rsgPink.png";
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

    let audio = new Audio("audio/victory.mp3");
    audio.play();

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
    clearInterval(stopSpawnBOOST);
    rsgSpawnSpeed = 3000;

    while(rsg.length > 0){
        rsg.pop();
    }

    rsgContainerElement.innerHTML = "";

    x = 175;
    y = 400;

}

function spawnRSGSpeed(speed){
    speed -= changeSpawnRSGSpeed;

    if(speed < 500){
        changeSpawnRSGSpeed = 0;
        speed = 500;
    }

    stopSpawnRSG = setTimeout(() => {
        if(!end){
            spawnRSG(0);
        }
        spawnRSGSpeed(speed)
    }, speed);
}

function playCollectSound(boost) {
    let audio;

    if(boost === 1){
        audio = new Audio("audio/boost.mp3");
    } else if(boost === 0) {
        audio = new Audio("audio/coin.mp3");
    }

    audio.play()
}


function startGame(){
    score = 0;
    end = false;

    x = 420;
    y = 200;

    setTimer();
    
    let i = 1;
    let randNum = Math.floor(Math.random() * 20);
    if(randNum === 0) randNum = 1;
    stopSpawnBOOST = setInterval(() => {
        if (i === randNum){
            if(!end){
                spawnRSG(1);
            }
        }
        if(i === 20 || i === 40){
            i = 0;
            randNum = Math.floor(Math.random() * 20);
            if(randNum === 0) randNum = 1;
        }

        i++;
        
    }, 1000);

    if(!end){
        spawnRSG(0);
    }

    spawnRSGSpeed(rsgSpawnSpeed - changeSpawnRSGSpeed);
}