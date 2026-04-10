import { useAuth } from "@/contexts/AuthContext";
import { getCampanhas, type Campanha } from "@/stores/mockData";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Campanhas = () => {
  const { user } = useAuth();
  const campanhas = getCampanhas(user?.equipe);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Campanhas do Mês</h1>
        <p className="text-muted-foreground text-sm">Campanhas ativas e futuras</p>
      </div>

      {campanhas.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Flame className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhuma campanha cadastrada ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campanhas.map((c: Campanha) => (
            <div key={c.id} className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{c.titulo}</h3>
                <Badge variant={c.ativa ? "default" : "secondary"}>
                  {c.ativa ? "Ativa" : "Encerrada"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{c.descricao}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(c.dataInicio).toLocaleDateString("pt-BR")} - {new Date(c.dataFim).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campanhas;
