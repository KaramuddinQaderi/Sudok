import React, { createContext, useContext, useState } from 'react';

type SudokuContextProps = {
  numberSelected: string,
  setNumberSelected: React.Dispatch<React.SetStateAction<string>>,
  gameArray: string[],
  setGameArray: React.Dispatch<React.SetStateAction<string[]>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  fastMode: boolean,
  setFastMode: React.Dispatch<React.SetStateAction<boolean>>,
  cellSelected: number,
  setCellSelected: React.Dispatch<React.SetStateAction<number>>,
  initArray: string[],
  setInitArray: React.Dispatch<React.SetStateAction<string[]>>,
};


const SudokuContext = createContext<SudokuContextProps>({
  numberSelected: '0', setNumberSelected: () => { },
  gameArray: [], setGameArray: () => { },
  difficulty: 'Easy', setDifficulty: () => { },

  fastMode: false, setFastMode: () => { },
  cellSelected: -1, setCellSelected: () => { },
  initArray: [], setInitArray: () => { },

},
);

type SudokuProviderProps = {
  children: React.ReactElement
};

export const SudokuProvider = ({ children }: SudokuProviderProps) => {
  let [numberSelected, setNumberSelected] = useState<string>('0');
  let [gameArray, setGameArray] = useState<string[]>([]);
  let [difficulty, setDifficulty] = useState<string>('Easy');
  let [fastMode, setFastMode] = useState<boolean>(false);
  let [cellSelected, setCellSelected] = useState<number>(-1);
  let [initArray, setInitArray] = useState<string[]>([]);


  return (
    <SudokuContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty, setDifficulty,
        fastMode, setFastMode,
        cellSelected, setCellSelected,
        initArray, setInitArray,

      }
    }>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = (): SudokuContextProps => useContext(SudokuContext);
