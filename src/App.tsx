import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegistroAtividades from "./pages/dashboard/RegistroAtividades";
import Calendario from "./pages/dashboard/Calendario";
import PostDoDia from "./pages/dashboard/PostDoDia";
import Metas from "./pages/dashboard/Metas";
import Campanhas from "./pages/dashboard/Campanhas";
import MinhaEquipe from "./pages/dashboard/MinhaEquipe";
import GerenciarConteudo from "./pages/dashboard/GerenciarConteudo";
import AdminPanel from "./pages/dashboard/AdminPanel";
import GerenciarUsuarios from "./pages/dashboard/GerenciarUsuarios";
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<RegistroAtividades />} />
              <Route path="calendario" element={<Calendario />} />
              <Route path="post-do-dia" element={<PostDoDia />} />
              <Route path="metas" element={<Metas />} />
              <Route path="campanhas" element={<Campanhas />} />
              <Route path="equipe" element={
                <ProtectedRoute allowedRoles={["lider", "admin"]}>
                  <MinhaEquipe />
                </ProtectedRoute>
              } />
              <Route path="gerenciar-conteudo" element={
                <ProtectedRoute allowedRoles={["lider", "admin"]}>
                  <GerenciarConteudo />
                </ProtectedRoute>
              } />
              <Route path="admin" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="admin/usuarios" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <GerenciarUsuarios />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/obrigado" element={<Obrigado />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
