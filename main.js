const buttons = Array.from(document.getElementsByClassName("tic"));

const message = document.getElementById("message");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const play = document.getElementById("play");
const reset = document.getElementById("reset");

let pieces = [];

const Player = (name, piece, score, elememt) => {
  const getName = () => name;
  const getPiece = () => piece;
  const increaseScore = () => {
    score++;
    elememt.textContent = score;
  };

  const resetScore = () => {
    score = 0;
    elememt.textContent = score;
  };

  return { getName, getPiece, increaseScore, resetScore };
};

const player1 = Player("Player X", "X", 0, p1);
const player2 = Player("Player O", "O", 0, p2);
const bot = Player("Bot", "O", 0, p2);

const gameController = (() => {
  let player = player1;

  // for (let i = 0; i < 9; i++) {
  //   buttons[i].addEventListener("click", () => {
  //     if (!buttons[i].textContent) {
  //       buttons[i].textContent = player.getPiece();
  //       buttons[i].classList.add(player.getPiece());
  //       pieces[i] = player.getPiece();

  //       if (!checkWin(player)) {
  //         if (player.getPiece() === "X") {
  //           player = player2;
  //         } else player = player1;
  //         message.textContent = `${player.getName()}'s Turn`;
  //         checkDraw();
  //       }
  //     }
  //   });
  // }

  for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", () => {
      if (!buttons[i].textContent) {
        buttons[i].textContent = player.getPiece();
        buttons[i].classList.add(player.getPiece());
        pieces[i] = player.getPiece();

        if (!checkWin(player)) {
          if (!checkDraw()) {
            while (true) {
              let position = Math.floor(Math.random() * 8);
              console.log(position);
              if (!buttons[position].textContent) {
                buttons[position].textContent = "O";
                buttons[position].classList.add("O");
                pieces[position] = "O";
                checkWin(bot);
                break;
              }
            }
          }
        }
      }
    });
  }

  const getHorizontal = () => {
    let horizontal = [];
    horizontal.push(pieces.slice(0, 3).join(""));
    horizontal.push(pieces.slice(3, 6).join(""));
    horizontal.push(pieces.slice(6, 9).join(""));

    return horizontal;
  };

  const getVertical = () => {
    let vertical = [];

    vertical.push(
      [pieces.slice(0, 1), pieces.slice(3, 4), pieces.slice(6, 7)].join("")
    );
    vertical.push(
      [pieces.slice(1, 2), pieces.slice(4, 5), pieces.slice(7, 8)].join("")
    );
    vertical.push(
      [pieces.slice(2, 3), pieces.slice(5, 6), pieces.slice(8, 9)].join("")
    );

    return vertical;
  };

  const getCross = () => {
    let cross = [];

    cross.push(
      [pieces.slice(0, 1), pieces.slice(4, 5), pieces.slice(8, 9)].join("")
    );

    cross.push(
      [pieces.slice(2, 3), pieces.slice(4, 5), pieces.slice(6, 7)].join("")
    );

    return cross;
  };

  const checkWin = (player) => {
    const pattern = player.getPiece().repeat(3);
    if (
      getHorizontal().includes(pattern) ||
      getVertical().includes(pattern) ||
      getCross().includes(pattern)
    ) {
      message.textContent = `${player.getName()} wins`;
      buttons.forEach((button) => (button.disabled = true));
      player.increaseScore();
      play.disabled = false;
      reset.disabled = false;
      return 1;
    }
  };

  const checkDraw = () => {
    let count = 0;
    pieces.forEach((piece) => {
      if (piece) count++;
    });

    if (count === 9) {
      message.textContent = "Draw";
      play.disabled = false;
      reset.disabled = false;
      return true;
    }
  };
})();

const gameFunction = (() => {
  play.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = "";
      btn.classList.remove("X");
      btn.classList.remove("O");
    });

    message.textContent = "Player X's turn";
    play.textContent = "Play Again";
    play.disabled = true;
    reset.disabled = true;
    pieces = pieces.map((piece) => "");
  });

  reset.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.textContent = "";
      btn.classList.remove("X");
      btn.classList.remove("O");
    });

    player1.resetScore();
    player2.resetScore();
    message.textContent = "Click Start!";
    play.textContent = "Start";
    play.disabled = false;
  });
})();
