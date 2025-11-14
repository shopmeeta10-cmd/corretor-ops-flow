import { UseFormReturn } from "react-hook-form";
import { FormData, ActivityType } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StepAtividadeProps {
  form: UseFormReturn<FormData>;
}

const ACTIVITIES: { value: ActivityType; label: string; description: string }[] = [
  { value: "Atendimento", label: "Atendimento", description: "Atendimento a clientes" },
  { value: "Ligação", label: "Ligação", description: "Ligações para prospects" },
  { value: "Captação", label: "Captação", description: "Captação de imóveis" },
  { value: "Treinamento", label: "Treinamento", description: "Treinamento da equipe" },
  { value: "Ação de vendas (oferta ativa / panfletagem)", label: "Ação de vendas (oferta ativa / panfletagem)", description: "Ações de vendas e divulgação" },
  { value: "Gravação de conteúdo", label: "Gravação de conteúdo", description: "Produção de conteúdo" },
  { value: "Reunião de alinhamento", label: "Reunião de alinhamento", description: "Reuniões de planejamento" },
];

export const StepAtividade = ({ form }: StepAtividadeProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Tipo de atividade
        </h2>
        <p className="text-muted-foreground">
          Selecione o tipo de atividade realizada
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="tipoAtividade"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4"
              >
                {ACTIVITIES.map((activity) => (
                  <FormItem key={activity.value}>
                    <FormControl>
                      <div 
                        className="flex items-start space-x-3 space-y-0 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => field.onChange(activity.value)}
                      >
                        <RadioGroupItem value={activity.value} />
                        <div className="flex-1">
                          <FormLabel className="font-medium cursor-pointer">
                            {activity.label}
                          </FormLabel>
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
