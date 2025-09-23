import { PartyPopper, HeartCrack } from "lucide-react";

export function MensagemStatus({ statusJogo, palavraAtual }) {
  if (statusJogo === "venceu") {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex justify-center items-center">
        <PartyPopper size={24} className="mr-2" />
        <p>Parabéns! Você venceu!</p>
      </div>
    );
  }

  if (statusJogo === "perdeu") {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-center items-center">
        <HeartCrack size={24} className="mr-2" />
        <p>
          Que pena! A palavra era: <strong>{palavraAtual}</strong>
        </p>
      </div>
    );
  }
}
