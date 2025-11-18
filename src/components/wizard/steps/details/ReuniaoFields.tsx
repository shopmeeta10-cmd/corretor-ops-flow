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
import { Textarea } from "@/components/ui/textarea";

interface ReuniaoFieldsProps {
  form: UseFormReturn<FormData>;
}

export const ReuniaoFields = ({ form }: ReuniaoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="reuniaoPauta"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pauta da reunião *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Descreva a pauta da reunião..." 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="reuniaoLocal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Local *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Onde será realizada a reunião?" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="reuniaoParticipantes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Participantes (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Nome completo ou email dos participantes (um por linha)" 
                className="min-h-[100px] resize-none"
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
