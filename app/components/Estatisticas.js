export function Estatisticas({ tentativasErradas, maxTentativas }) {
  return (
    <div className="text-center">
      <div className="text-sm text-stone-600 mb-2">
        Tentativas restantes:
        <span className="ml-2 font-bold">
          {maxTentativas - tentativasErradas}
        </span>
      </div>
    </div>
  );
}
