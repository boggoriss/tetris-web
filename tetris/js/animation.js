// event listener //
document.addEventListener("keydown", function (event){
        if(event.key === "ArrowRight") {
            aTetramino.moveRight();
        }
        if(event.key === "ArrowLeft") {
            aTetramino.moveLeft();
        }
        if(event.key === "ArrowUp") {
            aTetramino.rotate();
        }
        if(event.key === "ArrowDown") {
            aTetramino.moveDown();
        }
    }
)

let interval = 700;
let start = Date.now()
function animation(obj) {

     requestAnimationFrame(tick);
     const { clear, update, render} = obj;

     function tick () {
         if(gameOver !== true) {
             requestAnimationFrame(tick);
             let now = Date.now()
             if (now - start > interval) {
                 update()
                 start = Date.now()
             }
             clear();
             render();
         }
         else{
             if(localStorage.getItem(sessionStorage.getItem("currentPlayer")) < score){
                 localStorage.setItem(sessionStorage.getItem("currentPlayer"), score);
             }
             localStorage.setItem("previousPlayer", sessionStorage.getItem("currentPlayer"))
             clear();
             let div = document.createElement('div');
             div.innerHTML = `Game over! ${sessionStorage.getItem("currentPlayer")}, your score is ${score}`;
             document.body.append(div);
         }
     }
}