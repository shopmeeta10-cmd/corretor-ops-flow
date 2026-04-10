import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-6 py-3 flex items-center justify-end">
          <ThemeToggle />
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
