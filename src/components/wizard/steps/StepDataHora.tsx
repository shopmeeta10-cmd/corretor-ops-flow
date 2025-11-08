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
import { format } from "date-fns";

interface StepDataHoraProps {
  form: UseFormReturn<FormData>;
}

export const StepDataHora = ({ form }: StepDataHoraProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Data e hora da atividade
        </h2>
        <p className="text-muted-foreground">
          Quando esta atividade foi realizada?
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="dataHora"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data e Hora *</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                {...field}
                value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : new Date();
                  field.onChange(date);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
