import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpenCheck, Calculator, FileText, Home as HomeIcon, PenLine, Timer } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil", icon: HomeIcon, end: true },
  { to: "/maths", label: "Maths", icon: Calculator },
  { to: "/tsq", label: "TSQ", icon: FileText },
  { to: "/dissertation", label: "Dissertation", short: "Disserta.", icon: PenLine },
  { to: "/examen", label: "Examen blanc", short: "Examen", icon: Timer },
];

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0 }), [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span>CREM 2026</span>
          </NavLink>
          <nav className="ml-auto hidden gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:pt-8 md:pb-10">
        <Outlet />
      </main>

      <footer className="hidden border-t py-6 text-center text-xs text-muted-foreground md:block">
        Outil de révision indépendant, non affilié au Ministère de l'Éducation nationale. Textes et sujets d'entraînement originaux.
      </footer>

      {/* Barre de navigation mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`rounded-full px-3 py-1 ${isActive ? "bg-primary/15" : ""}`}>
                  <n.icon className="h-5 w-5" />
                </span>
                {n.short ?? n.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
