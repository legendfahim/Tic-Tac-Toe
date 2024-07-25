// Targeted elements
const allCell = document.querySelectorAll(".cell");
const undoWarn = document.querySelector(".undo-warn");
const resultBoard = document.querySelector(".result-board");
const resultBoardCross = document.querySelector(".cross");
const replay = document.querySelector(".replay");
const replayBtn = document.querySelector(".btn");
const result = document.querySelector(".result");
const draw = document.querySelector(".draw");
const winnerName = document.querySelector(".winner-name");
const loserName = document.querySelector(".loser-name");
const drawX = document.querySelector(".drawX");
const bodyColor = document.querySelector(".body-color");
const themeBtn = document.querySelector(".theme-btn");
const choice = document.querySelector(".choice");
const pointX = document.querySelector(".pointX");
const pointO = document.querySelector(".pointO");
const pointBoard = document.querySelector(".point-board");
const userX = document.querySelector(".user-X");
const userO = document.querySelector(".user-O");

//All sounds
const game = new Audio("./sounds/game-music.mp3");
const gameStartSound = new Audio("./sounds/game-start.mp3");
const gameDrawSound = new Audio("./sounds/game-draw.mp3");
const gameOverSound = new Audio("./sounds/game-over.mp3");
//all cells
const cell1 = document.querySelector("#cell1");
const cell2 = document.querySelector("#cell2");
const cell3 = document.querySelector("#cell3");
const cell4 = document.querySelector("#cell4");
const cell5 = document.querySelector("#cell5");
const cell6 = document.querySelector("#cell6");
const cell7 = document.querySelector("#cell7");
const cell8 = document.querySelector("#cell8");
const cell9 = document.querySelector("#cell9");

let isMove = true;
// Iterate all cells
allCell.forEach((element) => {
  // Added cursor-pointer class
  element.classList.add("cursor-pointer");
  //Click listeners
  element.addEventListener("click", () => {
    if (isMove) {
      //Move function
      moveOne(element);
    }
  });
});
// Control using keyboard
window.addEventListener("keydown", (e) => {
  if (e.key === "1") {
    cell1.click();
  } else if (e.key === "2") {
    cell2.click();
  } else if (e.key === "3") {
    cell3.click();
  } else if (e.key === "4") {
    cell4.click();
  } else if (e.key === "5") {
    cell5.click();
  } else if (e.key === "6") {
    cell6.click();
  } else if (e.key === "7") {
    cell7.click();
  } else if (e.key === "8") {
    cell8.click();
  } else if (e.key === "9") {
    cell9.click();
  } else if (e.key === "Enter") {
    if (!replay.classList.contains("hidden")) {
      replayBtn.click();
      // console.log("!hidden replay");
    }
    if (!resultBoard.classList.contains("hidden")) {
      resultBoardCross.click();
      // console.log("!hidden rb");
    }
  } else if (e.key === "x") {
    if (!choice.classList.contains("hidden")) {
      userX.click();
    }
  } else if (e.key === "o") {
    if (!choice.classList.contains("hidden")) {
      userO.click();
    }
  }
});

// Hide result board
resultBoardCross.addEventListener("click", () => {
  resultBoard.classList.add("hidden");
  replay.classList.remove("hidden");
});
// Hide replay board
replayBtn.addEventListener("click", () => {
  replay.classList.add("hidden");

  setTimeout(() => {
    allCell.forEach((cell, index) => {
      cell.innerHTML = `<span id="mark">${index + 1}</span>`;
      if (!cell.classList.contains("cursor-pointer")) {
        cell.classList.add("cursor-pointer");
      }
      cell.classList.remove("cursor-context-menu", "X", "O");
    });
    choice.classList.remove("hidden");
    isMove = true;
  }, 2000);
});

