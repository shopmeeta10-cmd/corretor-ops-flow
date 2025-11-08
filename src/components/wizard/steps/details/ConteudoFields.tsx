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

interface ConteudoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const ConteudoFields = ({ form }: ConteudoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="conteudoTipo"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de conteúdo *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Gravação" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Gravação
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Post" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Post
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="conteudoLocal"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Local *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Sede" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Sede
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Externo" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Externo
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="conteudoProduto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qual produto? *</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Residencial Jardins, produto institucional..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
