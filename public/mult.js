let quest = document.getElementById("quest");
let ans = document.getElementById("ans");
let socket = io();

const newQuestion = () => {
    let n1 = Math.floor(Math.random() * 11);
    let n2 = Math.floor(Math.random() * 11);
    let answ = n1 * n2;
    return [n1, n2, answ];
}

let question;


function genNew() {
    ans.value = ""
    question = newQuestion();
    quest.innerText = "Vad är " + question[0] + "⋅" + question[1] + "?";
}

genNew();

function ansRight() {
    socket.emit("correct");
}

function ansWrong() {
    socket.emit("wrong");
}

ans.addEventListener("keydown", (e) => {
    if (e.key =="Enter") {
        if (Number(ans.value) === question[2]) {
            genNew();
            ansRight();
        } else {
            ansWrong();
            ans.value = ""
        }
    }
})