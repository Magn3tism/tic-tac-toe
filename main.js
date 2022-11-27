const buttons = Array.from(document.getElementsByTagName("button"));

const gameController = (() => {
  let pieces = [];
  let piece = "X";

  for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", () => {
      if (!buttons[i].textContent) {
        buttons[i].textContent = piece;
        buttons[i].classList.add(piece);
        pieces[i] = piece;

        checkWin(piece);

        if (piece === "X") piece = "O";
        else piece = "X";
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

  const checkWin = (piece) => {
    const pattern = piece.repeat(3);
    console.log(`H: ${getHorizontal()}`);
    console.log(`V: ${getVertical()}`);
    console.log(`C: ${getCross()}`);
    if (
      getHorizontal().includes(pattern) ||
      getVertical().includes(pattern) ||
      getCross().includes(pattern)
    ) {
      console.log(`${piece} win`);
      buttons.forEach((button) => (button.disabled = true));
    }
  };
})();
