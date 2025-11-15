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
            <FormLabel>Foco *</FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Empreendimento"
                    checked={field.value === "Empreendimento"}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Empreendimento</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Geral"
                    checked={field.value === "Geral"}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Geral</span>
                </label>
              </div>
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
              <div className="space-y-3">
                <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted transition-colors w-fit">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Escolher imagens</span>
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
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {value.length} imagem(ns) selecionada(s):
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {value.map((file: File, index: number) => (
                        <div key={index} className="relative border rounded-lg overflow-hidden aspect-square">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                            {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
