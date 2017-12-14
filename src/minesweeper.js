const printBoard = (board) => {

    console.log( board.map( row => row.join( ' | ' ) ).join( '\n' )
    );

};



//console.log( printBoard( board ) );
//board[0][1] = 1;
//board[2][2] = 'B';
//console.log( printBoard( board ) );

const generatePlayerBoard = (numberOfRows, numberOfColumns ) => {
    const board = [];
    for( let i = 0; i < numberOfRows; i++ ) {
        const row = [];
        for( let c = 0; c < numberOfColumns; c++ ) {
            row.push( ' ' );
        }
        board.push( row );
    }

    return board;
};

const generateBombBoard = ( numberOfRows, numberOfColumns, numberOfBombs ) => {
    const board = [];
    for( let i = 0; i < numberOfRows; i++ ) {
        const row = [];
        for( let c = 0; c < numberOfColumns; c++ ) {
            row.push( null );
        }
        board.push( row );
    }

    numberOfBombsPlaced = 0;

    while( numberOfBombsPlaced < numberOfBombs ) {
        // Will fix doubling up at a later point
        const randomRowIndex = Math.floor( Math.random() * numberOfRows );
        const randomColIndex = Math.floor( Math.random() * numberOfColumns );

        if( board[randomRowIndex][randomColIndex] !== 'B' ) {
            board[randomRowIndex][randomColIndex] = 'B';
            numberOfBombsPlaced ++;
        }
        
    }

    return board;

};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex ) => {
    
    const neighborOffsets = [ [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1] ];
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach( offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        if( neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns ) {
            if( bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
                numberOfBombs ++;
            }
        }
    });

    return numberOfBombs;
};

const flipTile = ( playerBoard, bombBoard, rowIndex, columnIndex ) => {
    if( playerBoard[rowIndex][columnIndex] !== ' ' ) {
        alert( 'This tile has already been flipped!' );
        return;
    } else if ( bombBoard[rowIndex][columnIndex] === 'B' ) {
        playerBoard[rowIndex][columnIndex] === 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs( bombBoard, rowIndex, columnIndex );
    }
}

let playerBoard = generatePlayerBoard( 10, 4 );
let bombBoard = generateBombBoard( 10, 4, 5 );

console.log( 'Player Board: ' );
console.log( printBoard( playerBoard ) );
console.log( 'Bomb Board: ' );
console.log( printBoard( bombBoard ) );
flipTile( playerBoard, bombBoard, 0, 0 );
console.log( 'Updated Player Board: ' );
console.log( printBoard( playerBoard ) );