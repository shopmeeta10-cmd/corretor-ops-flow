import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

interface StepConfirmacaoProps {
  form: UseFormReturn<FormData>;
  onTurnstileVerify: (token: string) => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: any) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export const StepConfirmacao = ({ form, onTurnstileVerify }: StepConfirmacaoProps) => {
  useEffect(() => {
    // Load Turnstile script
    if (!document.getElementById('turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Confirmação final
        </h2>
        <p className="text-muted-foreground">
          Revise suas informações e confirme o envio
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="consentimentoLGPD"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Concordo com os termos de privacidade *
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                Ao marcar esta opção, você concorda com nossa{" "}
                <a href="/privacidade" target="_blank" className="text-primary hover:underline">
                  Política de Privacidade
                </a>{" "}
                e o uso dos seus dados conforme a LGPD.
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-2">
        <FormLabel>Verificação de segurança *</FormLabel>
        <div 
          className="cf-turnstile"
          data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          data-callback="onTurnstileCallback"
        />
        <p className="text-xs text-muted-foreground">
          Complete a verificação para enviar o formulário
        </p>
      </div>
    </div>
  );
};
