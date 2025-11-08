import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface StepNotasProps {
  form: UseFormReturn<FormData>;
}

export const StepNotas = ({ form }: StepNotasProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Observações adicionais
        </h2>
        <p className="text-muted-foreground">
          Adicione notas e anexos se necessário
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="notas"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notas (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Adicione observações relevantes sobre esta atividade..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="anexos"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Anexos (opcional)</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Escolher arquivos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
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
