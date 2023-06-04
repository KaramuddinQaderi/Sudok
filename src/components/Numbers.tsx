import React from 'react';
import { useSudokuContext } from '../context/SudokuContext';
import { FaTrash } from "react-icons/fa";

type NumbersProps = {
  onClickNumber: (number: string) => void
};


export const Numbers = ({ onClickNumber }: NumbersProps) => {
  let { numberSelected } = useSudokuContext();

  return (
    <div className="status__numbers">
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map((number) => {
          if (numberSelected === number.toString()) {
            return (
              <div className="status__number status__number--selected" key={number} onClick={() => onClickNumber(number.toString())}>{number.toString() === "0" ? <FaTrash color='red' /> : number.toString()} </div>
            )
          } else {
            return (
              <div className="status__number" key={number} onClick={() => onClickNumber(number.toString())}>{number.toString() === "0" ? <FaTrash color='red' /> : number.toString()}</div>
            )
          }
        })
      }
    </div>
  )
}
