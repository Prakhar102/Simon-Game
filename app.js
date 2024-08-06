let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];

let started = false;
let level = 0;

let highScore = document.querySelector("h3");

let h2 = document.querySelector("h2");

//To start the game
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started")
        started = true;

        levelUp();
    }
})



//Function For Button Flash
function btnFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}




//Function For Button Flash when user click the button
function userBtnFlash(btn) {
    btn.classList.add("userFlash")
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}




//Function To increase lavel
function levelUp() {
    //Jaise hi level up hoga userSeq ki value ko empty kr denge , taaki suruwat se button press kre 
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    //On random button choose , flash the button
    let randIdx = Math.floor(Math.random() * 3);     //to choose random index and random color
    let randColor = btns[randIdx];

    //Now access the button class of this randColor
    let randBtn = document.querySelector(`.${randColor}`);

    //And also Push the random color to the gameSeq array
    gameSeq.push(randColor);

    btnFlash(randBtn);       //then flashing button for that color
}




//Function to check in that level gameSeq array is equal to userSeq array or not
function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over ! ' Your score was <b>${level}</b> ' <br> Press any key to start game. `;

        //Add music when game over
        const gameover = new Audio("music/gameover.mp3");
        gameover.play();

        //For Storing the highest Score of the game
        presenttHighValue = highScore;
        if (presenttHighValue > level) {
            presenttHighValue = level;
        }
        presenttHighValue.innerText = `Highest Score : ${level}`


        //Whole body to red , dikha ske ki game over ho gya
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 200)
        reset();  //call reset function
    }
}




// Function that  apply Event Listeners To Button , jb user click kr rha button pe
function btnPress() {
    let btn = this;      // store the button jo click ho rha

    userBtnFlash(btn);   //Call userBtnFlash function to (flash the button)

    //Store the color in userSeq array , when user click button
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length - 1);      //Calling function CheckSeq
}


let allBtns = document.querySelectorAll(".btn");     //To select all buttons which have btn class
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);

    //Event Listener for move sound
    btn.addEventListener("click", function () {
        const move = new Audio("music/move.mp3");
        move.play();
    })
}



//Function for reset the game or restart the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    presenttHighValue = highScore;
}
