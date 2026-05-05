import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
          Devign<span className="text-accent"></span>Studio
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === item.path ? "text-accent" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <Button onClick={signOut} size="sm" variant="outline">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link to="/auth">Entrar</Link>
            </Button>
          )}
          <Button asChild size="sm" variant="hero">
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-card border-b border-border px-6 pb-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                "block text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-accent" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <Button onClick={() => { signOut(); setOpen(false); }} size="sm" variant="outline" className="w-full">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to="/auth" onClick={() => setOpen(false)}>Entrar</Link>
            </Button>
          )}
          <Button asChild size="sm" variant="hero" className="w-full">
            <Link to="/contato" onClick={() => setOpen(false)}>Solicitar Orçamento</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
