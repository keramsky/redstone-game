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

function changeColorTheme(){
    if(currentPageTheme === "white"){
        changeToBlackTheme();
        currentPageTheme = "black";
    }
    else{
        changeToWhiteTheme();
        currentPageTheme = "white";
    }
}

let currentPageTheme = "white";

colorThemeButtonElement.addEventListener('click', function(){
    changeColorTheme();
});