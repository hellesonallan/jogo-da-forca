"use client";

import { useState, useEffect } from "react";
import { WORDS } from "./utils/words";

export default function Home() {
  type GameStatus = "playing" | "won" | "lost";

  const [actualWord, setActualWord] = useState<string>(""); // Palavra atual (Deve ser selecionada aleatoriamente)
  const [correctLetters, setCorrectLetters] = useState<string[]>([]); // Array de letras corretas já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]); // Array de letras incorretas já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [triedLetters, setTriedLetters] = useState<string[]>([]); // Array de letras já inseridas (Deve ser preenchida ao decorrer do jogo)
  const [tries, setTries] = useState<number>(6); // Número de tentativas (Deve diminuir ao decorrer do jogo)
  const [status, setStatus] = useState<GameStatus>("playing"); // Estado do jogo (Deve modificar para win ou lose ao decorrer do jogo)

  function chooseRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }

  useEffect(() => {
    setActualWord(chooseRandomWord());
  }, []);

  useEffect(() => {
    if (tries <= 0) {
      setStatus("lost");
    }
    if (actualWord && actualWord.split("").every(letter => correctLetters.includes(letter))) {
      setStatus("won");
    }
  });

  function handleLetter(letter: string) {
    setTriedLetters((prev) => [...prev, letter]);

    if (actualWord.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setIncorrectLetters((prev) => [...prev, letter]);
      setTries((prev) => prev - 1);
    }
  }

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const keyboard = alphabet.map((letter) => (
    <button key={letter} onClick={() => handleLetter(letter)} disabled={triedLetters.includes(letter)}>
      {letter}
    </button>
  ));

  return (
    <div>
      <div>
        <span>
          Palavra: <b>{actualWord}</b>
        </span>
      </div>
      <div>
        <span>
          Letras corretas: <b>{correctLetters}</b>
        </span>
      </div>
      <div>
        <span>
          Letras incorretas: <b>{incorrectLetters}</b>
        </span>
      </div>
      <div>
        <span>
          Letras tentadas: <b>{triedLetters}</b>
        </span>
      </div>
      <div>
        <p>
          Tentativas: <b>{tries}</b>
        </p>
      </div>
      <div>
        <span>
          Status: <b>{status}</b>
        </span>
      </div>
      <div>{keyboard}</div>
    </div>
  );
}
