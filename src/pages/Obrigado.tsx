import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Obrigado = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-sm border border-border p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Registro enviado com sucesso!
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Sua atividade foi registrada e enviada para processamento. 
          Obrigado por manter nossos registros atualizados!
        </p>
        
        <Button onClick={() => navigate("/")} className="gap-2">
          <Home className="h-4 w-4" />
          Registrar nova atividade
        </Button>
      </div>
    </div>
  );
};

export default Obrigado;
