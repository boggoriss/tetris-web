const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

const nextTC = document.getElementById("canvas2");
const nextTCX = nextTC.getContext("2d");

const returnButton = document.getElementById("return");

returnButton.addEventListener("click", ()=>{
    window.location.replace("../index.html");
});

canvas.width = 400;
canvas.height = 800;


let rows = 20;
let columns = 10;

let squareSize = 40;

let emptyColor = "white";

let gameOver = false;

let gameField = [];

let score = 0;

for (let i = 0; i < rows; i++) {
    gameField[i] = []
    for (let j = 0; j < columns; j++){
        gameField[i][j] = emptyColor;
    }
}

const tetraminos = {
    T:
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]],
    S:
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]],
    I:
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]],
    Z:
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],
    L:
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]],
    J:
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]],
    O:
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]]
}

const colors = {
    T: "purple",
    S: "red",
    Z: "green",
    L: "blue",
    J: "orange",
    O: "yellow",
    I: "pink"
}

const tetroSymbols = ["S", "T", "I", "O", "Z", "L", "J"];

let nextTetramino = {};

function drawNext() {
    nextTCX.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < nextTetramino.tetramino.length; i++){
        for (let j = 0; j < nextTetramino.tetramino[i].length; j++){
            if(nextTetramino.tetramino[i][j] === 0){
                nextTCX.fillStyle = "white";
            } else {
                nextTCX.fillStyle = nextTetramino.color
            }
            nextTCX.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
            nextTCX.strokeStyle = "black";
            nextTCX.strokeRect(j * squareSize, i * squareSize, squareSize, squareSize)
        }
    }
}

function randomTetramino(){
    let randomT = tetroSymbols[Math.floor(Math.random() * 7)];
    return randomT;
}

class Tetramino {
    constructor(tetramino, color) {
        this.tetramino = tetramino;
        this.color = color;
        this.x = 3;
        this.y = -2;
    }

    dock(){
        for (let i = 0; i < this.tetramino.length; i++){
            for (let j = 0; j < this.tetramino[i].length; j++){
                if(!this.tetramino[i][j]){
                    continue;
                }
                if(this.y + i < 0){
                    gameOver = true;
                }
                gameField[this.y + i][this.x + j] = this.color;
            }
        }
        this.tetramino = nextTetramino.tetramino;
        this.color = nextTetramino.color;
        let nt = randomTetramino();
        nextTetramino = {tetramino: tetraminos[nt], color: colors["T"]};
        this.x = 3;
        this.y = -2;



        for (let i = 0; i < rows; i++){
            let isFull = true;
            for (let j = 0; j < columns; j++)
                isFull &&= gameField[i][j] !== "white";
            if (isFull){
                for (let r = i; r > 1; r--){
                    for (let j = 0; j < columns; j++)
                        gameField[r][j] = gameField[r - 1][j];
                }
                gameField[0].map((currentValue)=>{ currentValue = "white"});
                interval -= 50;
                score += 100;
            }
        }
        drawNext();
        drawGameField();
    }

    isCollision(x, y){
        for (let i = 0; i < aTetramino.tetramino.length; i++){
            for (let j = 0; j < aTetramino.tetramino[i].length; j++){
                if(this.y + i + y < 0){
                    continue;
                }
                if(aTetramino.tetramino[i][j] && (
                    this.x + j + x < 0
                    || this.x + j + x >= columns
                    || this.y + i + y >= rows
                    || gameField[this.y + i + y][this.x + j + x] !== "white")){
                return false;
                }
            }
        }
        return true;
    }

    moveDown(){
        if(this.isCollision(0,1)){
            this.y += 1;
        }
        else{
            this.dock();
        }
    }

    moveRight(){
        if(this.isCollision(1, 0))
            this.x += 1
    }

    moveLeft(){
        if(this.isCollision(-1, 0))
            this.x -= 1
    }

    rotate(){
        let newTetramino = []
        for (let i = 0; i < aTetramino.tetramino.length; i++)
            newTetramino[i] = []
        for (let i = 0; i < aTetramino.tetramino.length; i++) {
            for (let j = 0; j < aTetramino.tetramino[i].length; j++) {
                newTetramino[i][j] = aTetramino.tetramino[j][i];
            }
        }
        newTetramino.map((currentValue) => {
            for (let j = 0; j < Math.floor(newTetramino.length / 2); j++)
                [currentValue[j], currentValue[newTetramino.length - 1 - j]] = [currentValue[newTetramino.length - 1 - j], currentValue[j]];
        });
        let isValid = true
        for (let i = 0; i < newTetramino.length; i++){
            for (let j = 0; j < newTetramino[i].length; j++){
                if(newTetramino[i][j] && (
                    this.x + j < 0
                    || this.x + j >= columns
                    || this.y + i >= rows
                    || gameField[this.y + j][this.x + i] !== "white")
                ){
                    isValid = false;
                }
            }
        }
        if(isValid)
            aTetramino.tetramino = newTetramino;
    }

    draw(){
        for (let i = 0; i < this.tetramino.length; i++){
            for (let j = 0; j < this.tetramino[i].length; j++){
                if(this.tetramino[i][j]){
                    context.fillStyle = this.color;
                    context.fillRect((this.x + j) * squareSize, (this.y + i) * squareSize, squareSize, squareSize);
                    context.strokeStyle = "black";
                    context.strokeRect((this.x + j) * squareSize, (this.y + i) * squareSize, squareSize, squareSize)
                }
            }
        }
    }
}

let nt = randomTetramino();
nextTetramino =  nextTetramino = {tetramino: tetraminos[nt], color: colors["T"]};
const currentPlayerName = sessionStorage.getItem("currentPlayer");
console.log(currentPlayerName);

drawNext();

let ct  = randomTetramino();
let aTetramino = new Tetramino(tetraminos[ct], colors[ct]);

createTableRecords();

function drawGameField(){
    for(let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            context.fillStyle = gameField[i][j];
            context.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
            context.strokeStyle = "black";
            context.strokeRect(j * squareSize, i * squareSize, squareSize, squareSize)
        }
    }
}


animation(
    {
        clear(){
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
        update(action){
            sessionStorage.setItem("currentRecord", score);
            aTetramino.moveDown();
        },

        render(){
            drawGameField();
            aTetramino.draw();
        }
    }
);
