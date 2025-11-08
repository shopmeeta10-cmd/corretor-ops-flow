import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import { CaptacaoFields } from "./details/CaptacaoFields";
import { AcaoVendasFields } from "./details/AcaoVendasFields";
import { TreinamentoFields } from "./details/TreinamentoFields";
import { LigacaoFields } from "./details/LigacaoFields";
import { AtendimentoFields } from "./details/AtendimentoFields";
import { ConteudoFields } from "./details/ConteudoFields";

interface StepDetalhesProps {
  form: UseFormReturn<FormData>;
}

export const StepDetalhes = ({ form }: StepDetalhesProps) => {
  const tipoAtividade = form.watch("tipoAtividade");
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Detalhes da atividade
        </h2>
        <p className="text-muted-foreground">
          Preencha as informações específicas
        </p>
      </div>
      
      {tipoAtividade === "Captação" && <CaptacaoFields form={form} />}
      {tipoAtividade === "Ação de vendas (Oferta ativa)" && <AcaoVendasFields form={form} />}
      {tipoAtividade === "Treinamento" && <TreinamentoFields form={form} />}
      {tipoAtividade === "Ligação" && <LigacaoFields form={form} />}
      {tipoAtividade === "Atendimento" && <AtendimentoFields form={form} />}
      {tipoAtividade === "Gravação de conteúdo" && <ConteudoFields form={form} />}
    </div>
  );
};
