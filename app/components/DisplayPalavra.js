export function DisplayPalavra({ palavraExibida, palavraAtual }) {
  return (
    <div className="bg-stone-50 rounded-xl p-6 mb-4">
      <div className="text-center">
        <div className="text-3xl font-mono font-bold tracking-wider text-stone-800 mb-4">
          {palavraExibida}
        </div>
        <div className="text-sm text-stone-600">
          {palavraAtual.length} letras
        </div>
      </div>
    </div>
  );
}
