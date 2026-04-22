import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Plus, Pencil, Trash2, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import ProjectFormDialog, { ProjectRecord } from "@/components/ProjectFormDialog";
import { toast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Portfolio = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
      return;
    }
    setProjects((data ?? []) as ProjectRecord[]);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este projeto?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Projeto excluído" });
    load();
  };

  const openNew = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (p: ProjectRecord) => {
    setEditing(p);
    setDialogOpen(true);
  };

  const handleCardClick = (link: string | null | undefined) => {
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
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

      {/* Admin bar */}
      {isAdmin && (
        <div className="bg-card border-b border-border">
          <div className="container py-4 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Logado como admin</span>
            <div className="flex gap-2">
              <Button onClick={openNew} variant="hero" size="sm">
                <Plus className="h-4 w-4" /> Adicionar projeto
              </Button>
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4" /> Sair
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      <section className="section-padding bg-background">
        <div className="container">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-6">Nenhum projeto cadastrado ainda.</p>
              {!user && (
                <Button asChild variant="outline">
                  <Link to="/auth">Entrar para gerenciar</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i % 3}
                  variants={fadeUp}
                  className="bg-card rounded-2xl border border-border overflow-hidden card-hover flex flex-col group relative"
                >
                  {/* Image / category header */}
                  <div
                    onClick={() => handleCardClick(p.link)}
                    className={`h-40 hero-gradient relative flex items-center justify-center overflow-hidden ${p.link ? "cursor-pointer" : ""}`}
                  >
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="font-display text-lg font-bold text-primary-foreground/80 relative z-10">{p.category}</span>
                    )}
                    <ExternalLink className="absolute top-4 right-4 h-4 w-4 text-primary-foreground/60 z-10" />

                    {isAdmin && (
                      <div className="absolute top-2 left-2 flex gap-1 z-20">
                        <button
                          onClick={(e) => { e.stopPropagation(); openEdit(p); }}
                          className="p-1.5 rounded-md bg-card/90 hover:bg-card text-foreground"
                          aria-label="Editar"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(p.id!); }}
                          className="p-1.5 rounded-md bg-card/90 hover:bg-destructive hover:text-destructive-foreground text-foreground"
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => handleCardClick(p.link)}
                    className={`p-6 flex-1 flex flex-col ${p.link ? "cursor-pointer" : ""}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">{p.category}</span>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{p.title}</h3>

                    <div className="mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">Problema</span>
                      <p className="text-sm text-muted-foreground mt-1">{p.problem}</p>
                    </div>

                    <div className="mb-4 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">Solução</span>
                      <p className="text-sm text-muted-foreground mt-1">{p.solution}</p>
                    </div>

                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                        {p.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectFormDialog open={dialogOpen} onOpenChange={setDialogOpen} onSaved={load} initial={editing} />
    </Layout>
  );
};

export default Portfolio;
