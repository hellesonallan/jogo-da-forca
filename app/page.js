"use client";

import { useState, useEffect, useCallback } from "react";

import { Dices, HeartCrack, PartyPopper, RotateCcw, X } from "lucide-react";

const WORDS = [
  "JAVASCRIPT",
  "PYTHON",
  "REACT",
  "ANGULAR",
  "NODEJS",
  "TYPESCRIPT",
  "DATABASE",
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "FRAMEWORK",
  "COMPONENT",
  "FUNCTION",
  "VARIABLE",
  "ALGORITHM",
  "INTERFACE",
  "PROGRAMMING",
  "DEVELOPMENT",
  "SOFTWARE",
  "COMPUTER",
  "INTERNET",
  "WEBSITE",
  "APPLICATION",
  "MOBILE",
  "DESKTOP",
  "CLOUD",
  "SECURITY",
  "NETWORK",
  "SERVER",
  "CLIENT",
  "AUTHENTICATION",
  "ENCRYPTION",
  "RESPONSIVE",
  "DESIGN",
  "ARCHITECTURE",
];

const MAX_WRONG_GUESSES = 6;

const HangmanDrawing = ({ wrongGuesses }) => {
  const parts = [
    // Base
    <line
      key="base"
      x1="10"
      y1="190"
      x2="70"
      y2="190"
      stroke="#8B4513"
      strokeWidth="4"
    />,
    // Pole
    <line
      key="pole"
      x1="30"
      y1="190"
      x2="30"
      y2="20"
      stroke="#8B4513"
      strokeWidth="4"
    />,
    // Top beam
    <line
      key="beam"
      x1="30"
      y1="20"
      x2="100"
      y2="20"
      stroke="#8B4513"
      strokeWidth="4"
    />,
    // Noose
    <line
      key="noose"
      x1="100"
      y1="20"
      x2="100"
      y2="40"
      stroke="#8B4513"
      strokeWidth="2"
    />,
    // Head
    <circle
      key="head"
      cx="100"
      cy="50"
      r="10"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />,
    // Body
    <line
      key="body"
      x1="100"
      y1="60"
      x2="100"
      y2="120"
      stroke="#333"
      strokeWidth="2"
    />,
  ];

  return (
    <svg width="120" height="200" className="hangman-drawing">
      {parts.slice(0, wrongGuesses)}
      {wrongGuesses > 4 && (
        <>
          {/* Left arm */}
          <line
            x1="100"
            y1="80"
            x2="80"
            y2="100"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Right arm */}
          <line
            x1="100"
            y1="80"
            x2="120"
            y2="100"
            stroke="#333"
            strokeWidth="2"
          />
        </>
      )}
      {wrongGuesses > 5 && (
        <>
          {/* Left leg */}
          <line
            x1="100"
            y1="120"
            x2="85"
            y2="150"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Right leg */}
          <line
            x1="100"
            y1="120"
            x2="115"
            y2="150"
            stroke="#333"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
};

const HangmanGame = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'
  const [inputLetter, setInputLetter] = useState("");

  const initializeGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
    setInputLetter("");
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const displayWord = currentWord
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) {
      return;
    }

    const newGuessedLetters = new Set([...guessedLetters, letter]);
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const handleInputSubmit = (e) => {
    const letter = inputLetter.toUpperCase();
    if (letter && letter.length === 1 && /[A-Z]/.test(letter)) {
      handleGuess(letter);
      setInputLetter("");
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG_GUESSES) {
      setGameStatus("lost");
    } else if (
      currentWord &&
      currentWord.split("").every((letter) => guessedLetters.has(letter))
    ) {
      setGameStatus("won");
    }
  }, [wrongGuesses, currentWord, guessedLetters]);

  const correctLetters = Array.from(guessedLetters).filter((letter) =>
    currentWord.includes(letter)
  );
  const incorrectLetters = Array.from(guessedLetters).filter(
    (letter) => !currentWord.includes(letter)
  );

  console.log(currentWord);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-stone-800 p-6 text-center flex justify-center items-center">
            <Dices size={48} color="white" className="mr-2" />
            <h1 className="text-4xl font-bold text-white">Jogo da Forca</h1>
          </div>

          <div className="p-8">
            <div className="gap-8">
              {/* Left Column - Game Area */}
              <div className="space-y-6">
                {/* Hangman Drawing */}
                <div className="bg-stone-50 rounded-xl p-6 flex justify-center">
                  <HangmanDrawing wrongGuesses={wrongGuesses} />
                </div>

                {/* Game Status */}
                <div className="text-center">
                  <div className="text-sm text-stone-600 mb-2">
                    Tentativas restantes:
                    <span
                      className={`ml-2 font-bold ${
                        wrongGuesses >= 4 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {MAX_WRONG_GUESSES - wrongGuesses}
                    </span>
                  </div>

                  {gameStatus === "won" && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex justify-center items-center">
                      <PartyPopper size={24} className="mr-2" />
                      Parabéns! Você venceu!
                    </div>
                  )}

                  {gameStatus === "lost" && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-center items-center">
                      <HeartCrack size={24} className="mr-2" />
                      Que pena! A palavra era:<strong>{currentWord}</strong>
                    </div>
                  )}
                </div>

                {/* Word Display */}
                <div className="bg-stone-50 rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold tracking-wider text-stone-800 mb-4">
                      {displayWord}
                    </div>
                    <div className="text-sm text-stone-600">
                      {currentWord.length} letras
                    </div>
                  </div>
                </div>

                {/* Restart Button */}
                <div>
                  <div className="bg-red-50 rounded-xl p-4 mb-4">
                    <div className="flex mb-3">
                      <X size={32} color="red" />
                      <h3 className="text-lg font-semibold text-red-800 flex items-center">
                        Incorretas
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {incorrectLetters.length > 0 ? (
                        incorrectLetters.map((letter) => (
                          <span
                            key={letter}
                            className="bg-red-200 text-red-800 px-2 py-1 rounded font-semibold"
                          >
                            {letter}
                          </span>
                        ))
                      ) : (
                        <span className="text-red-600 text-sm">
                          Nenhuma ainda
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Letters and Stats */}
              <div className="space-y-6">
                {/* Virtual Keyboard */}
                <div className="bg-stone-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-stone-800">
                    Teclado Virtual
                  </h3>
                  <div className="grid grid-cols-12 gap-2">
                    {alphabet.map((letter) => {
                      const isGuessed = guessedLetters.has(letter);
                      const isCorrect =
                        isGuessed && currentWord.includes(letter);
                      const isIncorrect =
                        isGuessed && !currentWord.includes(letter);

                      return (
                        <button
                          key={letter}
                          onClick={() => handleGuess(letter)}
                          disabled={isGuessed || gameStatus !== "playing"}
                          className={`
                            py-2 px-1 rounded font-semibold text-sm transition-all
                            ${
                              isCorrect
                                ? "bg-green-500 text-white"
                                : isIncorrect
                                ? "bg-red-500 text-white"
                                : isGuessed
                                ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                : "bg-stone-800 hover:bg-stone-600 text-white hover:scale-105"
                            }
                            ${
                              gameStatus !== "playing"
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }
                          `}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guessed Letters */}
                <button
                  onClick={initializeGame}
                  className="w-full flex justify-center items-center bg-stone-800 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  <RotateCcw size={24} className="mr-2" />
                  Reiniciar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangmanGame;
