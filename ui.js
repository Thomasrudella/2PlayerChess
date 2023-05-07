class UI {
  constructor(chessboard) {
    this.chessboard = chessboard;
    this.container = document.querySelector(".game-container");

    this.status = this.container.querySelector("#status");
    this.restart = this.container.querySelector(".restart");
    this.whiteCapturedPiecesContainer = this.container.querySelector("#white-captured-pieces");
    this.blackCapturedPiecesContainer = this.container.querySelector("#black-captured-pieces");
    this.flip = this.container.querySelector(".flip");
    this.flip.addEventListener("click", () => this.chessboard.flip());    
    this.restart.addEventListener("click", () => this.restartGame());
    this.initBoardInteraction();
    this.updateUI();
  }

  initBoardInteraction() {
    this.chessboard.container.addEventListener("click", (event) => {
      const square = event.target.closest(".square");
      if (square) {
        const index = parseInt(square.dataset.index);
        this.chessboard.handleClick(index);
      }
    });
  }  

  resetBoardInteraction() {
    this.initBoardInteraction();
  }  

  restartGame() {
    this.chessboard.game = new Chess();
    this.chessboard.render();
    this.resetBoardInteraction();
    setTimeout(() => {
      this.status.innerHTML = "White to move";
    }, 50);
  }  
    
  updateUI(move) {
    if (move && move.captured) {
      this.updateCapturedPieces(move);
    }
  
    const isGameOver = this.chessboard.game.in_checkmate() || this.chessboard.game.in_draw();
    this.status.innerHTML = isGameOver
      ? this.chessboard.game.in_checkmate()
        ? "Checkmate! " + (this.chessboard.game.turn() === "w" ? "Black" : "White") + " wins!"
        : "Draw!"
      : (this.chessboard.game.turn() === "b" ? "Black" : "White") + " to move" + (this.chessboard.game.in_check() ? ", in check" : "");
  }
}  