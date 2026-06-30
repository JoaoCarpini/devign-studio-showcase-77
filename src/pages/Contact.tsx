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
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "contato.devignstudio@outlook.com" },
  { icon: Phone, label: "Telefone", value: "+55 (19) 99226-6955" },
  { icon: MapPin, label: "Localização", value: "Porto Ferreira, SP - Brasil" },
];

const serviceOptions = [
  { id: "identidade", label: "Identidade Visual do zero (Logo, cores, manual)" },
  { id: "site", label: "Site institucional profissional" },
  { id: "landing", label: "Landing Page de alta conversão" },
  { id: "api", label: "Desenvolvimento de APIs e integrações" },
  { id: "automacoes", label: "Automações de processos e fluxos internos" },
  { id: "sistema", label: "Sistema personalizado sob medida" },
  { id: "completo", label: "Solução integrada de marca e presença digital" },
  { id: "consultoria", label: "Ainda não sei exatamente, preciso de orientação" },
];

const priorityOptions = [
  { id: "sem-urgencia", label: "Projeto sem urgência imediata" },
  { id: "proximas-semanas", label: "Quero iniciar nas próximas semanas" },
  { id: "prioridade", label: "Tenho urgência e quero prioridade" },
  { id: "quanto-antes", label: "Preciso de uma solução o quanto antes" },
];

const contactPreferenceOptions = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "E-mail" },
  { id: "reuniao-online", label: "Reunião online" },
  { id: "tanto-faz", label: "Não tenho preferência de contato" },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [objective, setObjective] = useState("");
  const [priority, setPriority] = useState("");
  const [contactPreference, setContactPreference] = useState("");

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !objective.trim() ||
      !priority ||
      !contactPreference ||
      services.length === 0
    ) {
      toast.error("Por favor preencha os campos obrigatórios.");
      return;
    }

    const servicesText = services
      .map((s) => serviceOptions.find((o) => o.id === s)?.label)
      .filter(Boolean)
      .join(", ");
    const priorityText =
      priorityOptions.find((item) => item.id === priority)?.label ?? "";
    const contactPreferenceText =
      contactPreferenceOptions.find((item) => item.id === contactPreference)
        ?.label ?? "";

    const msg = [
      `*Solicitação de Projeto - Devign Studio*`,
      ``,
      `*Nome:* ${name}`,
      company && `*Empresa:* ${company}`,
      link && `*Instagram/Site:* ${link}`,
      ``,
      `*Serviços de interesse:* ${servicesText}`,
      ``,
      `*Objetivo principal:* ${objective}`,
      ``,
      `*Nível de prioridade:* ${priorityText}`,
      ``,
      `*Preferência de contato:* ${contactPreferenceText}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/5519992266955?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Solicitação enviada! Continue a conversa pelo WhatsApp.");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(210_100%_52%/0.12),transparent_60%)]" />
        <div className="container relative section-padding text-center">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6"
            >
              Contato
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]"
            >
              Vamos conversar sobre seu projeto?
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto"
            >
              Preencha o briefing abaixo para alinharmos expectativas e iniciarmos seu projeto com clareza.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="pt-16 md:pt-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactInfo.map((c, i) => (
              <motion.div
                key={c.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </span>
                  <p className="text-foreground font-medium mt-0.5 text-sm">
                    {c.label === "Email" ? (
                      <span className="whitespace-nowrap">{c.value}</span>
                    ) : (
                      c.value
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Solicite uma análise do projeto
              </h2>
              <p className="text-muted-foreground">
                Leva menos de 2 minutos. Responderemos em até 24 horas úteis.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Identificação */}
                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
                    1. Identificação
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="mb-1.5 block">
                        Nome *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="mb-1.5 block">
                        Empresa
                      </Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        maxLength={100}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link" className="mb-1.5 block">
                      Instagram ou site atual
                    </Label>
                    <Input
                      id="link"
                      placeholder="@suaempresa ou https://..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      maxLength={200}
                      className="focus:placeholder:text-transparent"
                    />
                  </div>
                </fieldset>

                {/* 2. Serviços */}
                <fieldset className="space-y-3">
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
                    2. O que você precisa hoje? *
                  </legend>
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
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
                    3. Qual o objetivo principal? *
                  </legend>
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

                {/* 4. Nível de Prioridade */}
                <fieldset>
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                    4. Nível de Prioridade *
                  </legend>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione o nível de urgência do seu projeto para alinharmos planejamento,
                    disponibilidade e execução.
                  </p>
                  <RadioGroup value={priority} onValueChange={setPriority} className="space-y-2">
                    {priorityOptions.map((opt) => (
                      <label
                        key={opt.id}
                        htmlFor={`priority-${opt.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={opt.id} id={`priority-${opt.id}`} className="mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>

                {/* 5. Preferência de Contato */}
                <fieldset>
                  <legend className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                    5. Como prefere o contato? *
                  </legend>
                  <p className="text-sm text-muted-foreground mb-4">
                    Escolha a melhor forma para iniciarmos o atendimento.
                  </p>
                  <RadioGroup
                    value={contactPreference}
                    onValueChange={setContactPreference}
                    className="space-y-2"
                  >
                    {contactPreferenceOptions.map((opt) => (
                      <label
                        key={opt.id}
                        htmlFor={`contact-preference-${opt.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem
                          value={opt.id}
                          id={`contact-preference-${opt.id}`}
                          className="mt-0.5"
                        />
                        <span className="text-sm text-foreground leading-snug">{opt.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>

                <Button type="submit" size="lg" variant="hero" className="w-full">
                  Enviar solicitação <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground mb-3">Prefere conversar agora mesmo?</p>
              <a
                href="https://wa.me/5519992266955?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground rounded-lg px-8 py-4 transition-colors"
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
