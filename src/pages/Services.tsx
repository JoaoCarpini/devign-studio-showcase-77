import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Globe, Zap, Layers, Cog, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: Code2,
    title: "Desenvolvimento de APIs",
    desc: "Criamos APIs RESTful e GraphQL robustas, escaláveis e seguras, prontas para integrar com qualquer sistema.",
    benefits: ["Documentação completa", "Autenticação e segurança", "Alta performance e escalabilidade", "Integração com terceiros"],
    audience: "Empresas que precisam conectar sistemas, criar integrações ou disponibilizar dados de forma segura.",
  },
  {
    icon: Globe,
    title: "Sites Institucionais",
    desc: "Sites modernos, responsivos e otimizados para SEO, que transmitem profissionalismo e credibilidade.",
    benefits: ["SEO otimizado", "Design responsivo", "Carregamento ultrarrápido", "Painel administrativo"],
    audience: "Empresas que precisam de presença digital profissional e querem ser encontradas no Google.",
  },
  {
    icon: Zap,
    title: "Landing Pages",
    desc: "Páginas focadas em conversão, com copywriting persuasivo e design estratégico para gerar leads e vendas.",
    benefits: ["Alta taxa de conversão", "A/B testing integrado", "Analytics avançado", "Formulários inteligentes"],
    audience: "Negócios que precisam capturar leads, lançar produtos ou validar ideias rapidamente.",
  },
  {
    icon: Layers,
    title: "Automações de Processos",
    desc: "Automatize tarefas repetitivas e ganhe eficiência com fluxos inteligentes e integrações poderosas.",
    benefits: ["Redução de custos", "Eliminação de erros manuais", "Integração entre ferramentas", "Dashboards em tempo real"],
    audience: "Empresas que querem escalar operações sem aumentar proporcionalmente a equipe.",
  },
  {
    icon: Cog,
    title: "Soluções Personalizadas",
    desc: "Desenvolvimento sob demanda para desafios únicos. Se você tem um problema, nós criamos a solução.",
    benefits: ["Análise de requisitos dedicada", "Arquitetura sob medida", "Suporte contínuo", "Evolução incremental"],
    audience: "Empresas com necessidades específicas que não encontram solução pronta no mercado.",
  },
];

const Services = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_52%/0.1),transparent_60%)]" />
      <div className="container relative section-padding text-center">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6">
            Nossos Serviços
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
            Tudo que seu negócio precisa para crescer
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
            Soluções completas de tecnologia, do planejamento à entrega.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Services list */}
    <section className="section-padding bg-background">
      <div className="container space-y-20">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}
          >
            {/* Info */}
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <s.icon className="h-7 w-7 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <p className="text-sm text-muted-foreground mb-6">
                <strong className="text-foreground">Para quem é:</strong> {s.audience}
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contato">Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Benefits */}
            <div className={`bg-muted/50 rounded-2xl p-8 border border-border ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
              <h4 className="font-display font-semibold text-foreground mb-6">Benefícios</h4>
              <ul className="space-y-4">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient section-padding">
      <div className="container text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Não encontrou o que precisa?
        </h2>
        <p className="text-primary-foreground/60 mb-8 text-lg">
          Fale conosco e conte sobre o seu desafio. Criamos soluções sob medida para cada cliente.
        </p>
        <Button asChild size="lg" variant="hero">
          <Link to="/contato">Entrar em Contato <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Services;
