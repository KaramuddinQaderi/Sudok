import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { GameSection } from './components/layout/GameSection';
import { StatusSection } from './components/layout/StatusSection';

import { getUniqueSudoku } from './solver/UniqueSudoku';
import { useSudokuContext } from './context/SudokuContext';

export const Game: React.FC<{}> = () => {
  let { numberSelected, setNumberSelected,
    gameArray, setGameArray,
    difficulty,


    cellSelected, setCellSelected,
    initArray, setInitArray,
  } = useSudokuContext();
  let [mistakesMode] = useState<boolean>(false);

  let [solvedArray, setSolvedArray] = useState<string[]>([]);
  let [overlay, setOverlay] = useState<boolean>(false);

  function _createNewGame(e?: React.ChangeEvent<HTMLSelectElement>) {
    let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(difficulty, e);

    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected('0');
    setCellSelected(-1);


  }

  function _isSolved(index: number, value: string) {
    if (gameArray.every((cell: string, cellIndex: number) => {
      if (cellIndex === index)
        return value === solvedArray[cellIndex];
      else
        return cell === solvedArray[cellIndex];
    })) {
      return true;
    }
    return false;
  }

  function _fillCell(index: number, value: string) {
    if (initArray[index] === '0') {
      let tempArray = gameArray.slice();


      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
        setOverlay(true);
      }
    }
  }

  function _userFillCell(index: number, value: string) {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        _fillCell(index, value);
      }
    } else {
      _fillCell(index, value);
    }
  }




  function onClickCell(indexOfArray: number) {
    if (numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }


  function onClickNumber(number: string) {

    if (cellSelected !== -1) {
      _userFillCell(cellSelected, number);
    }
  }




  useEffect(() => {
    _createNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={overlay ? "container blur" : "container"}>
        <Header />
        <div className="innercontainer">
          <GameSection
            onClick={(indexOfArray: number) => onClickCell(indexOfArray)}
          />
          <StatusSection
            onClickNumber={(number: string) => onClickNumber(number)}
          />
        </div>
      </div>
    </>
  );
}
