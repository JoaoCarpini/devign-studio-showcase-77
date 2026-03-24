import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const values = [
  { icon: Target, title: "Missão", desc: "Transformar negócios por meio de soluções digitais inovadoras, acessíveis e de alto impacto." },
  { icon: Eye, title: "Visão", desc: "Ser referência em desenvolvimento digital no Brasil, reconhecidos pela qualidade e inovação." },
  { icon: Heart, title: "Valores", desc: "Excelência, transparência, inovação constante e compromisso com os resultados dos clientes." },
];

const team = [
  { name: "Lucas Ferreira", role: "CEO & Full-Stack Developer", initials: "LF" },
  { name: "Ana Costa", role: "UI/UX Designer", initials: "AC" },
  { name: "Rafael Santos", role: "Backend Engineer", initials: "RS" },
  { name: "Marina Oliveira", role: "Project Manager", initials: "MO" },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(210_100%_52%/0.12),transparent_60%)]" />
      <div className="container relative section-padding text-center">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6">
            Sobre Nós
          </motion.span>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
            Conheça a Devign Studio
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
            Uma equipe apaixonada por tecnologia, design e resultados.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding bg-background">
      <div className="container max-w-3xl mx-auto">
        <SectionHeading label="Nossa História" title="De uma ideia a uma referência em tecnologia" />
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 text-center">
          <p>
            Fundada em 2020, a Devign Studio nasceu da vontade de unir design sofisticado com engenharia de software de ponta. Começamos como um pequeno estúdio e, em poucos anos, nos tornamos parceiros de empresas de diversos segmentos.
          </p>
          <p>
            Acreditamos que tecnologia bem aplicada é a maior vantagem competitiva que um negócio pode ter. Por isso, cada projeto que entregamos é construído com código limpo, design centrado no usuário e estratégia de conversão.
          </p>
        </div>
      </div>
    </section>

    {/* Mission, Vision, Values */}
    <section className="section-padding bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-card rounded-xl p-8 border border-border text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <v.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section-padding bg-background">
      <div className="container">
        <SectionHeading
          label="Equipe"
          title="Quem faz acontecer"
          description="Profissionais especializados e dedicados ao sucesso do seu projeto."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="text-center"
            >
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl font-bold text-accent">{t.initials}</span>
              </div>
              <h4 className="font-display font-semibold text-foreground">{t.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
