"use client";

import { MensagemStatus } from "./components/MensagemStatus";
import { DisplayPalavra } from "./components/DisplayPalavra";
import { TecladoVirtual } from "./components/TecladoVirtual";
import { BotaoReiniciar } from "./components/BotaoReiniciar";
import { Estatisticas } from "./components/Estatisticas";
import { DesenhoForca } from "./components/DesenhoForca";
import { useJogoForca } from "./hooks/useJogoForca";

export default function JogoForca() {
  const {
    palavraAtual,
    MAX_TENTATIVAS_ERRADAS,
    letrasAdivinhadas,
    tentativasErradas,
    statusJogo,
    palavraExibida,
    inicializarJogo,
    adivinharLetra,
  } = useJogoForca();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-stone-800 p-6 text-center flex justify-center items-center">
            <h1 className="text-4xl font-bold text-white">Jogo da Forca</h1>
          </div>

          <div className="p-8">
            <div className="gap-8">
              <div className="space-y-6">
                <div className="bg-stone-50 rounded-xl p-6 flex justify-center">
                  <DesenhoForca tentativasErradas={tentativasErradas} />
                </div>

                <div className="text-center">
                  <Estatisticas
                    tentativasErradas={tentativasErradas}
                    maxTentativas={MAX_TENTATIVAS_ERRADAS}
                  />

                  <MensagemStatus
                    statusJogo={statusJogo}
                    palavraAtual={palavraAtual}
                  />
                </div>

                <DisplayPalavra
                  palavraExibida={palavraExibida}
                  palavraAtual={palavraAtual}
                />
              </div>

              <div className="space-y-6">
                <TecladoVirtual
                  alfabeto={"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}
                  letrasAdivinhadas={letrasAdivinhadas}
                  palavraAtual={palavraAtual}
                  statusJogo={statusJogo}
                  onLetraClick={adivinharLetra}
                />

                <BotaoReiniciar onReiniciar={inicializarJogo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
