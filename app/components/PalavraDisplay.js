const PalavraDisplay = ({ palavra, letrasAdivinhadas }) => {
  const renderizarPalavra = () => {
    return palavra.split("").map((letra, index) => (
      <span
        key={index}
        className="inline-block w-8 h-10 mx-1 text-2xl font-bold text-center border-b-2 border-blue-600"
      >
        {letrasAdivinhadas.has(letra) ? letra : ""}
      </span>
    ));
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg mb-2">Palavra:</h3>
      <div className="flex justify-center flex-wrap">{renderizarPalavra()}</div>
    </div>
  );
};
