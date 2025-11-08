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
import { Upload } from "lucide-react";

interface LigacaoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const LigacaoFields = ({ form }: LigacaoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="ligacaoQuantidade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Para quantos números você ligou? *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Ex: 10" 
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="ligacaoFoco"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foco: empreendimento ou produto? *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ex: Residencial Jardins, Imóveis comerciais..." 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="ligacaoAnexos"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Anexe os números (foto da lista)</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Escolher arquivos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      onChange(files);
                    }}
                    {...field}
                  />
                </label>
                {value && value.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {value.length} arquivo(s) selecionado(s)
                  </span>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
