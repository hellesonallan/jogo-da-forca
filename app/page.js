"use client";

import React, { useState, useEffect } from "react";

const JogoDaForca = () => {
  // Lista de palavras para o jogo
  const palavras = [
    "JAVASCRIPT",
    "NEXTJS",
    "REACT",
    "TYPESCRIPT",
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "SERVIDOR",
    "APLICACAO",
    "PROGRAMADOR",
    "COMPUTADOR",
    "TECNOLOGIA",
    "INTERNET",
    "WEBSITE",
    "MOBILE",
  ];

  const [palavraAtual, setPalavraAtual] = useState("");
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState(new Set());
  const [tentativasErradas, setTentativasErradas] = useState(0);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const maxTentativas = 6;

  // Inicializar jogo
  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  const iniciarNovoJogo = () => {
    const palavraAleatoria =
      palavras[Math.floor(Math.random() * palavras.length)];
    setPalavraAtual(palavraAleatoria);
    setLetrasAdivinhadas(new Set());
    setTentativasErradas(0);
    setJogoTerminado(false);
    setGanhou(false);
  };

  // Verificar se o jogo terminou
  useEffect(() => {
    if (palavraAtual) {
      const letrasUnicas = new Set(palavraAtual);
      const acertou = [...letrasUnicas].every((letra) =>
        letrasAdivinhadas.has(letra)
      );

      if (acertou) {
        setGanhou(true);
        setJogoTerminado(true);
      } else if (tentativasErradas >= maxTentativas) {
        setJogoTerminado(true);
      }
    }
  }, [letrasAdivinhadas, tentativasErradas, palavraAtual]);

  const tentarLetra = (letra) => {
    if (letrasAdivinhadas.has(letra) || jogoTerminado) return;

    const novasLetras = new Set([...letrasAdivinhadas, letra]);
    setLetrasAdivinhadas(novasLetras);

    if (!palavraAtual.includes(letra)) {
      setTentativasErradas((prev) => prev + 1);
    }
  };

  // Renderizar palavra com letras reveladas
  const renderizarPalavra = () => {
    return palavraAtual.split("").map((letra, index) => (
      <span
        key={index}
        className="inline-block w-8 h-10 mx-1 text-2xl font-bold text-center border-b-2 border-blue-600"
      >
        {letrasAdivinhadas.has(letra) ? letra : ""}
      </span>
    ));
  };

  // Desenho da forca baseado no número de erros
  const desenharForca = () => {
    const partes = [
      "  +---+",
      "  |   |",
      tentativasErradas > 0 ? "  O   |" : "      |",
      tentativasErradas > 2
        ? " /|\\  |"
        : tentativasErradas > 1
        ? " /|   |"
        : "      |",
      tentativasErradas > 4
        ? " / \\  |"
        : tentativasErradas > 3
        ? " /    |"
        : "      |",
      "      |",
      "=========",
    ];

    return partes.map((linha, index) => (
      <div key={index} className="font-mono text-sm">
        {linha}
      </div>
    ));
  };

  // Gerar teclado virtual
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const renderizarTeclado = () => {
    return (
      <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
        {alfabeto.map((letra) => {
          const jaUsada = letrasAdivinhadas.has(letra);
          const acertou = jaUsada && palavraAtual.includes(letra);
          const errou = jaUsada && !palavraAtual.includes(letra);

          return (
            <button
              key={letra}
              onClick={() => tentarLetra(letra)}
              disabled={jaUsada || jogoTerminado}
              className={`
                p-2 rounded font-bold transition-colors
                ${
                  errou
                    ? "bg-red-500 text-white"
                    : acertou
                    ? "bg-green-500 text-white"
                    : jaUsada
                    ? "bg-gray-400 text-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }
                ${
                  jaUsada || jogoTerminado
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }
              `}
            >
              {letra}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎯 Jogo da Forca
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Desenho da Forca */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Forca</h2>
              <div className="bg-gray-100 p-4 rounded inline-block">
                {desenharForca()}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Tentativas restantes: {maxTentativas - tentativasErradas}
                </p>
              </div>
            </div>

            {/* Status do Jogo */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Status</h2>

              {jogoTerminado && (
                <div
                  className={`text-2xl font-bold mb-4 ${
                    ganhou ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {ganhou ? "🎉 Você ganhou!" : "💀 Game Over!"}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg mb-2">Palavra:</h3>
                <div className="flex justify-center flex-wrap">
                  {renderizarPalavra()}
                </div>
              </div>

              {jogoTerminado && !ganhou && (
                <p className="text-gray-600 mb-4">
                  A palavra era: <strong>{palavraAtual}</strong>
                </p>
              )}

              <div className="text-sm text-gray-600">
                <p>
                  Letras usadas: {tentativasErradas}/{maxTentativas}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teclado Virtual */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Escolha uma letra
          </h2>
          {renderizarTeclado()}
        </div>

        {/* Botão Novo Jogo */}
        <div className="text-center">
          <button
            onClick={iniciarNovoJogo}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Novo Jogo
          </button>
        </div>

        {/* Instruções */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Como jogar</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Objetivo:</h3>
              <p>Adivinhe a palavra secreta escolhendo letras uma por vez.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Regras:</h3>
              <p>
                Você tem 6 tentativas. Cada letra errada adiciona uma parte ao
                desenho da forca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JogoDaForca;
