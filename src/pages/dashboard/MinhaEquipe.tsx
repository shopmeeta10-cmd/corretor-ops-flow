import { useAuth } from "@/contexts/AuthContext";
import { getAtividades } from "@/stores/mockData";
import { TEAMS } from "@/data/teams";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const MinhaEquipe = () => {
  const { user } = useAuth();
  const equipe = user?.equipe;

  if (!equipe || !(equipe in TEAMS)) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">Nenhuma equipe associada.</p>
      </div>
    );
  }

  const membros = TEAMS[equipe as keyof typeof TEAMS];
  const atividades = getAtividades(undefined, equipe);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Equipe {equipe}</h1>
        <p className="text-muted-foreground text-sm">{membros.length} membros</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {membros.map(membro => {
          const count = atividades.filter(a => a.nome === membro).length;
          return (
            <div key={membro} className="bg-card rounded-lg border border-border p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{membro}</p>
                <p className="text-xs text-muted-foreground">{count} atividades registradas</p>
              </div>
              <Badge variant="secondary">{count}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MinhaEquipe;
