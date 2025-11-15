export type ActivityType = 
  | "Atendimento"
  | "Ligação"
  | "Captação"
  | "Treinamento"
  | "Ação de vendas (oferta ativa / panfletagem)"
  | "Gravação de conteúdo"
  | "Reunião de alinhamento";

export type AtendimentoType = "Presencial" | "Online" | "Em andamento";
export type ConteudoType = "Gravação" | "Post";
export type ConteudoLocal = "Sede" | "Externo";
export type ProdutoType = "Geral" | "Empreendimento específico";
export type AcaoVendasType = "Oferta ativa" | "Panfletagem";

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
  acaoVendasTipo?: AcaoVendasType;
  acaoVendasProduto?: ProdutoType;
  acaoVendasEmpreendimento?: string;
  acaoVendasLocal?: string;
  acaoVendasSolicitaLogistica?: boolean;
  acaoVendasMateriais?: string;
  
  // Treinamento
  treinamentoTipo?: string;
  
  // Ligação
  ligacaoQuantidade?: number;
  ligacaoFoco?: string;
  ligacaoEmpreendimento?: string;
  ligacaoAnexos?: File[];
  
  // Atendimento
  atendimentoTipo?: AtendimentoType;
  atendimentoLocal?: string;
  atendimentoComLider?: boolean;
  atendimentoLider?: string;
  atendimentoClienteNome?: string;
  atendimentoClienteTelefone?: string;
  atendimentoEmpreendimento?: string;
  
  // Gravação de conteúdo
  conteudoTipo?: ConteudoType;
  conteudoLocal?: ConteudoLocal;
  conteudoProduto?: string;
  
  // Reunião de alinhamento
  reuniaoPauta?: string;
  reuniaoLocal?: string;
  
  // Campos gerais
  dataHora: Date;
  notas?: string;
  anexos?: File[];
  consentimentoLGPD: boolean;
  cfToken?: string;
}
