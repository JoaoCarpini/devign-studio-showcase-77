import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const pages = Array.from({ length: 18 }, (_, i) =>
  `/portfolio/page-${String(i + 1).padStart(2, "0")}.jpg`
);

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210_100%_52%/0.1),transparent_50%)]" />
        <div className="container relative section-padding text-center">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-accent/80 mb-6"
            >
              Portfólio
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1]"
            >
              Projetos que geram resultados
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-primary-foreground/60 max-w-xl mx-auto"
            >
              Folheie nossa apresentação e descubra como transformamos ideias em
              produtos digitais de alto impacto.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      <section className="section-padding bg-background">
        <div className="container max-w-5xl">
          <Carousel
            opts={{ loop: true, align: "center" }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            className="relative"
          >
            <CarouselContent>
              {pages.map((src, i) => (
                <CarouselItem key={src}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-card"
                  >
                    <img
                      src={src}
                      alt={`Página ${i + 1} do portfólio Devign Studio`}
                      className="w-full h-auto block"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </motion.div>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    {i + 1} / {pages.length}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
          </Carousel>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <a
                href="/portfolio/Portfolio_Devign.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" /> Baixar portfólio em PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Pronto para tirar sua ideia do papel?
          </motion.h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conte-nos sobre seu projeto e receba um orçamento personalizado.
          </p>
          <div className="mt-8">
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">
                Solicitar Orçamento <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
