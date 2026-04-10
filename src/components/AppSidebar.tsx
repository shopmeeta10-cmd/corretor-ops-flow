import {
  ClipboardList, Calendar, Megaphone, Target, Flame,
  Users, Settings, LogOut, ChevronLeft, ChevronRight, LayoutDashboard
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import agendouLogo from "@/assets/agendou-logo.png";

const corretorLinks = [
  { to: "/dashboard", icon: ClipboardList, label: "Registro de Atividades", end: true },
  { to: "/dashboard/calendario", icon: Calendar, label: "Calendário" },
  { to: "/dashboard/post-do-dia", icon: Megaphone, label: "Post do Dia" },
  { to: "/dashboard/metas", icon: Target, label: "Metas" },
  { to: "/dashboard/campanhas", icon: Flame, label: "Campanhas do Mês" },
];

const liderLinks = [
  { to: "/dashboard/equipe", icon: Users, label: "Minha Equipe" },
  { to: "/dashboard/gerenciar-conteudo", icon: Settings, label: "Gerenciar Conteúdo" },
];

const adminLinks = [
  { to: "/dashboard/admin", icon: LayoutDashboard, label: "Painel Admin" },
  { to: "/dashboard/admin/usuarios", icon: Users, label: "Gerenciar Usuários" },
];

export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const showLider = user.role === "lider" || user.role === "admin";
  const showAdmin = user.role === "admin";

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && <img src={agendouLogo} alt="Agendou" className="h-8 w-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-medium truncate">{user.nome}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}{user.equipe ? ` • ${user.equipe}` : ""}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        <SidebarSection title="Principal" collapsed={collapsed} links={corretorLinks} />
        {showLider && <SidebarSection title="Líder" collapsed={collapsed} links={liderLinks} />}
        {showAdmin && <SidebarSection title="Administração" collapsed={collapsed} links={adminLinks} />}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-border">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

function SidebarSection({ title, collapsed, links }: {
  title: string;
  collapsed: boolean;
  links: { to: string; icon: React.ElementType; label: string; end?: boolean }[];
}) {
  return (
    <div className="mb-2">
      {!collapsed && (
        <p className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
      )}
      {links.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-2"
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}
    </div>
  );
}
