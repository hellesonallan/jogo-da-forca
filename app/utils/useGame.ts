import { useState } from "react";
import { WORDS } from "./words";

type GameStatus = "playing" | "won" | "lost";

export function useGame() {
  const [actualWord, setActualWord] = useState<string>(""); // Palavra atual (Deve ser selecionada aleatoriamente)
  const [correctLetters, setCorrectLetters] = useState<string[]>([]); // Array de letras corretas já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]); // Array de letras incorretas já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [triedLetters, setTriedLetters] = useState<string[]>([]); // Array de letras já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [tries, setTries] = useState<number>(6); // Número de tentativas (Deve diminuir ao decorrer do jogo)
  const [status, setStatus] = useState<GameStatus>("playing"); // Estado do jogo (Deve modificar para win ou lose ao decorrer do jogo)

  function chooseRandomWord() {
    const randomIndex = Math.random() * (WORDS.length - 0) + 0;
    setActualWord(WORDS[randomIndex]);
  }

  chooseRandomWord();
}
