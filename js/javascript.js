const colorThemeElement = document.querySelector('.js-color-theme');
const pageElement = document.querySelector('.js-container');
const boxElement = document.querySelector('.js-box');

let currentPageTheme = "white";

function changeToBlackTheme(){
    pageElement.style.backgroundColor = "#736c6c";
    boxElement.style.backgroundColor = "#8c8a89";
    boxElement.style.boxShadow = "0px 5px 30px rgba(255, 255, 255, 3)";
}

function changeToWhiteTheme(){
    pageElement.style.backgroundColor = "white";
    boxElement.style.backgroundColor = "white";
    boxElement.style.boxShadow = "0px 5px 30px rgba(0, 0, 0, 3)";
}

colorThemeElement.addEventListener('click', function(){
    if(currentPageTheme === "white"){
        changeToBlackTheme();
        currentPageTheme = "black";
    }
    else{
        changeToWhiteTheme();
        currentPageTheme = "white";
    }
});