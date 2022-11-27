const buttons = Array.from(document.getElementsByTagName("button"));

const message = document.getElementById("message");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

const Player = (name, piece, score, elememt) => {
  const getName = () => name;
  const getPiece = () => piece;
  const increaseScore = () => {
    score++;
    elememt.textContent = score;
  };

  return { getName, getPiece, increaseScore };
};

const player1 = Player("Player X", "X", 0, p1);
const player2 = Player("Player O", "O", 0, p2);

const gameController = (() => {
  let pieces = [];
  let player = player1;

  for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", () => {
      if (!buttons[i].textContent) {
        buttons[i].textContent = player.getPiece();
        buttons[i].classList.add(player.getPiece());
        pieces[i] = player.getPiece();

        if (!checkWin(player)) {
          if (player.getPiece() === "X") {
            player = player2;
          } else player = player1;
          message.textContent = `${player.getName()}'s Turn`;
        }

        checkDraw();
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
      return 1;
    }
  };

  const checkDraw = () => {
    let count = 0;
    pieces.forEach((piece) => {
      if (piece) count++;
    });

    if (count === 9) message.textContent = "Draw";
  };
})();
