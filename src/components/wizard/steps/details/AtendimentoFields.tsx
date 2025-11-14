import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AtendimentoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const AtendimentoFields = ({ form }: AtendimentoFieldsProps) => {
  const tipoAtendimento = form.watch("atendimentoTipo");
  const comLider = form.watch("atendimentoComLider");
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="atendimentoTipo"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de atendimento *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Presencial" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Presencial
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Online" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Online
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Em andamento" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Em andamento
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {tipoAtendimento === "Presencial" && (
        <FormField
          control={form.control}
          name="atendimentoLocal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual local? *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Escritório, Imóvel, Stand..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="atendimentoComLider"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Com presença do Líder? *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                value={field.value?.toString()}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Sim
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Não
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {comLider && (
        <FormField
          control={form.control}
          name="atendimentoLider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informar o líder *</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecione um líder</option>
                  <option value="Cinthya Helena Ferreira Martins">Cinthya Helena Ferreira Martins</option>
                  <option value="Mychelle Alves de Oliveira">Mychelle Alves de Oliveira</option>
                  <option value="Ângela De Sales Cunha Xavier">Ângela De Sales Cunha Xavier</option>
                  <option value="Noely Fernandes">Noely Fernandes</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="atendimentoClienteNome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do cliente</FormLabel>
            <FormControl>
              <Input placeholder="Nome completo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="atendimentoClienteTelefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone do cliente</FormLabel>
            <FormControl>
              <Input placeholder="(00) 00000-0000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="atendimentoEmpreendimento"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Empreendimento *</FormLabel>
            <FormControl>
              <Input placeholder="Nome do empreendimento" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
