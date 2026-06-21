import { asset } from "@/lib/asset"
import { Reveal } from "@/components/motion/reveal"

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url(${asset("/brand/pattern-transp.png")})`, backgroundSize: "240px" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <span className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary/40" />
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-5xl font-medium leading-[1.04] text-foreground md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
