import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormData } from "@/types/form";
import { formSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { StepAtividade } from "@/components/wizard/steps/StepAtividade";
import { StepDetalhes } from "@/components/wizard/steps/StepDetalhes";
import { StepDataHora } from "@/components/wizard/steps/StepDataHora";
import { StepNotas } from "@/components/wizard/steps/StepNotas";
import { StepConfirmacao } from "@/components/wizard/steps/StepConfirmacao";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addAtividade } from "@/stores/mockData";
import { compressImages } from "@/lib/imageCompression";

const TOTAL_STEPS = 5; // Activity, Details, DateTime, Notes, Confirmation

const RegistroAtividades = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipe: user?.equipe || "",
      nome: user?.nome || "",
      tipoAtividade: "Atendimento",
      dataHora: new Date(),
      consentimentoLGPD: false,
      captacaoTipoImovel: "",
      captacaoProprietarioNome: "",
      captacaoProprietarioTelefone: "",
      captacaoEnderecoImovel: "",
      acaoVendasEmpreendimento: "",
      acaoVendasLocal: "",
      acaoVendasMateriais: "",
      treinamentoTipo: "",
      ligacaoFoco: "",
      atendimentoLocal: "",
      atendimentoLider: "",
      atendimentoClienteNome: "",
      atendimentoClienteTelefone: "",
      atendimentoEmpreendimento: "",
      conteudoProduto: "",
      reuniaoPauta: "",
      reuniaoLocal: "",
      reuniaoParticipantes: "",
      notas: "",
    },
  });

  // Steps: 0=Atividade, 1=Detalhes, 2=DataHora, 3=Notas, 4=Confirmação
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = ["tipoAtividade"];
        break;
      case 1: {
        const tipoAtividade = form.getValues("tipoAtividade");
        if (tipoAtividade === "Captação") {
          fieldsToValidate = ["captacaoVenda", "captacaoAluguel", "captacaoTipoImovel",
            "captacaoProprietarioNome", "captacaoProprietarioTelefone", "captacaoEnderecoImovel"];
        } else if (tipoAtividade === "Ação de vendas (oferta ativa / panfletagem)") {
          fieldsToValidate = ["acaoVendasTipo"];
          const acaoTipo = form.getValues("acaoVendasTipo");
          if (acaoTipo === "Oferta ativa") {
            fieldsToValidate.push("acaoVendasProduto");
            if (form.getValues("acaoVendasProduto") === "Empreendimento específico") {
              fieldsToValidate.push("acaoVendasEmpreendimento");
            }
          } else if (acaoTipo === "Panfletagem") {
            fieldsToValidate.push("acaoVendasLocal", "acaoVendasSolicitaLogistica");
            if (form.getValues("acaoVendasSolicitaLogistica")) {
              fieldsToValidate.push("acaoVendasMateriais");
            }
          }
        } else if (tipoAtividade === "Treinamento") {
          fieldsToValidate = ["treinamentoTipo"];
        } else if (tipoAtividade === "Ligação") {
          fieldsToValidate = ["ligacaoQuantidade", "ligacaoFoco"];
        } else if (tipoAtividade === "Atendimento") {
          fieldsToValidate = ["atendimentoTipo", "atendimentoComLider", "atendimentoEmpreendimento"];
          if (form.getValues("atendimentoTipo") === "Presencial") fieldsToValidate.push("atendimentoLocal");
          if (form.getValues("atendimentoComLider")) fieldsToValidate.push("atendimentoLider");
        } else if (tipoAtividade === "Gravação de conteúdo") {
          fieldsToValidate = ["conteudoTipo", "conteudoLocal", "conteudoProduto"];
        } else if (tipoAtividade === "Reunião de alinhamento") {
          fieldsToValidate = ["reuniaoPauta", "reuniaoLocal"];
        }
        break;
      }
      case 2:
        fieldsToValidate = ["dataHora"];
        break;
      case 3:
        break;
      case 4:
        fieldsToValidate = ["consentimentoLGPD"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) {
      toast({ title: "Campos obrigatórios", description: "Por favor, preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!turnstileToken) {
      toast({ title: "Verificação necessária", description: "Por favor, complete a verificação de segurança.", variant: "destructive" });
      return;
    }

    const isValid = await form.trigger();
    if (!isValid) {
      toast({ title: "Erro de validação", description: "Por favor, revise os campos do formulário.", variant: "destructive" });
      return;
    }

    try {
      const formData = form.getValues();

      // Save locally
      addAtividade({
        userId: user?.id || "",
        nome: user?.nome || formData.nome,
        equipe: user?.equipe || formData.equipe,
        tipoAtividade: formData.tipoAtividade,
        dataHora: formData.dataHora.toISOString(),
        notas: formData.notas,
        detalhes: formData as unknown as Record<string, unknown>,
      });

      // Compress images
      let compressedAnexos: File[] = [];
      let compressedLigacaoAnexos: File[] = [];
      if (formData.anexos?.length) compressedAnexos = await compressImages(formData.anexos);
      if (formData.ligacaoAnexos?.length) compressedLigacaoAnexos = await compressImages(formData.ligacaoAnexos);

      // Send webhook
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      const multipartData = new FormData();
      const jsonData = { ...formData, cfToken: turnstileToken, timestamp: new Date().toISOString(), anexos: undefined, ligacaoAnexos: undefined };
      multipartData.append('data', JSON.stringify(jsonData));
      compressedAnexos.forEach(f => multipartData.append('anexos', f, f.name));
      compressedLigacaoAnexos.forEach(f => multipartData.append('anexos', f, f.name));

      const promises = [];
      if (webhookUrl) {
        promises.push(fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ ...formData, cfToken: turnstileToken, timestamp: new Date().toISOString() }), mode: "cors" }));
      }
      if (n8nWebhookUrl) {
        promises.push(fetch(n8nWebhookUrl, { method: "POST", body: multipartData, mode: "cors" }));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      toast({ title: "Enviado com sucesso!", description: "Seu registro foi salvo." });
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({ title: "Erro ao enviar", description: "Verifique sua conexão e tente novamente.", variant: "destructive" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepAtividade form={form} />;
      case 1: return <StepDetalhes form={form} />;
      case 2: return <StepDataHora form={form} />;
      case 3: return <StepNotas form={form} />;
      case 4: return <StepConfirmacao form={form} onTurnstileVerify={setTurnstileToken} />;
      default: return null;
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 0: return !!form.watch("tipoAtividade");
      case 1: {
        const tipo = form.watch("tipoAtividade");
        if (tipo === "Captação") {
          return (form.watch("captacaoVenda") || form.watch("captacaoAluguel")) &&
            !!form.watch("captacaoTipoImovel") && !!form.watch("captacaoProprietarioNome") &&
            !!form.watch("captacaoProprietarioTelefone") && !!form.watch("captacaoEnderecoImovel");
        }
        if (tipo === "Ação de vendas (oferta ativa / panfletagem)") {
          const t = form.watch("acaoVendasTipo");
          if (!t) return false;
          if (t === "Oferta ativa") {
            const p = form.watch("acaoVendasProduto");
            return p === "Empreendimento específico" ? !!p && !!form.watch("acaoVendasEmpreendimento") : !!p;
          }
          if (t === "Panfletagem") {
            const l = form.watch("acaoVendasLocal");
            const s = form.watch("acaoVendasSolicitaLogistica");
            if (!l || s === undefined) return false;
            return s ? !!form.watch("acaoVendasMateriais") : true;
          }
        }
        if (tipo === "Treinamento") return !!form.watch("treinamentoTipo");
        if (tipo === "Ligação") return (form.watch("ligacaoQuantidade") ?? 0) > 0 && !!form.watch("ligacaoFoco");
        if (tipo === "Atendimento") {
          const at = form.watch("atendimentoTipo");
          const cl = form.watch("atendimentoComLider");
          if (!at || cl === undefined || !form.watch("atendimentoEmpreendimento")) return false;
          if (at === "Presencial" && !form.watch("atendimentoLocal")) return false;
          if (cl && !form.watch("atendimentoLider")) return false;
          return true;
        }
        if (tipo === "Gravação de conteúdo") return !!form.watch("conteudoTipo") && !!form.watch("conteudoLocal") && !!form.watch("conteudoProduto");
        if (tipo === "Reunião de alinhamento") return !!form.watch("reuniaoPauta") && !!form.watch("reuniaoLocal");
        return true;
      }
      case 2: return !!form.watch("dataHora");
      case 3: return true;
      case 4: return form.watch("consentimentoLGPD") && !!turnstileToken;
      default: return true;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Registro de Atividades</h1>
        <p className="text-muted-foreground text-sm">
          {user?.nome} • {user?.equipe}
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
  );
};

export default RegistroAtividades;
