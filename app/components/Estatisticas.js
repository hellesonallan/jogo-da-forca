export function Estatisticas({ tentativasErradas, maxTentativas }) {
  return (
    <div className="text-center">
      <div className="text-sm text-stone-600 mb-2">
        Tentativas restantes:
        <span className="ml-1 font-bold">
          {maxTentativas - tentativasErradas}
        </span>
      </div>
      <div className="text-sm text-stone-600 mb-2">
        Tema:
        <span className="ml-1 font-bold">PROGRAMAÇÃO</span>
      </div>
    </div>
  );
}
