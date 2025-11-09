export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-border bg-card">
      <div className="container max-w-2xl mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Todos os direitos reservados a Imobiliária R3R. Desenvolvido por{" "}
          <a
            href="https://nsx.tec.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            @
          </a>
        </p>
      </div>
    </footer>
  );
};
