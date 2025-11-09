import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/types/form";
import { formSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { StepEquipe } from "@/components/wizard/steps/StepEquipe";
import { StepNome } from "@/components/wizard/steps/StepNome";
import { StepAtividade } from "@/components/wizard/steps/StepAtividade";
import { StepDetalhes } from "@/components/wizard/steps/StepDetalhes";
import { StepDataHora } from "@/components/wizard/steps/StepDataHora";
import { StepNotas } from "@/components/wizard/steps/StepNotas";
import { StepConfirmacao } from "@/components/wizard/steps/StepConfirmacao";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HelpButton } from "@/components/HelpButton";
import { Footer } from "@/components/Footer";
import agendouLogo from "@/assets/agendou-logo.png";

const TOTAL_STEPS = 7;

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipe: "",
      nome: "",
      tipoAtividade: "Atendimento",
      dataHora: new Date(),
      consentimentoLGPD: false,
      // Valores padrão para evitar inputs não controlados
      captacaoTipoImovel: "",
      captacaoProprietarioNome: "",
      captacaoProprietarioTelefone: "",
      captacaoEnderecoImovel: "",
      acaoVendasEmpreendimento: "",
      treinamentoTipo: "",
      ligacaoFoco: "",
      atendimentoLocal: "",
      atendimentoClienteNome: "",
      atendimentoClienteTelefone: "",
      atendimentoEmpreendimento: "",
      conteudoProduto: "",
      notas: "",
    },
  });
  
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ["equipe"];
        break;
      case 1:
        fieldsToValidate = ["nome"];
        break;
      case 2:
        fieldsToValidate = ["tipoAtividade"];
        break;
      case 3:
        // Validate based on activity type
        const tipoAtividade = form.getValues("tipoAtividade");
        if (tipoAtividade === "Captação") {
          fieldsToValidate = ["captacaoVenda", "captacaoAluguel", "captacaoTipoImovel", 
                             "captacaoProprietarioNome", "captacaoProprietarioTelefone", 
                             "captacaoEnderecoImovel"];
        } else if (tipoAtividade === "Ação de vendas (Oferta ativa)") {
          fieldsToValidate = ["acaoVendasProduto"];
          if (form.getValues("acaoVendasProduto") === "Empreendimento específico") {
            fieldsToValidate.push("acaoVendasEmpreendimento");
          }
        } else if (tipoAtividade === "Treinamento") {
          fieldsToValidate = ["treinamentoTipo"];
        } else if (tipoAtividade === "Ligação") {
          fieldsToValidate = ["ligacaoQuantidade", "ligacaoFoco"];
        } else if (tipoAtividade === "Atendimento") {
          fieldsToValidate = ["atendimentoTipo", "atendimentoClienteNome", 
                             "atendimentoClienteTelefone", "atendimentoEmpreendimento"];
          if (form.getValues("atendimentoTipo") === "Presencial") {
            fieldsToValidate.push("atendimentoLocal");
          }
        } else if (tipoAtividade === "Gravação de conteúdo") {
          fieldsToValidate = ["conteudoTipo", "conteudoLocal", "conteudoProduto"];
        }
        break;
      case 4:
        fieldsToValidate = ["dataHora"];
        break;
      case 5:
        // Notas step - optional fields
        break;
      case 6:
        fieldsToValidate = ["consentimentoLGPD"];
        break;
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    
    if (!isValid) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!turnstileToken) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, complete a verificação de segurança.",
        variant: "destructive",
      });
      return;
    }
    
    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Erro de validação",
        description: "Por favor, revise os campos do formulário.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const formData = form.getValues();
      const payload = {
        ...formData,
        cfToken: turnstileToken,
        timestamp: new Date().toISOString(),
      };
      
      console.log("Enviando dados para webhook:", payload);
      
      // Send to webhooks
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      const promises = [];
      let webhookErrors = [];
      
      if (webhookUrl) {
        const webhookPromise = fetch(webhookUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "cors",
        })
        .then(response => {
          console.log("Resposta do webhook principal:", response.status);
          if (!response.ok) {
            throw new Error(`Webhook retornou status ${response.status}`);
          }
          return response;
        })
        .catch(error => {
          console.error("Erro no webhook principal:", error);
          webhookErrors.push({
            webhook: "principal",
            error: error.message
          });
          throw error;
        });
        
        promises.push(webhookPromise);
      }
      
      if (n8nWebhookUrl) {
        const n8nPromise = fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "cors",
        })
        .then(response => {
          console.log("Resposta do webhook N8N:", response.status);
          if (!response.ok) {
            throw new Error(`N8N Webhook retornou status ${response.status}`);
          }
          return response;
        })
        .catch(error => {
          console.error("Erro no webhook N8N:", error);
          webhookErrors.push({
            webhook: "n8n",
            error: error.message
          });
          throw error;
        });
        
        promises.push(n8nPromise);
      }
      
      if (promises.length > 0) {
        try {
          await Promise.all(promises);
          console.log("Todos os webhooks responderam com sucesso");
        } catch (error) {
          console.error("Erro ao enviar para webhooks:", webhookErrors);
          
          // Mostrar erro mais detalhado
          toast({
            title: "Erro de conexão com o servidor",
            description: "O webhook não está respondendo. Verifique se o servidor está online e aceita requisições CORS.",
            variant: "destructive",
          });
          return;
        }
      }
      
      toast({
        title: "Enviado com sucesso!",
        description: "Seu registro foi salvo.",
      });
      
      navigate("/obrigado");
    } catch (error) {
      console.error("Erro geral ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepEquipe form={form} />;
      case 1:
        return <StepNome form={form} />;
      case 2:
        return <StepAtividade form={form} />;
      case 3:
        return <StepDetalhes form={form} />;
      case 4:
        return <StepDataHora form={form} />;
      case 5:
        return <StepNotas form={form} />;
      case 6:
        return <StepConfirmacao form={form} onTurnstileVerify={setTurnstileToken} />;
      default:
        return null;
    }
  };
  
  
  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return !!form.watch("equipe");
      case 1:
        return !!form.watch("nome");
      case 2:
        return !!form.watch("tipoAtividade");
      case 3: {
        // Validate based on activity type
        const tipoAtividade = form.watch("tipoAtividade");
        
        if (tipoAtividade === "Captação") {
          const captacaoVenda = form.watch("captacaoVenda");
          const captacaoAluguel = form.watch("captacaoAluguel");
          const captacaoTipoImovel = form.watch("captacaoTipoImovel");
          const captacaoProprietarioNome = form.watch("captacaoProprietarioNome");
          const captacaoProprietarioTelefone = form.watch("captacaoProprietarioTelefone");
          const captacaoEnderecoImovel = form.watch("captacaoEnderecoImovel");
          
          return (captacaoVenda || captacaoAluguel) && 
                 !!captacaoTipoImovel && 
                 !!captacaoProprietarioNome && 
                 !!captacaoProprietarioTelefone && 
                 !!captacaoEnderecoImovel;
        }
        
        if (tipoAtividade === "Ação de vendas (Oferta ativa)") {
          const acaoVendasProduto = form.watch("acaoVendasProduto");
          if (acaoVendasProduto === "Empreendimento específico") {
            return !!acaoVendasProduto && !!form.watch("acaoVendasEmpreendimento");
          }
          return !!acaoVendasProduto;
        }
        
        if (tipoAtividade === "Treinamento") {
          return !!form.watch("treinamentoTipo");
        }
        
        if (tipoAtividade === "Ligação") {
          const ligacaoQuantidade = form.watch("ligacaoQuantidade");
          const ligacaoFoco = form.watch("ligacaoFoco");
          return ligacaoQuantidade !== undefined && ligacaoQuantidade > 0 && !!ligacaoFoco;
        }
        
        if (tipoAtividade === "Atendimento") {
          const atendimentoTipo = form.watch("atendimentoTipo");
          const atendimentoClienteNome = form.watch("atendimentoClienteNome");
          const atendimentoClienteTelefone = form.watch("atendimentoClienteTelefone");
          const atendimentoEmpreendimento = form.watch("atendimentoEmpreendimento");
          
          if (atendimentoTipo === "Presencial") {
            const atendimentoLocal = form.watch("atendimentoLocal");
            return !!atendimentoTipo && !!atendimentoLocal && 
                   !!atendimentoClienteNome && !!atendimentoClienteTelefone && 
                   !!atendimentoEmpreendimento;
          }
          
          return !!atendimentoTipo && !!atendimentoClienteNome && 
                 !!atendimentoClienteTelefone && !!atendimentoEmpreendimento;
        }
        
        if (tipoAtividade === "Gravação de conteúdo") {
          const conteudoTipo = form.watch("conteudoTipo");
          const conteudoLocal = form.watch("conteudoLocal");
          const conteudoProduto = form.watch("conteudoProduto");
          return !!conteudoTipo && !!conteudoLocal && !!conteudoProduto;
        }
        
        return true;
      }
      case 4:
        return !!form.watch("dataHora");
      case 5:
        // Notas step - no required fields
        return true;
      case 6:
        return form.watch("consentimentoLGPD") && !!turnstileToken;
      default:
        return true;
    }
  };
  
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <ThemeToggle />
      <HelpButton />
      
      <div className="container max-w-2xl mx-auto py-12 px-4 flex-1">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={agendouLogo} 
              alt="Agendou" 
              className="h-32 w-auto object-contain"
            />
          </div>
          <p className="text-muted-foreground">
            Registro de atividades para equipes de corretores
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          
          <Form {...form}>
            <form className="space-y-6">
              {renderStep()}
              
              <WizardNavigation
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isLastStep={currentStep === TOTAL_STEPS - 1}
                canGoNext={canGoNext()}
              />
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
