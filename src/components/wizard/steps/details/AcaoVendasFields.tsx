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

interface AcaoVendasFieldsProps {
  form: UseFormReturn<FormData>;
}

export const AcaoVendasFields = ({ form }: AcaoVendasFieldsProps) => {
  const produto = form.watch("acaoVendasProduto");
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="acaoVendasProduto"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Qual produto? *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Geral" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Geral
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Empreendimento específico" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Empreendimento específico
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {produto === "Empreendimento específico" && (
        <FormField
          control={form.control}
          name="acaoVendasEmpreendimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do empreendimento *</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do empreendimento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
