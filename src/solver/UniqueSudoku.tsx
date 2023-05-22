import { getSudoku } from './sudoku';
let nullArray = ['0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0'];

function _getBoxCenter(box: number) {

  switch (box) {
    case 0: return [1, 1];
    case 1: return [1, 4];
    case 2: return [1, 7];
    case 3: return [4, 1];
    case 4: return [4, 4];
    case 5: return [4, 7];
    case 6: return [7, 1];
    case 7: return [7, 4];
    default: return [7, 7];
  }
}

function _getIndexOfCell(box: number, cell: number) {
  let [row, column] = _getBoxCenter(box);
  // eslint-disable-next-line
  switch (cell) {
    case 0: { row--; column--; break; }
    case 1: { row--; break; }
    case 2: { row--; column++; break; }
    case 3: { column--; break; }
    case 4: { break; }
    case 5: { column++; break; }
    case 6: { row++; column--; break; }
    case 7: { row++; break; }
    case 8: { row++; column++; break; }
  }
  return row * 9 + column;
}

function _cellAvailable(tempInitArray: string[], box: number, value: number) {
  return tempInitArray[_getIndexOfCell(box, value)] === '0' ? 0 : 1;
}

function _generateUniqueSudoku(solvedArray: string[], difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) {
  let currentDifficulty = difficulty;
  let minimumCells, maximumCells, totalCells, box, cell;

  let tempInitArray = nullArray.slice();
  let boxCounts = [0, 0, 0,
    0, 0, 0,
    0, 0, 0];
  let boxesAvailable = [];
  let cellsAvailable = [];

  if (e)
    currentDifficulty = e.target.value;

  if (currentDifficulty === 'Easy') {
    minimumCells = 3;
    maximumCells = 7;
    totalCells = 45;
  }
  else if (currentDifficulty === 'Medium') {
    minimumCells = 2;
    maximumCells = 6;
    totalCells = 40;
  }
  else {
    minimumCells = 1;
    maximumCells = 5;
    totalCells = 30;
  }

  for (let j = 0; j < 9; j++) {
    boxCounts[j] = _cellAvailable(tempInitArray, j, 0) +
      _cellAvailable(tempInitArray, j, 1) +
      _cellAvailable(tempInitArray, j, 2) +
      _cellAvailable(tempInitArray, j, 3) +
      _cellAvailable(tempInitArray, j, 4) +
      _cellAvailable(tempInitArray, j, 5) +
      _cellAvailable(tempInitArray, j, 6) +
      _cellAvailable(tempInitArray, j, 7) +
      _cellAvailable(tempInitArray, j, 8);
  }

  for (let i = 0; i < totalCells; i++) {
    boxesAvailable = [];
    for (let j = 0; j < 9; j++) {
      if (boxCounts[j] < minimumCells) {
        boxesAvailable.push(j);
      }
    }
    if (boxesAvailable) {
      for (let j = 0; j < 9; j++) {
        if (boxCounts[j] < maximumCells) {
          boxesAvailable.push(j);
        }
      }
    }
    box = boxesAvailable[Math.random() * boxesAvailable.length | 0];

    cellsAvailable = [];
    for (let j = 0; j < 9; j++) {
      if (tempInitArray[_getIndexOfCell(box, j)] === '0') {
        cellsAvailable.push(j);
      }
    }
    cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];

    let index = _getIndexOfCell(box, cell);
    tempInitArray[index] = solvedArray[index]
    boxCounts[box]++;
  }

  return tempInitArray;
}

export const getUniqueSudoku = (difficulty: string, e?: React.ChangeEvent<HTMLSelectElement>) => {
  let temporaryInitArray = nullArray.slice();
  let temporarySolvedArray = nullArray.slice();
  let sudoku = getSudoku();


  let str = sudoku.generate(60);

  [...str].forEach((value, index) => {
    temporaryInitArray[index] = value === '.'
      ? '0'
      : value;
  });


  str = sudoku.solve(str);
  [...str].forEach((value, index) => {
    temporarySolvedArray[index] = value;
  });

  temporaryInitArray = _generateUniqueSudoku(temporarySolvedArray, difficulty, e);

  return [temporaryInitArray, temporarySolvedArray];
}
