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
        name="atendimentoClienteNome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do cliente *</FormLabel>
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
            <FormLabel>Telefone do cliente *</FormLabel>
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
