import { useAuth } from "@/contexts/AuthContext";
import { getPosts, type Post } from "@/stores/mockData";
import { Megaphone } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PostDoDia = () => {
  const { user } = useAuth();
  const posts = getPosts(user?.equipe);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post do Dia</h1>
        <p className="text-muted-foreground text-sm">Comunicados e atualizações</p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhum post publicado ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: Post) => (
            <div key={post.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold">{post.titulo}</h2>
                {post.equipe && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {post.equipe}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{post.conteudo}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Por {post.criadoPor} • {format(new Date(post.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDoDia;
