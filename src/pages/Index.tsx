import { NavLink, Outlet } from "react-router-dom";
import { BookOpenCheck, Calculator, FileText, Home as HomeIcon, PenLine, Timer } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil", icon: HomeIcon, end: true },
  { to: "/maths", label: "Maths", icon: Calculator },
  { to: "/tsq", label: "TSQ", icon: FileText },
  { to: "/dissertation", label: "Dissertation", icon: PenLine },
  { to: "/examen", label: "Examen blanc", icon: Timer },
];

const Layout = () => (
  <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 font-bold">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">CREM 2026</span>
        </NavLink>
        <nav className="flex flex-1 gap-1 overflow-x-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <n.icon className="h-4 w-4" />
              <span className="hidden md:inline">{n.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Outlet />
    </main>
    <footer className="border-t py-6 text-center text-xs text-muted-foreground">
      Outil de révision indépendant, non affilié au Ministère de l'Éducation nationale. Textes et sujets d'entraînement originaux.
    </footer>
  </div>
);

export default Layout;
