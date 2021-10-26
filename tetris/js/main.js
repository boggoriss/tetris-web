class Player {
    constructor() {
        this.playerName = "";
        this.score = 0;
    }

    setName(newName){
        this.playerName = newName;
    }

    getName(){
        return this.playerName;
    }

    getScore(){
        return this.score;
    }

    incrementScore(points) {
        this.score += points;
    }
}

const currentPlayer = new Player();

let list = document.getElementById("ol");
let tableRecords = [];

for(let props in localStorage){
    if(localStorage.hasOwnProperty(props) && props !== "previousPlayer")
        tableRecords.push({name: props, score: localStorage[props]});
}

function createTableRecords(){
    tableRecords.sort((a, b) => parseInt(a.score) < parseInt(b.score) ? 1 : -1);
    for(let i = 0; i < tableRecords.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `Name: ${tableRecords[i].name}, Score: ${tableRecords[i].score}`;
        list.append(li);
    }
}

function store(source){

    if(!localStorage.getItem(source)){
        localStorage.setItem(source, "0");
    }


    console.log(source);
    currentPlayer.setName(source);
    sessionStorage.setItem("currentPlayer", source);
    sessionStorage.setItem("currentRecord", "0");
}

function setPreviousPlayer(){
    let previousPlayer = document.getElementById("name_input")
    if(!previousPlayer){}
    else{
        previousPlayer.setAttribute("value", localStorage.getItem("previousPlayer"));
    }
}

function play(){
    window.location.replace("./tetris.html");
}


