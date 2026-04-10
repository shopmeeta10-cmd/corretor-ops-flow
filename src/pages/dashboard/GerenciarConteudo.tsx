import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getPosts, addPost, deletePost, getMetas, addMeta, deleteMeta, getCampanhas, addCampanha, deleteCampanha } from "@/stores/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEAMS } from "@/data/teams";

const equipes = Object.keys(TEAMS);

const GerenciarConteudo = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const forceRefresh = () => setRefresh(r => r + 1);

  const isAdmin = user?.role === "admin";
  const equipeFilter = isAdmin ? undefined : user?.equipe;

  const posts = getPosts(equipeFilter);
  const metas = getMetas(equipeFilter);
  const campanhas = getCampanhas(equipeFilter);

  return (
    <div className="space-y-6" key={refresh}>
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Conteúdo</h1>
        <p className="text-muted-foreground text-sm">Crie posts, metas e campanhas para sua equipe</p>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="metas">Metas ({metas.length})</TabsTrigger>
          <TabsTrigger value="campanhas">Campanhas ({campanhas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-4">
          <CriarPostDialog user={user!} isAdmin={isAdmin} onCreated={forceRefresh} />
          {posts.map(p => (
            <div key={p.id} className="bg-card rounded-lg border border-border p-4 flex justify-between items-start">
              <div>
                <p className="font-medium">{p.titulo}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.conteudo}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.equipe || "Todas equipes"}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { deletePost(p.id); forceRefresh(); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="metas" className="space-y-4 mt-4">
          <CriarMetaDialog user={user!} isAdmin={isAdmin} onCreated={forceRefresh} />
          {metas.map(m => (
            <div key={m.id} className="bg-card rounded-lg border border-border p-4 flex justify-between items-start">
              <div>
                <p className="font-medium">{m.titulo} <span className="text-xs text-muted-foreground">({m.atual}/{m.valor})</span></p>
                <p className="text-sm text-muted-foreground">{m.descricao}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { deleteMeta(m.id); forceRefresh(); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="campanhas" className="space-y-4 mt-4">
          <CriarCampanhaDialog user={user!} isAdmin={isAdmin} onCreated={forceRefresh} />
          {campanhas.map(c => (
            <div key={c.id} className="bg-card rounded-lg border border-border p-4 flex justify-between items-start">
              <div>
                <p className="font-medium">{c.titulo}</p>
                <p className="text-sm text-muted-foreground">{c.descricao}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { deleteCampanha(c.id); forceRefresh(); }}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

function CriarPostDialog({ user, isAdmin, onCreated }: { user: { nome: string; equipe?: string }; isAdmin: boolean; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [equipe, setEquipe] = useState(user.equipe || "");

  const handleSave = () => {
    if (!titulo || !conteudo) { toast({ title: "Preencha todos os campos", variant: "destructive" }); return; }
    addPost({ titulo, conteudo, equipe: equipe || undefined, criadoPor: user.nome });
    setTitulo(""); setConteudo(""); setOpen(false); onCreated();
    toast({ title: "Post criado!" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" />Novo Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Novo Post</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={titulo} onChange={e => setTitulo(e.target.value)} /></div>
          <div><Label>Conteúdo</Label><Textarea value={conteudo} onChange={e => setConteudo(e.target.value)} rows={4} /></div>
          {isAdmin && (
            <div><Label>Equipe (vazio = todas)</Label>
              <Select value={equipe} onValueChange={setEquipe}>
                <SelectTrigger><SelectValue placeholder="Todas equipes" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todas equipes</SelectItem>
                  {equipes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleSave} className="w-full">Publicar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CriarMetaDialog({ user, isAdmin, onCreated }: { user: { nome: string; equipe?: string }; isAdmin: boolean; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [prazo, setPrazo] = useState("");
  const [equipe, setEquipe] = useState(user.equipe || "");

  const handleSave = () => {
    if (!titulo || !valor || !prazo) { toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" }); return; }
    addMeta({ titulo, descricao, valor: Number(valor), atual: 0, equipe: equipe || undefined, criadoPor: user.nome, prazo });
    setTitulo(""); setDescricao(""); setValor(""); setPrazo(""); setOpen(false); onCreated();
    toast({ title: "Meta criada!" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Nova Meta</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Nova Meta</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={titulo} onChange={e => setTitulo(e.target.value)} /></div>
          <div><Label>Descrição</Label><Textarea value={descricao} onChange={e => setDescricao(e.target.value)} rows={2} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Valor da meta</Label><Input type="number" value={valor} onChange={e => setValor(e.target.value)} /></div>
            <div><Label>Prazo</Label><Input type="date" value={prazo} onChange={e => setPrazo(e.target.value)} /></div>
          </div>
          {isAdmin && (
            <div><Label>Equipe</Label>
              <Select value={equipe} onValueChange={setEquipe}>
                <SelectTrigger><SelectValue placeholder="Todas equipes" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todas equipes</SelectItem>
                  {equipes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleSave} className="w-full">Criar Meta</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CriarCampanhaDialog({ user, isAdmin, onCreated }: { user: { nome: string; equipe?: string }; isAdmin: boolean; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [equipe, setEquipe] = useState(user.equipe || "");

  const handleSave = () => {
    if (!titulo || !dataInicio || !dataFim) { toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" }); return; }
    addCampanha({ titulo, descricao, dataInicio, dataFim, equipe: equipe || undefined, criadoPor: user.nome, ativa: true });
    setTitulo(""); setDescricao(""); setDataInicio(""); setDataFim(""); setOpen(false); onCreated();
    toast({ title: "Campanha criada!" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Nova Campanha</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Nova Campanha</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Título</Label><Input value={titulo} onChange={e => setTitulo(e.target.value)} /></div>
          <div><Label>Descrição</Label><Textarea value={descricao} onChange={e => setDescricao(e.target.value)} rows={2} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Data início</Label><Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} /></div>
            <div><Label>Data fim</Label><Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} /></div>
          </div>
          {isAdmin && (
            <div><Label>Equipe</Label>
              <Select value={equipe} onValueChange={setEquipe}>
                <SelectTrigger><SelectValue placeholder="Todas equipes" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Todas equipes</SelectItem>
                  {equipes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button onClick={handleSave} className="w-full">Criar Campanha</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GerenciarConteudo;
