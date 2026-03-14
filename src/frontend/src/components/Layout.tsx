import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BarChart2, DollarSign, Home, User } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/earnings", icon: DollarSign, label: "Earnings" },
  { to: "/analytics", icon: BarChart2, label: "Analytics" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function Layout() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isOrderPage = pathname.startsWith("/order/");

  return (
    <div className="app-shell">
      <main className={cn("bottom-nav-safe", isOrderPage && "pb-0")}>
        <Outlet />
      </main>
      {!isOrderPage && (
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-50"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-around h-16">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive =
                pathname === to || (to !== "/" && pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-4 py-2 text-xs transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
