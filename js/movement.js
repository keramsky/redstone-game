const canvas = document.querySelector(".board-canvas");
const ctx = canvas.getContext("2d");
const pepeImage = new Image();
pepeImage.src = 'images/pepe.png';

let size = 60;
let RSGsizeX = 30;
let RSGsizeY = 25;

let x = 420;
let y = 200;
let vxl = 0;
let vxr = 0;
let vyu = 0;
let vyd = 0;

function update(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    if(!end){
        if(x + vxl > 0 && x + vxr + size < 900 && y + vyu > 0 && y + vyd + size < 450){
            x += vxr;
            x += vxl;
            y += vyu;
            y += vyd;
        }
    
        checkColision();
    
    }

    ctx.drawImage(pepeImage, x, y, 60, 60);

    requestAnimationFrame(update);
}

pepeImage.onload = function() {
    update();
}


function checkColision() {
    for(let i = 0; i < rsg.length; i++){

        let currentRSG = document.querySelector(`.id${rsg[i].id}`);

        // check whether the player has collected any points

        if(x + size >= rsg[i].width && x + size <= rsg[i].width + RSGsizeX){
            if(y <= rsg[i].height + RSGsizeY && y + size >= rsg[i].height){
                deleteRSG(i, currentRSG);
            }
        }
        if(x <= rsg[i].width + RSGsizeX && x >= rsg[i].width){
            if(y <= rsg[i].height + RSGsizeY && y + size>= rsg[i].height){
                deleteRSG(i, currentRSG);
            }
        }
        if(y + size >= rsg[i].height && y + size <= rsg[i].height + RSGsizeY){
            if(x <= rsg[i].width + RSGsizeX && x + size >= rsg[i].width){
                deleteRSG(i, currentRSG);
            }
        }
        if(y <= rsg[i].height + RSGsizeY && y >= rsg[i].height){
            if(x <= rsg[i].width + RSGsizeX && x + size >= rsg[i].width){
                deleteRSG(i, currentRSG);
            }
        }
    }
}

function deleteRSG(i, currentRSG) {
    currentRSG.remove();
    updateScore(rsg[i].boost);
    rsg[i].width = undefined;
    rsg[i].height = undefined;
    playCollectSound(rsg[i].boost);
    if(rsg[i].boost == 1){
        boostTimerContainerElement.style.visibility = "hidden";
        boostTimerContainerElement.innerHTML = "";
    }
}

// movement

addEventListener("keydown" , (event) => {
    if(event.key === "ArrowRight") vxr = playerSpeed;
    if(event.key === "ArrowDown") vyd = playerSpeed;
    if(event.key === "ArrowLeft") vxl = -playerSpeed;
    if(event.key === "ArrowUp") vyu = -playerSpeed;
});

addEventListener("keyup", (event) => {
    if(event.key === "ArrowRight") vxr = 0;
    if(event.key === "ArrowDown") vyd = 0;
    if(event.key === "ArrowLeft") vxl = 0;
    if(event.key === "ArrowUp") vyu = 0;
});