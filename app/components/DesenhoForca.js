export function DesenhoForca({ tentativasErradas }) {
  const partes = [
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
      {partes.slice(0, tentativasErradas)}
      {tentativasErradas > 4 && (
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
      {tentativasErradas > 5 && (
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
}
