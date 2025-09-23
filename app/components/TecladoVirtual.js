export function TecladoVirtual({
  alfabeto,
  letrasAdivinhadas,
  palavraAtual,
  statusJogo,
  onLetraClick,
}) {
  return (
    <div className="bg-stone-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-stone-800">
        Teclado Virtual
      </h3>
      <div className="grid grid-cols-12 gap-2">
        {alfabeto.map((letra) => {
          const foiAdivinhada = letrasAdivinhadas.has(letra);
          const estaCorreta = foiAdivinhada && palavraAtual.includes(letra);
          const estaIncorreta = foiAdivinhada && !palavraAtual.includes(letra);

          return (
            <button
              key={letra}
              onClick={() => onLetraClick(letra)}
              disabled={foiAdivinhada || statusJogo !== "jogando"}
              className={`
              py-2 px-1 rounded font-semibold transition-all
              ${
                estaCorreta
                  ? "bg-green-500 text-white"
                  : estaIncorreta
                  ? "bg-red-500 text-white"
                  : foiAdivinhada
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                  : "bg-stone-800 hover:bg-stone-600 text-white hover:scale-105"
              }
              ${statusJogo !== "jogando" ? "cursor-not-allowed opacity-50" : ""}
            `}
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
}
