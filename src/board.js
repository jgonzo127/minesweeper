export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = (numberOfRows * numberOfColumns);
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);;
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    };

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }

        this._numberOfTiles--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex) {

        const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];

            if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });

        return numberOfBombs;
    }

    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;

    }

    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));

    }

    generatePlayerBoard(numberOfRows, numberOfColumns) {
        const board = [];
        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let c = 0; c < numberOfColumns; c++) {
                row.push(' ');
            }
            board.push(row);
        }

        return board;
    }

    generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        const board = [];
        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let c = 0; c < numberOfColumns; c++) {
                row.push(null);
            }
            board.push(row);
        }

        let numberOfBombsPlaced = 0;

        while (numberOfBombsPlaced < numberOfBombs) {
            // Will fix doubling up at a later point
            const randomRowIndex = Math.floor(Math.random() * numberOfRows);
            const randomColIndex = Math.floor(Math.random() * numberOfColumns);

            if (board[randomRowIndex][randomColIndex] !== 'B') {
                board[randomRowIndex][randomColIndex] = 'B';
                numberOfBombsPlaced++;
            }

        }

        return board;

    }

};