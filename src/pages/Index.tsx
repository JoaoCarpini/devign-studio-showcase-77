import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Globe, Zap, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import logo from "@/assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const services = [
  { icon: Code2, title: "APIs Robustas", desc: "Integrações escaláveis e seguras para conectar seus sistemas." },
  { icon: Globe, title: "Sites Institucionais", desc: "Presença digital profissional que transmite credibilidade." },
  { icon: Zap, title: "Landing Pages", desc: "Páginas otimizadas para conversão e resultados rápidos." },
  { icon: Layers, title: "Automações", desc: "Processos automatizados para ganhar eficiência e escala." },
];

const stats = [
  { value: "Foco em resultados", label: "Projetos pensados para gerar valor real" },
  { value: "Qualidade acima de volume", label: "Cada projeto tratado com atenção total" },
  { value: "Tecnologia moderna", label: "Utilizamos as melhores ferramentas do mercado" },
  { value: "Atendimento próximo", label: "Suporte direto e comunicação rápida" },
];

const differentials = [
  "Código limpo e escalável",
  "Design centrado no usuário",
  "Entrega dentro do prazo",
  "Suporte contínuo pós-entrega",
  "Tecnologias de ponta",
  "Foco em resultados mensuráveis",
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(210_100%_52%/0.15),transparent_60%)]" />
      <div className="container relative section-padding text-center">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} custom={0} className="flex justify-center mb-8">
            <img src={logo} alt="Devign Studio" className="h-20 md:h-28 w-auto" />
          </motion.div>
          <motion.span variants={fadeUp} custom={0.5} className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6">
            Desenvolvimento & Design Digital
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
            Transformamos ideias em{" "}
            <span className="text-gradient">soluções digitais</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg md:text-xl text-primary-foreground/60 max-w-xl mx-auto leading-relaxed">
            Desenvolvemos APIs, sites, landing pages e automações que impulsionam o crescimento do seu negócio.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="hero">
              <Link to="/contato">Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="hero-outline">
              <Link to="/portfolio">Ver Projetos</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <section className="section-padding bg-background">
      <div className="container">
        <SectionHeading
          label="Serviços"
          title="Soluções sob medida para seu negócio"
          description="Do conceito à implementação, entregamos tecnologia que gera resultados reais."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="group bg-card rounded-xl p-8 card-hover border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <s.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link to="/servicos">Ver todos os serviços <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Differentials */}
    <section className="section-padding bg-muted/50">
      <div className="container">
        <SectionHeading
          label="Por que nos escolher"
          title="Diferenciais que fazem a diferença"
          description="Nosso compromisso é entregar excelência em cada projeto."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {differentials.map((d, i) => (
            <motion.div
              key={d}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="flex items-center gap-3 bg-card rounded-lg p-5 border border-border"
            >
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{d}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats / Social Proof */}
    <section className="hero-gradient section-padding">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="font-display text-lg md:text-xl font-bold text-primary-foreground">{s.value}</div>
              <div className="mt-2 text-sm text-primary-foreground/50 leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="section-padding bg-background">
      <div className="container text-center max-w-2xl mx-auto">
        <SectionHeading
          label="Vamos conversar"
          title="Pronto para transformar seu negócio?"
          description="Entre em contato e receba uma proposta personalizada para o seu projeto."
        />
        <Button asChild size="lg" variant="hero">
          <Link to="/contato">Solicitar Orçamento <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Index;
