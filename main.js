const buttons = Array.from(document.getElementsByTagName("button"));

let pieces = ["X", "O", "X", "O", "X", "O", "X", "X", "O"];

const gameController = (() => {
  let piece = "X";
  let horizontal = [];
  let vertical = [];
  let cross = [];

  for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", () => {
      if (!buttons[i].textContent) {
        buttons[i].textContent = piece;
        buttons[i].classList.add(piece);
        pieces[i] = piece;

        if (piece === "X") piece = "O";
        else piece = "X";
      }
    });
  }

  const getHorizontal = () => {
    horizontal.push(pieces.slice(0, 3).join(""));
    horizontal.push(pieces.slice(3, 6).join(""));
    horizontal.push(pieces.slice(6, 9).join(""));
  };

  const getVertical = () => {
    vertical.push(
      [pieces.slice(0, 1), pieces.slice(3, 4), pieces.slice(6, 7)].join("")
    );
    vertical.push(
      [pieces.slice(1, 2), pieces.slice(4, 5), pieces.slice(7, 8)].join("")
    );
    vertical.push(
      [pieces.slice(2, 3), pieces.slice(5, 6), pieces.slice(8, 9)].join("")
    );
  };

  const getCross = () => {
    cross.push(
      [pieces.slice(0, 1), pieces.slice(4, 5), pieces.slice(8, 9)].join("")
    );
  };
  cross.push(
    [pieces.slice(2, 3), pieces.slice(4, 5), pieces.slice(6, 7)].join("")
  );
})();
