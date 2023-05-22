import React from 'react';
import { useSudokuContext } from '../../context/SudokuContext';

type GameSectionProps = {
  onClick: (indexOfArray: number) => void
};

export const GameSection = (props: GameSectionProps) => {
  const rows = [0,1,2,3,4,5,6,7,8];
  let { numberSelected,
        gameArray,
        fastMode,
        cellSelected,
        initArray } = useSudokuContext();

  function _isCellSameAsSelectedCell(row: number, column: number) {
    if (fastMode) {
      if (numberSelected === gameArray[row * 9 + column]) {
        return true;
      }
      return false;
    } else {
      if (cellSelected === row * 9 + column) {
        return true;
      }
      if (gameArray[cellSelected] === '0') {
        return false;
      }
      if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
        return true;
      }
    }
  }

  function _selectedCell(indexOfArray: number, value: string, highlight: string) {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td className={`game__cell game__cell--userfilled game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {
        return (
          <td className={`game__cell game__cell--filled game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {
      return (
        <td className={`game__cell game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }

  function _unselectedCell(indexOfArray: number, value: string) {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td className="game__cell game__cell--userfilled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {
        return (
          <td className="game__cell game__cell--filled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {
      return (
        <td className="game__cell" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }

  return (
    <section className="game">
      <table className="game__board">
        <tbody>
          {
            rows.map((row) => {
              return (
                <tr className="game__row" key={row}>
                  {
                    rows.map((column) => {
                      const indexOfArray = row * 9 + column;
                      const value = gameArray[indexOfArray];

                      if (cellSelected === indexOfArray) {
                        return _selectedCell(indexOfArray, value, 'highlight');
                      }

                      if (fastMode) {
                        if (numberSelected !== '0' && _isCellSameAsSelectedCell(row, column)) {
                          return _selectedCell(indexOfArray, value, '');
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      } else {
                        if (cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                          return _selectedCell(indexOfArray, value, '');
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      }
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}
