import { TEAMS } from "@/data/teams";
import { getAtividades } from "@/stores/mockData";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardList } from "lucide-react";

const AdminPanel = () => {
  const allAtividades = getAtividades();
  const equipes = Object.entries(TEAMS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground text-sm">Visão geral de todas as equipes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total de Corretores" value={equipes.reduce((acc, [, m]) => acc + m.length, 0)} />
        <StatCard icon={Users} label="Equipes" value={equipes.length} />
        <StatCard icon={ClipboardList} label="Atividades Registradas" value={allAtividades.length} />
        <StatCard icon={ClipboardList} label="Hoje" value={allAtividades.filter(a => new Date(a.dataHora).toDateString() === new Date().toDateString()).length} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Equipes</h2>
        {equipes.map(([nome, membros]) => {
          const count = allAtividades.filter(a => a.equipe === nome).length;
          return (
            <div key={nome} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{nome}</h3>
                <Badge>{membros.length} membros</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{count} atividades registradas</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
