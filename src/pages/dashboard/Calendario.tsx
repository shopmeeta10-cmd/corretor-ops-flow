import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAtividades, type AtividadeRegistro } from "@/stores/mockData";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Calendario = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const atividades = getAtividades(
    user?.role === "corretor" ? user.id : undefined,
    user?.role === "lider" ? user.equipe : undefined
  );

  const atividadesNoDia = atividades.filter(a => {
    if (!selectedDate) return false;
    const d = new Date(a.dataHora);
    return d.toDateString() === selectedDate.toDateString();
  });

  // Dates that have activities
  const datasComAtividade = atividades.map(a => new Date(a.dataHora));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendário</h1>
        <p className="text-muted-foreground text-sm">Visualize seus registros de atividades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-4 flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            modifiers={{ hasActivity: datasComAtividade }}
            modifiersClassNames={{
              hasActivity: "bg-primary/20 font-bold",
            }}
          />
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <h2 className="font-semibold mb-3">
            {selectedDate
              ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
              : "Selecione uma data"}
          </h2>

          {atividadesNoDia.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhuma atividade neste dia.</p>
          ) : (
            <div className="space-y-3">
              {atividadesNoDia.map((a: AtividadeRegistro) => (
                <div key={a.id} className="border border-border rounded-md p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary">{a.tipoAtividade}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(a.dataHora), "HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{a.nome}</p>
                  {a.notas && <p className="text-xs text-muted-foreground mt-1">{a.notas}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
