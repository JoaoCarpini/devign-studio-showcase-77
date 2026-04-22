import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export interface ProjectRecord {
  id?: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  link: string | null;
  image_url: string | null;
  tags: string[];
}

const schema = z.object({
  title: z.string().trim().min(1, "Título obrigatório").max(120),
  category: z.string().trim().min(1, "Categoria obrigatória").max(60),
  problem: z.string().trim().min(1, "Problema obrigatório").max(500),
  solution: z.string().trim().min(1, "Solução obrigatória").max(500),
  link: z.string().trim().url("Link inválido").max(500).or(z.literal("")),
  tags: z.string().max(200),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  initial?: ProjectRecord | null;
}

const ProjectFormDialog = ({ open, onOpenChange, onSaved, initial }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setCategory(initial?.category ?? "");
      setProblem(initial?.problem ?? "");
      setSolution(initial?.solution ?? "");
      setLink(initial?.link ?? "");
      setTags(initial?.tags?.join(", ") ?? "");
      setExistingImage(initial?.image_url ?? null);
      setImageFile(null);
    }
  }, [open, initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ title, category, problem, solution, link, tags });
    if (!parsed.success) {
      toast({ title: "Erro", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let imageUrl = existingImage;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("project-images").upload(path, imageFile);
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("project-images").getPublicUrl(path);
        imageUrl = data.publicUrl;
      }

      const tagsArr = parsed.data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: parsed.data.title,
        category: parsed.data.category,
        problem: parsed.data.problem,
        solution: parsed.data.solution,
        link: parsed.data.link || null,
        image_url: imageUrl,
        tags: tagsArr,
      };

      if (initial?.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", initial.id);
        if (error) throw error;
        toast({ title: "Projeto atualizado" });
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
        toast({ title: "Projeto adicionado" });
      }
      onSaved();
      onOpenChange(false);
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial?.id ? "Editar projeto" : "Novo projeto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image">Foto do projeto</Label>
            <Input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
            {existingImage && !imageFile && (
              <img src={existingImage} alt="" className="mt-2 h-20 rounded object-cover" />
            )}
          </div>
          <div>
            <Label htmlFor="title">Nome</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="problem">Problema</Label>
            <Textarea id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="solution">Solução</Label>
            <Textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="link">Link do projeto</Label>
            <Input id="link" type="url" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
            <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Node.js" />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
