const colorThemeButtonElement = document.querySelector('.js-color-theme-button');
const overlayElement = document.querySelector('.js-overlay');
const boardContainerElement = document.querySelector('.js-board-container')
const boardElement = document.querySelector('.js-board');
const startButtonElement = document.querySelector('.js-start-button');
const timerElement = document.querySelector('.js-timer');
const rsgContainerElement = document.querySelector('.js-rsg-container');
const playerElement = document.querySelector('.js-player');
const scoreElement = document.querySelector('.js-score');
const startButtonContainerElement = document.querySelector('.js-start-button-container');
const restartButtonElement = document.querySelector('.js-restart-button')
const boostTimerContainerElement = document.querySelector('.js-boost-timer-container');

let playerY = 175;
let playerX =  400;
let playerSize = 60;
let playerSpeed = 2;
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
let rsg = [];