export const TEAMS = {
  "Caçadores": [
    "Adelmar Da Silva Santos",
    "André Pereira Leal",
    "Cinthya Helena Ferreira Martins",
    "Elen Taina Carvalho Rego",
    "Florindo Stanley Marques Oliveira",
    "Maria Juliana Rodrigues Mendes",
    "Matheus Aparecido Sousa Da Silva",
    "Pablo Cauan Gomes de Menezes",
    "Patricia Costa da Silva",
    "Samuel Maximus Gomes de Sousa"
  ],
  "Tubarão": [
    "Diego Italo Santos Sousa",
    "Emanuella Lima dos Santos",
    "Leticia Hellen Carvalho de Oliveira",
    "Matheus da Conceição de Oliveira",
    "Maycom Lima Rodrigues",
    "Mychelle Alves de Oliveira"
  ],
  "Aliança": [
    "Ângela De Sales Cunha Xavier",
    "Mirella Valentina Chaves Oliviera",
    "Lucas Faria Da Silva",
    "Carliane Chaves Alves",
    "Éllen Eduarda Ávila Carvalho"
  ],
  "Magnatas": [
    "Noely Fernandes",
    "Jose Reinaldo Da Silva Queiroz",
    "Francisca Dayane Ozorio Da Paz",
    "Andre Luis Prudencio De Sousa",
    "Dalila Sampaio Guimarães Siqueira"
  ]
} as const;

export type TeamName = keyof typeof TEAMS;
export type MemberName = typeof TEAMS[TeamName][number];
