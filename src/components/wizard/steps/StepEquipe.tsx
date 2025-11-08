import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEAMS } from "@/data/teams";

interface StepEquipeProps {
  form: UseFormReturn<FormData>;
}

export const StepEquipe = ({ form }: StepEquipeProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Qual é a sua equipe?
        </h2>
        <p className="text-muted-foreground">
          Selecione a equipe à qual você pertence
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="equipe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipe</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                form.setValue("nome", ""); // Reset nome when equipe changes
              }} 
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua equipe" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(TEAMS).map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
