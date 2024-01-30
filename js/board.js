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
            endGame();
        }
    }, 1000);
}

function spawnRSG(boost){
    // random coordinates
    let rsgX = Math.floor(Math.random() * 860);
    let rsgY = Math.floor(Math.random() * 410);

    if(rsgX < 30){
        rsgX = 30;
    }

    if(rsgY < 30){
        rsgY = 30;
    }

    // create the rsg point

    let rsgElement = document.createElement("img");

    rsgElement.classList.add(`id${rsgID}`);
    if(boost === 1){
        rsgElement.src = "images/rsgBlue.png";
    } else {
        rsgElement.src = "images/rsgPink.png";
    }

    rsgContainerElement.appendChild(rsgElement);

    if(boost === 1){ // delete the rsg point after 7 seconds
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

        boostTimerContainerElement.innerHTML = "";

        animateBoostProgress();

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

// boost animation
function animateBoostProgress(){
    boostTimerContainerElement.style.visibility = "visible";

    let progressLine = document.createElement("div");
    progressLine.classList.add("js-animation-line")
    progressLine.style.backgroundColor = "rgb(0, 177, 64)"
    progressLine.style.height = "100%";
    progressLine.style.width = "100%";
    progressLine.style.animationName = "animateProgress";
    progressLine.style.animationTimingFunction = "linear";
    progressLine.style.animationDuration = "7s";

    boostTimerContainerElement.appendChild(progressLine);

    setTimeout(() => {
        progressLine.remove();
        boostTimerContainerElement.style.visibility = "hidden";
    }, 7000);
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

    // delete the boost timer
    boostTimerContainerElement.style.visibility = "hidden";
    boostTimerContainerElement.innerHTML = "";
}

function resetStats(){
    boardElement.style.filter = "blur(0px)";
    scoreElement.innerHTML = 0;
    score = 0;
    clearInterval(stopSpawnRSG);
    clearInterval(stopSpawnBOOST);
    rsgSpawnSpeed = 3000;
    changeSpawnRSGSpeed = 150;

    while(rsg.length > 0){
        rsg.pop();
    }

    rsgContainerElement.innerHTML = "";

    // move the player to the default spawn place
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

function spawnBoosts() {
    let i = 1; // time counter
    let randNum = Math.floor(Math.random() * 15);
    if(randNum === 0) randNum = 1;
    stopSpawnBOOST = setInterval(() => {
        if (i === randNum){
            if(!end){
                spawnRSG(1);
            }
        }
        if(i === 15){
            setTimeout(() => { // wait 8 seconds and draw random spawn time
                i = 0;
                randNum = Math.floor(Math.random() * 15);
                if(randNum === 0) randNum = 1;
            }, 8000);
        }
        if(i === 38){
            setTimeout(() => { // wait 8 seconds and draw random spawn time
                i = 0;
                randNum = Math.floor(Math.random() * 14);
                if(randNum === 0) randNum = 1;
            }, 8000);
        }

        i++;
        
    }, 1000);
}

function startGame(){
    score = 0;
    end = false;

    // move the player to his default spawn place
    x = 420;
    y = 200;

    setTimer();
    spawnBoosts();

    if(!end){
        spawnRSG(0);
    }

    rsgSpawnSpeed = 3000;
    changeSpawnRSGSpeed = 150;

    spawnRSGSpeed(rsgSpawnSpeed - changeSpawnRSGSpeed);
}