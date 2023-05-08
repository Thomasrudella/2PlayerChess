class Chessboard {
  constructor(containerId, game, updateCallback) {
    this.container = document.getElementById(containerId);
    this.game = game;
    this.updateCallback = updateCallback;
    this.selectedSquare = undefined;

    this.pieceImages = this.loadPieceImages();

    this.createSquares();
  }

  createSquares() {
    const board = document.createElement("div");
    board.id = "chessboard";
    for (let i = 0; i < 64; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.index = i;
      if (((i + Math.floor(i / 8)) % 2) === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
      }
      board.appendChild(square);
    }
    this.container.appendChild(board);
    this.addEventListeners();
    this.render();
  }

  loadPieceImages() {
    return {
      wp: "https://www.chess.com/chess-themes/pieces/alpha/150/wp.png",
      wn: "https://www.chess.com/chess-themes/pieces/alpha/150/wn.png",
      wb: "https://www.chess.com/chess-themes/pieces/alpha/150/wb.png",
      wr: "https://www.chess.com/chess-themes/pieces/alpha/150/wr.png",
      wq: "https://www.chess.com/chess-themes/pieces/alpha/150/wq.png",
      wk: "https://www.chess.com/chess-themes/pieces/alpha/150/wk.png",
      bp: "https://www.chess.com/chess-themes/pieces/alpha/150/bp.png",
      bn: "https://www.chess.com/chess-themes/pieces/alpha/150/bn.png",
      bb: "https://www.chess.com/chess-themes/pieces/alpha/150/bb.png",
      br: "https://www.chess.com/chess-themes/pieces/alpha/150/br.png",
      bq: "https://www.chess.com/chess-themes/pieces/alpha/150/bq.png",
      bk: "https://www.chess.com/chess-themes/pieces/alpha/150/bk.png"
    };
  }

  addEventListeners() {
    const squares = this.container.getElementsByClassName("square");
    for (const square of squares) {
      square.addEventListener("click", () => {
        this.handleClick(parseInt(square.dataset.index));
      });
    }
  }

  handleClick(index) {
    if (this.game.game_over()) {
      return;
    }

    const piece = this.game.get(this.indexToSquare(index));
  
    if (this.selectedSquare === undefined) {
      if (piece) {
        this.selectedSquare = index;
        this.render();
      }
    } else {
      const from = this.indexToSquare(this.selectedSquare);
      const to = this.indexToSquare(index);
  
      const move = this.game.move({ from, to, promotion: 'q' });
      if (move) {
        this.updateCallback(move);
        this.selectedSquare = undefined;
        this.render();
      } else if (this.selectedSquare === index) {
        this.selectedSquare = undefined;
      } else {
        if (piece) {
          this.selectedSquare = index;
        }
      }
      this.render();
    }
  }  

  indexToSquare(index) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(square[1]);
    return 8 * rank + file;
  }

  render() {
    const squares = this.container.getElementsByClassName("square");

    for (let i = 0; i < 64; i++) {
      const square = squares[i];
      const squareName = this.indexToSquare(i);
      const piece = this.game.get(squareName);

      // Clear previous contents
      square.innerHTML = '';

      if (piece) {
        const pieceImage = new Image();
        pieceImage.src = this.pieceImages[piece.color + piece.type];
        pieceImage.width = 60; // Set the width
        pieceImage.height = 60; // Set the height
        square.appendChild(pieceImage);
      }

      // Highlight selected square
      square.classList.remove("selected");
      if (i === this.selectedSquare) {
        square.classList.add("selected");
      }
    }
  }

  flip() {
    this.container.classList.toggle("flipped");
    this.render();
  }
}
