import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AcaoVendasFieldsProps {
  form: UseFormReturn<FormData>;
}

export const AcaoVendasFields = ({ form }: AcaoVendasFieldsProps) => {
  const acaoVendasTipo = form.watch("acaoVendasTipo");
  const acaoVendasProduto = form.watch("acaoVendasProduto");
  const solicitaLogistica = form.watch("acaoVendasSolicitaLogistica");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="acaoVendasTipo"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Tipo de ação *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Oferta ativa" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Oferta ativa
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Panfletagem" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Panfletagem
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {acaoVendasTipo === "Oferta ativa" && (
        <>
          <FormField
            control={form.control}
            name="acaoVendasProduto"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Qual produto? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Geral" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Geral
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Empreendimento específico" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Empreendimento específico
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {acaoVendasProduto === "Empreendimento específico" && (
            <FormField
              control={form.control}
              name="acaoVendasEmpreendimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do empreendimento *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite o nome do empreendimento" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </>
      )}

      {acaoVendasTipo === "Panfletagem" && (
        <>
          <FormField
            control={form.control}
            name="acaoVendasLocal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Onde será realizada a panfletagem?" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acaoVendasSolicitaLogistica"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Solicita Logística R3R? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex flex-col space-y-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {solicitaLogistica && (
            <FormField
              control={form.control}
              name="acaoVendasMateriais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informar materiais *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Liste os materiais necessários..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </>
      )}
    </div>
  );
};
