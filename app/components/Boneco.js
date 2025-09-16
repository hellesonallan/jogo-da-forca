const Boneco = ({ tentativasErradas }) => {
  const desenharBoneco = () => {
    const partes = ["😵", "👤", "🫱", "🫲", "🦵", "🦵"];
    const partesVisiveis = partes.slice(0, tentativasErradas);

    return <div className="text-6xl">{partesVisiveis.join(" ")}</div>;
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Boneco</h2>
      <div className="bg-gray-100 p-6 rounded">{desenharBoneco()}</div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Tentativas restantes: {6 - tentativasErradas}
        </p>
      </div>
    </div>
  );
};
