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
import { TEAMS, TeamName } from "@/data/teams";

interface StepNomeProps {
  form: UseFormReturn<FormData>;
}

export const StepNome = ({ form }: StepNomeProps) => {
  const equipe = form.watch("equipe") as TeamName;
  const membros = equipe ? TEAMS[equipe] : [];
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Qual é o seu nome?
        </h2>
        <p className="text-muted-foreground">
          Selecione seu nome da lista de membros ativos
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu nome" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {membros.length > 0 ? (
                  membros.map((membro) => (
                    <SelectItem key={membro} value={membro}>
                      {membro}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    Selecione uma equipe primeiro
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
