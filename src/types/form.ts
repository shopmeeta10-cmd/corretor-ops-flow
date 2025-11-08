export type ActivityType = 
  | "Atendimento"
  | "Ligação"
  | "Captação"
  | "Treinamento"
  | "Ação de vendas (Oferta ativa)"
  | "Gravação de conteúdo";

export type AtendimentoType = "Presencial" | "Online";
export type ConteudoType = "Gravação" | "Post";
export type ConteudoLocal = "Sede" | "Externo";
export type ProdutoType = "Geral" | "Empreendimento específico";

export interface FormData {
  equipe: string;
  nome: string;
  tipoAtividade: ActivityType;
  
  // Captação
  captacaoVenda?: boolean;
  captacaoAluguel?: boolean;
  captacaoTipoImovel?: string;
  captacaoProprietarioNome?: string;
  captacaoProprietarioTelefone?: string;
  captacaoEnderecoImovel?: string;
  
  // Ação de vendas
  acaoVendasProduto?: ProdutoType;
  acaoVendasEmpreendimento?: string;
  
  // Treinamento
  treinamentoTipo?: string;
  
  // Ligação
  ligacaoQuantidade?: number;
  ligacaoFoco?: string;
  ligacaoAnexos?: File[];
  
  // Atendimento
  atendimentoTipo?: AtendimentoType;
  atendimentoLocal?: string;
  atendimentoClienteNome?: string;
  atendimentoClienteTelefone?: string;
  atendimentoEmpreendimento?: string;
  
  // Gravação de conteúdo
  conteudoTipo?: ConteudoType;
  conteudoLocal?: ConteudoLocal;
  conteudoProduto?: string;
  
  // Campos gerais
  dataHora: Date;
  notas?: string;
  anexos?: File[];
  consentimentoLGPD: boolean;
  cfToken?: string;
}
