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
});
