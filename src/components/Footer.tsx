import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="font-display text-xl font-bold">
            Devign<span className="text-accent">.</span>Studio
          </span>
          <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
            Transformamos ideias em soluções digitais de alto impacto. Tecnologia com design e estratégia.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/40">Navegação</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {[
              { label: "Home", path: "/" },
              { label: "Sobre Nós", path: "/sobre" },
              { label: "Serviços", path: "/servicos" },
              { label: "Portfólio", path: "/portfolio" },
              { label: "Contato", path: "/contato" },
            ].map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-accent transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/40">Serviços</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li>Desenvolvimento de APIs</li>
            <li>Sites Institucionais</li>
            <li>Landing Pages</li>
            <li>Automações</li>
            <li>Soluções Personalizadas</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/40">Contato</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li>contato.devignstudio@outlook.com</li>
            <li>+55 (19) 99705-4074</li>
            <li>São Paulo, SP — Brasil</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Devign Studio. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 text-xs text-primary-foreground/40">
          <span>Política de Privacidade</span>
          <span>Termos de Uso</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
