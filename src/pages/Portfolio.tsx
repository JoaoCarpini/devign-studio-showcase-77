import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const projects = [
  {
    title: "FinFlow — Plataforma Financeira",
    category: "API + Dashboard",
    problem: "Gestão financeira fragmentada em planilhas sem integração entre setores.",
    solution: "Desenvolvemos uma API completa e dashboard em tempo real que centralizou toda a operação financeira.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "VetCare — Clínica Veterinária",
    category: "Site Institucional",
    problem: "Clínica sem presença digital, perdendo clientes para concorrentes com sites modernos.",
    solution: "Criamos um site responsivo com agendamento online, blog e SEO otimizado, aumentando leads em 180%.",
    tags: ["Next.js", "Tailwind", "CMS"],
  },
  {
    title: "RapidLaunch — Startup SaaS",
    category: "Landing Page",
    problem: "Precisavam validar uma ideia de produto rapidamente e captar early-adopters.",
    solution: "Landing page de alta conversão com copy persuasivo e integração com email marketing. 12% de conversão.",
    tags: ["React", "Framer Motion", "Analytics"],
  },
  {
    title: "LogiTrack — Logística",
    category: "Automação",
    problem: "Processos manuais de rastreamento causavam atrasos e erros na cadeia de entrega.",
    solution: "Automação completa do tracking com integrações de transportadoras e notificações em tempo real.",
    tags: ["Python", "APIs REST", "Webhooks"],
  },
  {
    title: "EduConnect — Plataforma EAD",
    category: "Solução Personalizada",
    problem: "Instituição de ensino sem plataforma própria, dependendo de soluções genéricas e caras.",
    solution: "Plataforma EAD sob medida com videoaulas, quizzes, certificados e painel administrativo completo.",
    tags: ["React", "Node.js", "AWS S3"],
  },
  {
    title: "GastroHub — Rede de Restaurantes",
    category: "Site + Automação",
    problem: "Rede com 15 unidades sem sistema unificado de cardápio digital e pedidos.",
    solution: "Sistema centralizado de cardápio digital com painel por unidade e integração com iFood e Rappi.",
    tags: ["TypeScript", "Supabase", "PWA"],
  },
];

const Portfolio = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210_100%_52%/0.1),transparent_50%)]" />
      <div className="container relative section-padding text-center">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6">
            Portfólio
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
            Projetos que geram resultados
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
            Conheça alguns dos cases de sucesso que entregamos para nossos clientes.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Projects */}
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i % 3}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-border overflow-hidden card-hover flex flex-col"
            >
              {/* Color header */}
              <div className="h-40 hero-gradient relative flex items-center justify-center">
                <span className="font-display text-lg font-bold text-primary-foreground/80">{p.category}</span>
                <ExternalLink className="absolute top-4 right-4 h-4 w-4 text-primary-foreground/30" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{p.title}</h3>

                <div className="mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Problema</span>
                  <p className="text-sm text-muted-foreground mt-1">{p.problem}</p>
                </div>

                <div className="mb-4 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Solução</span>
                  <p className="text-sm text-muted-foreground mt-1">{p.solution}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Portfolio;
