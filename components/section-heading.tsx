import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  index?: string
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <Reveal className={cn(centered && "mx-auto max-w-2xl text-center", className)}>
      <div
        className={cn(
          "flex items-end gap-6 border-b border-border pb-6",
          centered ? "flex-col" : "justify-between",
        )}
      >
        <div className={cn(centered ? "max-w-2xl" : "max-w-3xl")}>
          <span className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-primary">
            {!centered && index && <span className="text-gold-gradient font-serif text-base">{index}</span>}
            {eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.08] text-foreground md:text-5xl">
            {title}
          </h2>
        </div>
        {!centered && index && (
          <span aria-hidden className="hidden shrink-0 font-serif text-6xl leading-none text-border md:block">
            {index}
          </span>
        )}
      </div>
      {description && (
        <p
          className={cn(
            "mt-6 text-pretty leading-relaxed text-muted-foreground",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
