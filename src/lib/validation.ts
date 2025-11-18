import { z } from "zod";

export const formSchema = z.object({
  equipe: z.string().min(1, "Selecione uma equipe"),
  nome: z.string().min(1, "Selecione seu nome"),
  tipoAtividade: z.enum([
    "Atendimento",
    "Ligação",
    "Captação",
    "Treinamento",
    "Ação de vendas (oferta ativa / panfletagem)",
    "Gravação de conteúdo",
    "Reunião de alinhamento"
  ]),
  
  // Captação
  captacaoVenda: z.boolean().optional(),
  captacaoAluguel: z.boolean().optional(),
  captacaoTipoImovel: z.string().optional(),
  captacaoProprietarioNome: z.string().optional(),
  captacaoProprietarioTelefone: z.string().optional(),
  captacaoEnderecoImovel: z.string().optional(),
  
  // Ação de vendas
  acaoVendasTipo: z.enum(["Oferta ativa", "Panfletagem"]).optional(),
  acaoVendasProduto: z.enum(["Geral", "Empreendimento específico"]).optional(),
  acaoVendasEmpreendimento: z.string().optional(),
  acaoVendasLocal: z.string().optional(),
  acaoVendasSolicitaLogistica: z.boolean().optional(),
  acaoVendasMateriais: z.string().optional(),
  
  // Treinamento
  treinamentoTipo: z.string().optional(),
  
  // Ligação
  ligacaoQuantidade: z.number().optional(),
  ligacaoFoco: z.string().optional(),
  ligacaoEmpreendimento: z.string().optional(),
  ligacaoAnexos: z.any().optional(),
  
  // Atendimento
  atendimentoTipo: z.enum(["Presencial", "Online", "Em andamento"]).optional(),
  atendimentoLocal: z.string().optional(),
  atendimentoComLider: z.boolean().optional(),
  atendimentoLider: z.string().optional(),
  atendimentoClienteNome: z.string().optional(),
  atendimentoClienteTelefone: z.string().optional(),
  atendimentoEmpreendimento: z.string().optional(),
  
  // Gravação de conteúdo
  conteudoTipo: z.enum(["Gravação", "Post"]).optional(),
  conteudoLocal: z.enum(["Sede", "Externo"]).optional(),
  conteudoProduto: z.string().optional(),
  
  // Reunião de alinhamento
  reuniaoPauta: z.string().optional(),
  reuniaoLocal: z.string().optional(),
  reuniaoParticipantes: z.string().optional(),
  
  // Campos gerais
  dataHora: z.date(),
  notas: z.string().optional(),
  anexos: z.any().optional(),
  consentimentoLGPD: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos de privacidade"
  }),
  cfToken: z.string().optional(),
});
