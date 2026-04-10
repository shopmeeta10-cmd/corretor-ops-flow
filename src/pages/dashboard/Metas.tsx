import { useAuth } from "@/contexts/AuthContext";
import { getMetas, type Meta } from "@/stores/mockData";
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Metas = () => {
  const { user } = useAuth();
  const metas = getMetas(user?.equipe);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Metas</h1>
        <p className="text-muted-foreground text-sm">Acompanhe as metas da equipe</p>
      </div>

      {metas.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhuma meta definida ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metas.map((meta: Meta) => {
            const pct = meta.valor > 0 ? Math.round((meta.atual / meta.valor) * 100) : 0;
            return (
              <div key={meta.id} className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{meta.titulo}</h3>
                  <span className="text-sm font-bold text-primary">{pct}%</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{meta.descricao}</p>
                <Progress value={pct} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Atual: {meta.atual}</span>
                  <span>Meta: {meta.valor}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Prazo: {new Date(meta.prazo).toLocaleDateString("pt-BR")}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Metas;
