let playerY = 175;
let playerX =  400;
let playerSize = 100;
let rsgSizeX = 30;
let rsgSizeY = 24;
let rsgID = 1;


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

    rsg.push({id: `id${rsgID}`, height: rsgY, width: rsgX});

    rsgID++;
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
    if(rsg.length == 0){
        return;
    }

    for(let i = 0; i < rsg.length; i++){
        if(playerX + playerSize >= rsg[i].width && playerX + playerSize <= rsg[i].width + rsgSizeX){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >= rsg[i].height){
                //rsgElement.remove();
                score++;
                updateScore(score);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerX <= rsg[i].width + rsgSizeX && playerX >= rsg[i].width){
            if(playerY <= rsg[i].height + rsgSizeY && playerY + playerSize >=rsg[i].height){
                //rsgElement.remove();
                score++;
                updateScore(score);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY + playerSize >= rsg[i].height && playerY + playerSize <= rsg[i].height + rsgSizeY){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                //rsgElement.remove();
                score++;
                updateScore(score);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
        if(playerY <= rsg[i].height + rsgSizeY && playerY >= rsg[i].height){
            if(playerX <= rsg[i].width + rsgSizeX && playerX + playerSize >= rsg[i].width){
                //rsgElement.remove();
                score++;
                updateScore(score);
                rsg[i].width = undefined;
                rsg[i].height = undefined;
            }
        }
    }
}

function updateScore(score){
    scoreElement.innerHTML = `${score}`;
}

function startGame(){
    let score = 0;

    setTimer();
    setInterval(() => {
        spawnRSG();
    }, 2000);
    movePlayer(score);
}