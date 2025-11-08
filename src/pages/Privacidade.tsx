import { Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacidade = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Política de Privacidade - LGPD
            </h1>
          </div>
          
          <div className="prose prose-slate max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Coleta de Dados</h2>
              <p className="text-muted-foreground">
                O CorretorOps coleta informações fornecidas voluntariamente pelos usuários através do 
                formulário de registro de atividades, incluindo: nome, equipe, tipo de atividade, 
                dados de clientes/proprietários, datas, notas e anexos.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Finalidade do Tratamento</h2>
              <p className="text-muted-foreground">
                Os dados coletados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Registro e acompanhamento de atividades da equipe</li>
                <li>Gestão operacional e análise de desempenho</li>
                <li>Comunicação interna relacionada às atividades registradas</li>
                <li>Cumprimento de obrigações legais e regulatórias</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground">
                Os dados são compartilhados apenas com sistemas internos de gestão e processamento 
                (webhooks configurados) necessários para o funcionamento da plataforma. Não 
                compartilhamos dados com terceiros não autorizados.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Segurança</h2>
              <p className="text-muted-foreground">
                Implementamos medidas técnicas e organizacionais de segurança, incluindo:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Criptografia de dados em trânsito (HTTPS)</li>
                <li>Verificação anti-spam com Cloudflare Turnstile</li>
                <li>Controle de acesso restrito aos dados</li>
                <li>Monitoramento de atividades suspeitas</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Direitos dos Titulares</h2>
              <p className="text-muted-foreground">
                Conforme a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Retenção de Dados</h2>
              <p className="text-muted-foreground">
                Os dados são mantidos pelo período necessário para as finalidades descritas ou 
                conforme exigido por lei. Após esse período, os dados são eliminados de forma segura.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contato</h2>
              <p className="text-muted-foreground">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em 
                contato através dos canais oficiais da sua imobiliária.
              </p>
            </section>
            
            <section className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
