const buttons = Array.from(document.getElementsByTagName("button"));

let pieces = [];

const gameController = () => {
  let count = 0;

  for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", () => {
      if (!buttons[i].textContent) {
        if (count % 2 === 0) {
          buttons[i].textContent = "X";
          buttons[i].classList.add("X");
          pieces[i] = "X";
        } else {
          buttons[i].textContent = "O";
          buttons[i].classList.add("O");
          pieces[i] = "O";
        }
        count++;
      }
    });
  }
};

gameController();
