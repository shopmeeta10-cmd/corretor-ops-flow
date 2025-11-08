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
import { Checkbox } from "@/components/ui/checkbox";

interface CaptacaoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const CaptacaoFields = ({ form }: CaptacaoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <FormLabel>Tipo de negócio *</FormLabel>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="captacaoVenda"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  Venda
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="captacaoAluguel"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  Aluguel
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="captacaoTipoImovel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo do imóvel *</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Casa, Apartamento, Terreno..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="captacaoProprietarioNome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do proprietário *</FormLabel>
            <FormControl>
              <Input placeholder="Nome completo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="captacaoProprietarioTelefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone do proprietário *</FormLabel>
            <FormControl>
              <Input placeholder="(00) 00000-0000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="captacaoEnderecoImovel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço do imóvel *</FormLabel>
            <FormControl>
              <Input placeholder="Endereço completo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
