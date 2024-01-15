playerX = 40;
playerY = 170;


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
    let randX = Math.floor(Math.random() * 900);
    let randY = Math.floor(Math.random() * 450);

    if(randX < 20){
        randX = 40;
    }
    else if(randX > 880){
        randX = 860;
    }

    if(randY < 20){
        randY = 40;
    }
    else if(randY > 880){
        randY = 860;
    }

    rsgContainerElement.innerHTML = `<img class="rsg js-rsg" src="images/rsg.png">`

    const rsgElement = document.querySelector('.js-rsg');

    rsgElement.style.left = `${randX}px`;
    rsgElement.style.top = `${randY}px`;
}

function movePlayer(){

    document.body.addEventListener("keydown", (event) => {
        if(event.key === 'ArrowUp'){
            playerElement.style.top = `${playerY - 10}px`;
            playerY -= 10;
        }
        else if(event.key === 'ArrowDown'){
            playerElement.style.top = `${playerY + 10}px`;
            playerY += 10;
        }
        else if(event.key === 'ArrowRight'){
            playerElement.style.left = `${playerX + 10}px`;
            playerX += 10;
        }
        else if(event.key === 'ArrowLeft'){
            playerElement.style.left = `${playerX - 10}px`;
            playerX -= 10;
        }
    });
}

function startGame(){
    setTimer();
    spawnRSG();
    movePlayer();
}