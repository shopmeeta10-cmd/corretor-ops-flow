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

interface TreinamentoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const TreinamentoFields = ({ form }: TreinamentoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="treinamentoTipo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qual tipo de treinamento? *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Técnicas de vendas, Atendimento ao cliente..." 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
