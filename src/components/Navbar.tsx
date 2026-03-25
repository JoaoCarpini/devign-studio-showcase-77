import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(232_60%_8%/0.95)] backdrop-blur-xl border-b border-white/10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Devign Studio" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === item.path ? "text-accent" : "text-white/60"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="hero">
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-[hsl(232_60%_8%)] border-b border-white/10 px-6 pb-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                "block text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-accent" : "text-white/60"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="hero" className="w-full">
            <Link to="/contato" onClick={() => setOpen(false)}>Solicitar Orçamento</Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
