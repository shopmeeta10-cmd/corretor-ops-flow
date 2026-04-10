import { TEAMS } from "@/data/teams";
import { Badge } from "@/components/ui/badge";

const GerenciarUsuarios = () => {
  const equipes = Object.entries(TEAMS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
        <p className="text-muted-foreground text-sm">Cadastre e gerencie líderes e corretores</p>
      </div>

      <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 border border-border">
        ⚠️ O cadastro completo de usuários será habilitado com Lovable Cloud (banco de dados). 
        Por enquanto, os usuários estão definidos localmente.
      </p>

      {equipes.map(([nome, membros]) => (
        <div key={nome} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold">{nome}</h3>
            <Badge variant="secondary">{membros.length}</Badge>
          </div>
          <div className="space-y-2">
            {membros.map(membro => (
              <div key={membro} className="flex items-center justify-between py-1.5 px-3 rounded bg-muted/30">
                <span className="text-sm">{membro}</span>
                <Badge variant="outline" className="text-xs">Corretor</Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GerenciarUsuarios;
