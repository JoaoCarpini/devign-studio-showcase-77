import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "contato.devignstudio@outlook.com" },
  { icon: Phone, label: "Telefone", value: "+55 (19) 99226-6955" },
  { icon: MapPin, label: "Localização", value: "Porto Ferreira, SP — Brasil" },
];

const serviceOptions = [
  { id: "identidade", label: "Identidade Visual do zero (Logo, cores, manual)" },
  { id: "landing", label: "Landing Page / Site de Alta Performance" },
  { id: "completo", label: "Pacote Completo (Marca + Presença Digital)" },
];

const budgetOptions = [
  { id: "1500-3000", label: "R$ 1.500 a R$ 3.000 — Ideal para Identidade Visual Essencial" },
  { id: "3000-6000", label: "R$ 3.000 a R$ 6.000 — Ideal para Identidade + Landing Page Express" },
  { id: "6000+", label: "Acima de R$ 6.000 — Projetos robustos, automações e branding completo" },
  { id: "consultoria", label: "Ainda não tenho ideia / Gostaria de uma consultoria (mínimo para sites: R$ 2.979,90)" },
];

const deadlineOptions = [
  { id: "urgente", label: "Tenho pressa (menos de 15 dias)" },
  { id: "padrao", label: "Prazo padrão do estúdio (conforme briefing)" },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !objective.trim() || !budget || !deadline || services.length === 0) {
      toast.error("Por favor preencha os campos obrigatórios.");
      return;
    }

    const servicesText = services
      .map((s) => serviceOptions.find((o) => o.id === s)?.label)
      .filter(Boolean)
      .join(", ");
    const budgetText = budgetOptions.find((b) => b.id === budget)?.label ?? "";
    const deadlineText = deadlineOptions.find((d) => d.id === deadline)?.label ?? "";

    const msg = [
      `*Solicitação de Orçamento — Devign Studio*`,
      ``,
      `*Nome:* ${name}`,
      company && `*Empresa:* ${company}`,
      link && `*Instagram/Site:* ${link}`,
      ``,
      `*Serviços de interesse:* ${servicesText}`,
      ``,
      `*Objetivo principal:* ${objective}`,
      ``,
      `*Faixa de investimento:* ${budgetText}`,
      ``,
      `*Prazo desejado:* ${deadlineText}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/5519997054074?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Pré-orçamento enviado! Continue a conversa pelo WhatsApp.");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(210_100%_52%/0.12),transparent_60%)]" />
        <div className="container relative section-padding text-center">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6">
              Contato
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]">
              Vamos conversar sobre seu projeto?
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto">
              Preencha o pré-orçamento abaixo para alinharmos expectativas e iniciarmos seu projeto com clareza.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Solicite um pré-orçamento</h2>
              <p className="text-muted-foreground mb-8">Leva menos de 2 minutos. Responderemos em até 24 horas úteis.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Identificação */}
                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">1. Identificação</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="mb-1.5 block">Nome *</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
                    </div>
                    <div>
                      <Label htmlFor="company" className="mb-1.5 block">Empresa</Label>
                      <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={100} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link" className="mb-1.5 block">Instagram ou site atual</Label>
                    <Input id="link" placeholder="@suaempresa ou https://..." value={link} onChange={(e) => setLink(e.target.value)} maxLength={200} className="focus:placeholder:text-transparent" />
                  </div>
                </fieldset>

                {/* 2. Serviços */}
                <fieldset className="space-y-3">
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">2. O que você precisa hoje? *</legend>
                  {serviceOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={services.includes(opt.id)}
                        onCheckedChange={() => toggleService(opt.id)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                    </label>
                  ))}
                </fieldset>

                {/* 3. Objetivo */}
                <fieldset>
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">3. Qual o objetivo principal? *</legend>
                  <Textarea
                    placeholder='Ex: "Quero passar mais profissionalismo" ou "Preciso vender mais pelo WhatsApp"'
                    rows={3}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    maxLength={500}
                    required
                    className="focus:placeholder:text-transparent"
                  />
                </fieldset>

                {/* 4. Orçamento */}
                <fieldset>
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">4. Faixa de investimento *</legend>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para alinharmos expectativas e entregarmos a melhor tecnologia disponível (React/Tailwind), em qual faixa sua empresa se encontra hoje?
                  </p>
                  <RadioGroup value={budget} onValueChange={setBudget} className="space-y-2">
                    {budgetOptions.map((opt) => (
                      <label
                        key={opt.id}
                        htmlFor={`budget-${opt.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={opt.id} id={`budget-${opt.id}`} className="mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>

                {/* 5. Prazo */}
                <fieldset>
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">5. Prazo desejado *</legend>
                  <RadioGroup value={deadline} onValueChange={setDeadline} className="space-y-2">
                    {deadlineOptions.map((opt) => (
                      <label
                        key={opt.id}
                        htmlFor={`deadline-${opt.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={opt.id} id={`deadline-${opt.id}`} className="mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>

                <Button type="submit" size="lg" variant="hero" className="w-full">
                  Enviar pré-orçamento <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Contact info + WhatsApp */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Informações de contato</h2>
                <p className="text-muted-foreground mb-8">Prefere outro canal? Estamos disponíveis onde você precisar.</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
                      <p className="text-foreground font-medium mt-0.5">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/5519997054074?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground rounded-lg px-6 py-4 transition-colors"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span className="font-display font-semibold text-base">Fale pelo WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
