import { Ribbon } from "lucide-react";

export function Titulo() {
  return (
    <div className="bg-stone-800 p-6 text-center flex justify-center items-center">
      <Ribbon size={48} color="white" className="mr-2 rotate-180" />
      <h1 className="text-4xl font-bold text-white">Jogo da Forca</h1>
    </div>
  );
}
