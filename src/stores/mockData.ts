// Centralized mock data store (will be replaced by Lovable Cloud later)

export interface Post {
  id: string;
  titulo: string;
  conteudo: string;
  equipe?: string; // null = all teams
  criadoPor: string;
  criadoEm: string;
}

export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  valor: number;
  atual: number;
  equipe?: string;
  criadoPor: string;
  prazo: string;
}

export interface Campanha {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  equipe?: string;
  criadoPor: string;
  ativa: boolean;
}

export interface AtividadeRegistro {
  id: string;
  userId: string;
  nome: string;
  equipe: string;
  tipoAtividade: string;
  dataHora: string;
  notas?: string;
  detalhes: Record<string, unknown>;
}

const STORAGE_KEYS = {
  posts: "agendou_posts",
  metas: "agendou_metas",
  campanhas: "agendou_campanhas",
  atividades: "agendou_atividades",
};

function getStore<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Posts
export const getPosts = (equipe?: string): Post[] => {
  const posts = getStore<Post>(STORAGE_KEYS.posts);
  if (!equipe) return posts;
  return posts.filter(p => !p.equipe || p.equipe === equipe);
};

export const addPost = (post: Omit<Post, "id" | "criadoEm">) => {
  const posts = getStore<Post>(STORAGE_KEYS.posts);
  const newPost = { ...post, id: crypto.randomUUID(), criadoEm: new Date().toISOString() };
  posts.unshift(newPost);
  setStore(STORAGE_KEYS.posts, posts);
  return newPost;
};

export const deletePost = (id: string) => {
  const posts = getStore<Post>(STORAGE_KEYS.posts).filter(p => p.id !== id);
  setStore(STORAGE_KEYS.posts, posts);
};

// Metas
export const getMetas = (equipe?: string): Meta[] => {
  const metas = getStore<Meta>(STORAGE_KEYS.metas);
  if (!equipe) return metas;
  return metas.filter(m => !m.equipe || m.equipe === equipe);
};

export const addMeta = (meta: Omit<Meta, "id">) => {
  const metas = getStore<Meta>(STORAGE_KEYS.metas);
  const newMeta = { ...meta, id: crypto.randomUUID() };
  metas.unshift(newMeta);
  setStore(STORAGE_KEYS.metas, metas);
  return newMeta;
};

export const updateMeta = (id: string, updates: Partial<Meta>) => {
  const metas = getStore<Meta>(STORAGE_KEYS.metas).map(m => m.id === id ? { ...m, ...updates } : m);
  setStore(STORAGE_KEYS.metas, metas);
};

export const deleteMeta = (id: string) => {
  const metas = getStore<Meta>(STORAGE_KEYS.metas).filter(m => m.id !== id);
  setStore(STORAGE_KEYS.metas, metas);
};

// Campanhas
export const getCampanhas = (equipe?: string): Campanha[] => {
  const campanhas = getStore<Campanha>(STORAGE_KEYS.campanhas);
  if (!equipe) return campanhas;
  return campanhas.filter(c => !c.equipe || c.equipe === equipe);
};

export const addCampanha = (campanha: Omit<Campanha, "id">) => {
  const campanhas = getStore<Campanha>(STORAGE_KEYS.campanhas);
  const newCampanha = { ...campanha, id: crypto.randomUUID() };
  campanhas.unshift(newCampanha);
  setStore(STORAGE_KEYS.campanhas, campanhas);
  return newCampanha;
};

export const deleteCampanha = (id: string) => {
  const campanhas = getStore<Campanha>(STORAGE_KEYS.campanhas).filter(c => c.id !== id);
  setStore(STORAGE_KEYS.campanhas, campanhas);
};

// Atividades
export const getAtividades = (userId?: string, equipe?: string): AtividadeRegistro[] => {
  const atividades = getStore<AtividadeRegistro>(STORAGE_KEYS.atividades);
  if (userId) return atividades.filter(a => a.userId === userId);
  if (equipe) return atividades.filter(a => a.equipe === equipe);
  return atividades;
};

export const addAtividade = (atividade: Omit<AtividadeRegistro, "id">) => {
  const atividades = getStore<AtividadeRegistro>(STORAGE_KEYS.atividades);
  const newAtividade = { ...atividade, id: crypto.randomUUID() };
  atividades.unshift(newAtividade);
  setStore(STORAGE_KEYS.atividades, atividades);
  return newAtividade;
};
