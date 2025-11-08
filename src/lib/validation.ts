import { z } from "zod";

export const formSchema = z.object({
  equipe: z.string().min(1, "Selecione uma equipe"),
  nome: z.string().min(1, "Selecione seu nome"),
  tipoAtividade: z.enum([
    "Atendimento",
    "Ligação",
    "Captação",
    "Treinamento",
    "Ação de vendas (Oferta ativa)",
    "Gravação de conteúdo"
  ]),
  
  // Captação
  captacaoVenda: z.boolean().optional(),
  captacaoAluguel: z.boolean().optional(),
  captacaoTipoImovel: z.string().optional(),
  captacaoProprietarioNome: z.string().optional(),
  captacaoProprietarioTelefone: z.string().optional(),
  captacaoEnderecoImovel: z.string().optional(),
  
  // Ação de vendas
  acaoVendasProduto: z.enum(["Geral", "Empreendimento específico"]).optional(),
  acaoVendasEmpreendimento: z.string().optional(),
  
  // Treinamento
  treinamentoTipo: z.string().optional(),
  
  // Ligação
  ligacaoQuantidade: z.number().optional(),
  ligacaoFoco: z.string().optional(),
  ligacaoAnexos: z.any().optional(),
  
  // Atendimento
  atendimentoTipo: z.enum(["Presencial", "Online"]).optional(),
  atendimentoLocal: z.string().optional(),
  atendimentoClienteNome: z.string().optional(),
  atendimentoClienteTelefone: z.string().optional(),
  atendimentoEmpreendimento: z.string().optional(),
  
  // Gravação de conteúdo
  conteudoTipo: z.enum(["Gravação", "Post"]).optional(),
  conteudoLocal: z.enum(["Sede", "Externo"]).optional(),
  conteudoProduto: z.string().optional(),
  
  // Campos gerais
  dataHora: z.date(),
  notas: z.string().optional(),
  anexos: z.any().optional(),
  consentimentoLGPD: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos de privacidade"
  }),
  cfToken: z.string().optional(),
}).refine((data) => {
  if (data.tipoAtividade === "Captação") {
    return (data.captacaoVenda || data.captacaoAluguel) &&
           data.captacaoTipoImovel &&
           data.captacaoProprietarioNome &&
           data.captacaoProprietarioTelefone &&
           data.captacaoEnderecoImovel;
  }
  return true;
}, {
  message: "Preencha todos os campos obrigatórios de Captação",
  path: ["tipoAtividade"]
}).refine((data) => {
  if (data.tipoAtividade === "Ação de vendas (Oferta ativa)") {
    return data.acaoVendasProduto && 
           (data.acaoVendasProduto === "Geral" || data.acaoVendasEmpreendimento);
  }
  return true;
}, {
  message: "Preencha os campos de Ação de vendas",
  path: ["tipoAtividade"]
}).refine((data) => {
  if (data.tipoAtividade === "Treinamento") {
    return data.treinamentoTipo;
  }
  return true;
}, {
  message: "Preencha o tipo de treinamento",
  path: ["treinamentoTipo"]
}).refine((data) => {
  if (data.tipoAtividade === "Ligação") {
    return data.ligacaoQuantidade && data.ligacaoFoco;
  }
  return true;
}, {
  message: "Preencha os campos de Ligação",
  path: ["tipoAtividade"]
}).refine((data) => {
  if (data.tipoAtividade === "Atendimento") {
    return data.atendimentoTipo &&
           data.atendimentoClienteNome &&
           data.atendimentoClienteTelefone &&
           data.atendimentoEmpreendimento &&
           (data.atendimentoTipo === "Online" || data.atendimentoLocal);
  }
  return true;
}, {
  message: "Preencha todos os campos de Atendimento",
  path: ["tipoAtividade"]
}).refine((data) => {
  if (data.tipoAtividade === "Gravação de conteúdo") {
    return data.conteudoTipo && data.conteudoLocal && data.conteudoProduto;
  }
  return true;
}, {
  message: "Preencha todos os campos de Gravação de conteúdo",
  path: ["tipoAtividade"]
});
