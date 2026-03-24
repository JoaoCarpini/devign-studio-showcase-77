import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, className, center = true }: SectionHeadingProps) => (
  <div className={cn("max-w-2xl mb-16", center && "mx-auto text-center", className)}>
    {label && (
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
        {label}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeading;
