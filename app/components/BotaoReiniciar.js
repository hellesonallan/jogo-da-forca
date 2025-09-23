import { RotateCcw } from "lucide-react";

export function BotaoReiniciar({ onReiniciar }) {
  return (
    <button
      onClick={onReiniciar}
      className="w-full flex justify-center items-center bg-stone-800 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
    >
      <RotateCcw size={24} className="mr-2" />
      Reiniciar Jogo
    </button>
  );
}
