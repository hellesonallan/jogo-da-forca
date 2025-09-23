import { useState, useEffect, useCallback, useMemo } from "react";
import { PALAVRAS } from "../utils/Palavras";

export function useJogoForca() {
  const MAX_TENTATIVAS_ERRADAS = 6;
  const [palavraAtual, setPalavraAtual] = useState("");
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState(new Set());
  const [tentativasErradas, setTentativasErradas] = useState(0);
  const [statusJogo, setStatusJogo] = useState("jogando");

  const inicializarJogo = useCallback(() => {
    const palavraAleatoria =
      PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
    setPalavraAtual(palavraAleatoria);
    setLetrasAdivinhadas(new Set());
    setTentativasErradas(0);
    setStatusJogo("jogando");
  }, []);

  useEffect(() => {
    inicializarJogo();
  }, [inicializarJogo]);

  const { palavraExibida, letrasCorretas, letrasIncorretas } = useMemo(() => {
    const exibida = palavraAtual
      .split("")
      .map((letra) => (letrasAdivinhadas.has(letra) ? letra : "_"))
      .join(" ");

    const corretas = Array.from(letrasAdivinhadas).filter((letra) =>
      palavraAtual.includes(letra)
    );

    const incorretas = Array.from(letrasAdivinhadas).filter(
      (letra) => !palavraAtual.includes(letra)
    );

    return {
      palavraExibida: exibida,
      letrasCorretas: corretas,
      letrasIncorretas: incorretas,
    };
  }, [palavraAtual, letrasAdivinhadas]);

  const adivinharLetra = useCallback(
    (letra) => {
      if (statusJogo !== "jogando" || letrasAdivinhadas.has(letra)) {
        return;
      }

      const novasLetrasAdivinhadas = new Set([...letrasAdivinhadas, letra]);
      setLetrasAdivinhadas(novasLetrasAdivinhadas);

      if (!palavraAtual.includes(letra)) {
        setTentativasErradas((prev) => prev + 1);
      }
    },
    [statusJogo, letrasAdivinhadas, palavraAtual]
  );

  useEffect(() => {
    if (tentativasErradas >= MAX_TENTATIVAS_ERRADAS) {
      setStatusJogo("perdeu");
    } else if (
      palavraAtual &&
      palavraAtual.split("").every((letra) => letrasAdivinhadas.has(letra))
    ) {
      setStatusJogo("venceu");
    }
  }, [tentativasErradas, palavraAtual, letrasAdivinhadas]);

  return {
    palavraAtual,
    letrasAdivinhadas,
    tentativasErradas,
    statusJogo,
    palavraExibida,
    letrasCorretas,
    letrasIncorretas,
    inicializarJogo,
    adivinharLetra,
    MAX_TENTATIVAS_ERRADAS,
  };
}
