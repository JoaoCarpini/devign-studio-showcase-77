import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  { icon: Phone, label: "Telefone", value: "+55 (19) 99226-6955"},
  { icon: MapPin, label: "Localização", value: "Porto Ferreira, SP — Brasil" },
];

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setMessage("");
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
              Preencha o formulário ou entre em contato pelos nossos canais.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Envie sua mensagem</h2>
              <p className="text-muted-foreground mb-8">Responderemos em até 24 horas úteis.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Mensagem</label>
                  <Textarea
                    placeholder="Conte sobre seu projeto ou necessidade..."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    required
                  />
                </div>
                <Button type="submit" size="lg" variant="hero" className="w-full">
                  Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Contact info + WhatsApp */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="space-y-8">
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
