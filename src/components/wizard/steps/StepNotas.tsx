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
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <FormLabel>Anexos de imagens (opcional)</FormLabel>
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
                      const currentFiles = value || [];
                      onChange([...currentFiles, ...files]);
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
                        <div key={index} className="relative border rounded-lg overflow-hidden aspect-square group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                            {file.name}
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newFiles = value.filter((_: File, i: number) => i !== index);
                              onChange(newFiles);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
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