drawX.addEventListener("click", () => {
  resultBoard.classList.add("hidden");
  replay.classList.remove("hidden");
});
//Theme button listener
themeBtn.addEventListener("click", () => {
  if (themeBtn.classList.contains("dark")) {
    themeBtn.classList.remove("dark");
    themeBtn.classList.add("light");
    themeBtn.textContent = "Light";
    document.body.style.backgroundColor = "rgb(0,0,0)";
    pointBoard.style.color = "#FFFFFF";
    //All cells should have a background color White
    allCell.forEach((element) => {
      element.classList.add("dark-cell");
    });
  } else {
    themeBtn.classList.remove("light");
    themeBtn.classList.add("dark");
    themeBtn.textContent = "Dark";
    document.body.style.backgroundColor = "#ffffff";
    pointBoard.style.color = "rgb(0,0,0)";
    //All cells should have a background color Dark
    allCell.forEach((element) => {
      element.classList.remove("dark-cell");
    });
  }
});
//User move
let nowMove = "X";
//Move function
const moveOne = (element) => {
  if (element.classList.contains("cursor-pointer")) {
    element.innerHTML = `<span id="cell-mark">${nowMove}</span>`;
    element.classList.remove("cursor-pointer");
    element.classList.add("cursor-context-menu");
    element.classList.add(nowMove);
    // Switch user moves
    if (nowMove === "X") {
      nowMove = "O";
    } else {
      nowMove = "X";
    }
  } else {
    undoWarn.classList.remove("hidden");
    setTimeout(() => {
      undoWarn.classList.add("hidden");
    }, 3000);
  }
  endGame();
};
//Choose the first player
document.querySelectorAll(".b").forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains("user-X")) {
      nowMove = "X";
    } else {
      nowMove = "O";
    }
    document.querySelector(".choice").classList.add("hidden");
    gameStartSound.play();
    game.play();
    game.loop = true;
  });
});
//Total Points
if (localStorage.getItem("X") === null && localStorage.getItem("O") === null) {
  localStorage.setItem("X", 0);
  localStorage.setItem("O", 0);
}
let X = localStorage.getItem("X"),
  O = localStorage.getItem("O");
pointX.textContent = localStorage.getItem("X");
pointO.textContent = localStorage.getItem("O");
//Finish the game
const endGame = () => {
  if (
    // for 1 5 9

    (cell1.classList.contains("O") &&
      cell5.classList.contains("O") &&
      cell9.classList.contains("O")) ||
    //   for 3 5 7

    (cell3.classList.contains("O") &&
      cell5.classList.contains("O") &&
      cell7.classList.contains("O")) ||
    //   for 2 5 8

    (cell2.classList.contains("O") &&
      cell5.classList.contains("O") &&
      cell8.classList.contains("O")) ||
    //   for 4 5 6

    (cell4.classList.contains("O") &&
      cell5.classList.contains("O") &&
      cell6.classList.contains("O")) ||
    //for 1 4 7
    (cell1.classList.contains("O") &&
      cell4.classList.contains("O") &&
      cell7.classList.contains("O")) ||
    //   for 3 6 9
    (cell3.classList.contains("O") &&
      cell6.classList.contains("O") &&
      cell9.classList.contains("O")) ||
    //   for 1 2 3
    (cell1.classList.contains("O") &&
      cell2.classList.contains("O") &&
      cell3.classList.contains("O")) ||
    //for 7 8 9
    (cell7.classList.contains("O") &&
      cell8.classList.contains("O") &&
      cell9.classList.contains("O"))
  ) {
    gameOverSound.play();
    game.pause();
    game.currentTime = 0;
    resultBoard.classList.remove("hidden");
    winnerName.textContent = "O";
    loserName.textContent = "X";
    O++;
    localStorage.setItem("O", O);
    pointO.textContent = localStorage.getItem("O");
    isMove = false;
  } else if (
    // for 1 5 9
    (cell1.classList.contains("X") &&
      cell5.classList.contains("X") &&
      cell9.classList.contains("X")) ||
    //   for 3 5 7
    (cell3.classList.contains("X") &&
      cell5.classList.contains("X") &&
      cell7.classList.contains("X")) ||
    // for 2 5 8
    (cell2.classList.contains("X") &&
      cell5.classList.contains("X") &&
      cell8.classList.contains("X")) ||
    // for 4 5 6
    (cell4.classList.contains("X") &&
      cell5.classList.contains("X") &&
      cell6.classList.contains("X")) ||
    //for 1 4 7
    (cell1.classList.contains("X") &&
      cell4.classList.contains("X") &&
      cell7.classList.contains("X")) ||
    //   for 3 6 9
    (cell3.classList.contains("X") &&
      cell6.classList.contains("X") &&
      cell9.classList.contains("X")) ||
    //   for 1 2 3
    (cell1.classList.contains("X") &&
      cell2.classList.contains("X") &&
      cell3.classList.contains("X")) ||
    //for 7 8 9
    (cell7.classList.contains("X") &&
      cell8.classList.contains("X") &&
      cell9.classList.contains("X"))
  ) {
    gameOverSound.play();
    game.pause();
    game.currentTime = 0;
    resultBoard.classList.remove("hidden");
    winnerName.textContent = "X";
    loserName.textContent = "O";
    X++;
    localStorage.setItem("X", X);
    pointX.textContent = localStorage.getItem("X");
    isMove = false;
  } else {
    if (document.querySelectorAll(".cursor-context-menu").length === 9) {
      gameDrawSound.play();
      game.pause();
      game.currentTime = 0;
      resultBoard.classList.remove("hidden");
      result.classList.add("hidden");
      draw.classList.remove("hidden");
      isMove = false;
    }
  }
};
