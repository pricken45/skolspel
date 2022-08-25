const socket = io();
let usr = document.getElementById("usr")
let prog = document.getElementById("prog");
let end = document.getElementById("end");

socket.on("userCount", (c)=> {
    usr.innerText = c;
});

let score = 0;
let changer = 3;

function startaom() {
    score = 0;
    prog.value = score / 100;

}

socket.on("correct", ()=> {
    if (score <=100 - changer) {score += changer;} else {
        score == 100;
        end.style.display = "block";
    }
    prog.value = score / 100;

    console.log("correct")
})

socket.on("wrong", ()=> {
    if (score >= changer) {
        score -= changer
    }else{
        score = 0;
    }
    prog.value = score / 100;
})

setInterval(()=> {
    if (score >= 1) score--;
    prog.value = score / 100;

}, 500);