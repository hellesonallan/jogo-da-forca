export function DesenhoForca({ tentativasErradas }) {
  // Partes da forca
  const forca = [
    // Base
    <line
      key="base"
      x1="10"
      y1="190"
      x2="70"
      y2="190"
      stroke="#8B4513"
      strokeWidth="8"
    />,
    // Poste
    <line
      key="poste"
      x1="30"
      y1="190"
      x2="30"
      y2="20"
      stroke="#8B4513"
      strokeWidth="8"
    />,
    // Barra Superior
    <line
      key="barra"
      x1="26"
      y1="20"
      x2="102"
      y2="20"
      stroke="#8B4513"
      strokeWidth="8"
    />,
    // Laço
    <line
      key="laco"
      x1="100"
      y1="20"
      x2="100"
      y2="40"
      stroke="#8B4513"
      strokeWidth="2"
    />,
  ];

  // Partes do boneco
  const partesBoneco = [
    // Cabeça (tentativa 1)
    <circle
      key="cabeca"
      cx="100"
      cy="50"
      r="10"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />,
    // Corpo (tentativa 2)
    <line
      key="corpo"
      x1="100"
      y1="60"
      x2="100"
      y2="120"
      stroke="#333"
      strokeWidth="2"
    />,
    // Braço esquerdo (tentativa 3)
    <line
      key="braco-esquerdo"
      x1="100"
      y1="80"
      x2="80"
      y2="100"
      stroke="#333"
      strokeWidth="2"
    />,
    // Braço direito (tentativa 4)
    <line
      key="braco-direito"
      x1="100"
      y1="80"
      x2="120"
      y2="100"
      stroke="#333"
      strokeWidth="2"
    />,
    // Perna esquerda (tentativa 5)
    <line
      key="perna-esquerda"
      x1="100"
      y1="120"
      x2="85"
      y2="150"
      stroke="#333"
      strokeWidth="2"
    />,
    // Perna direita (tentativa 6)
    <line
      key="perna-direita"
      x1="100"
      y1="120"
      x2="115"
      y2="150"
      stroke="#333"
      strokeWidth="2"
    />,
  ];

  return (
    <svg width="120" height="200" className="hangman-drawing">
      {forca}
      {partesBoneco.slice(0, tentativasErradas)}
    </svg>
  );
}
