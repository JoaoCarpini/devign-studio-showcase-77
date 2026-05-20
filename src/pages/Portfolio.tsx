import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Expand, X } from "lucide-react";
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

const pages = Array.from({ length: 17 }, (_, i) =>
  `/portfolio/${i + 1}.jpg`
);

const portfolioView: "deck" | "carousel" = "carousel";

const getPageLabel = (index: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;

const PortfolioCarousel = () => (
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
);

const PortfolioDeck = () => {
  const [activePage, setActivePage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goToPrevious = () => {
    setActivePage((current) => (current === 0 ? pages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActivePage((current) => (current === pages.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="bg-background relative overflow-hidden py-8 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(215_80%_55%/0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-dots opacity-20" />

      <div className="relative px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 flex max-w-[1500px] flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent/80">
            Apresentação completa
          </span>
          <h2 className="mt-2 font-display text-2xl md:text-4xl font-bold text-foreground">
            Portfólio interativo
          </h2>
          <p className="max-w-xl text-sm md:text-base text-muted-foreground">
            Uma página por vez, em destaque, com navegação rápida e leitura confortável.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[1500px]">
          <motion.div
            key={pages[activePage]}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card shadow-2xl shadow-accent/10"
          >
            <div className="absolute left-4 top-4 z-10 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-md">
              {getPageLabel(activePage)}
            </div>
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-colors hover:border-accent"
              aria-label="Abrir em tela cheia"
            >
              <Expand className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-colors hover:border-accent md:inline-flex"
              aria-label="Página anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-colors hover:border-accent md:inline-flex"
              aria-label="Próxima página"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="block aspect-video w-full cursor-zoom-in bg-[#050510]"
            >
              <img
                src={pages[activePage]}
                alt={`Página ${activePage + 1} do portfólio Devign Studio`}
                className="h-full w-full object-contain"
                loading="eager"
              />
            </button>
          </motion.div>

          <div className="mt-4 flex items-center justify-between gap-3 md:hidden">
            <Button type="button" variant="outline" size="sm" onClick={goToPrevious}>
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={goToNext}>
              Próxima <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {pages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActivePage(i)}
                className={`h-8 w-8 rounded-full border text-xs transition-colors ${
                  activePage === i
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
                aria-label={`Ir para página ${i + 1}`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="outline" size="lg">
              <a
                href="/portfolio/Portfolio_Devign.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" /> Baixar portfólio em PDF
              </a>
            </Button>
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">
                Criar um projeto com a Devign <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md">
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
            <span className="rounded-full border border-border bg-card/90 px-4 py-2 text-sm text-foreground">
              {getPageLabel(activePage)}
            </span>
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-colors hover:border-accent"
              aria-label="Fechar tela cheia"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-colors hover:border-accent"
            aria-label="Página anterior"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-colors hover:border-accent"
            aria-label="Próxima página"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="flex h-full items-center justify-center px-4 py-20">
            <img
              src={pages[activePage]}
              alt={`Página ${activePage + 1} do portfólio Devign Studio`}
              className="max-h-full max-w-full rounded-xl border border-border object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

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

      {portfolioView === "deck" ? <PortfolioDeck /> : <PortfolioCarousel />}

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
