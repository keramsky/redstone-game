const colorThemeButtonElement = document.querySelector('.js-color-theme-button');
const overlayElement = document.querySelector('.js-overlay');
const boardContainerElement = document.querySelector('.js-board-container')
const boardElement = document.querySelector('.js-board');

let currentPageTheme = "white";

function changeToBlackTheme(){
    overlayElement.style.backgroundColor = "#736c6c";
    boardElement.style.backgroundColor = "#8c8a89";
    boardContainerElement.style.boxShadow = "0px 5px 30px rgba(255, 255, 255, 3)";
}

function changeToWhiteTheme(){
    overlayElement.style.backgroundColor = "white";
    boardElement.style.backgroundColor = "white";
    boardContainerElement.style.boxShadow = "0px 5px 30px rgba(0, 0, 0, 3)";
}

colorThemeButtonElement.addEventListener('click', function(){
    if(currentPageTheme === "white"){
        changeToBlackTheme();
        currentPageTheme = "black";
    }
    else{
        changeToWhiteTheme();
        currentPageTheme = "white";
    }
});