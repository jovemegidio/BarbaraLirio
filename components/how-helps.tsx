import { Brain, HeartPulse, Compass, Leaf, MessagesSquare, ShieldCheck } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const topics = [
  {
    icon: Brain,
    title: "Ansiedade e preocupação excessiva",
    text: "Compreender os gatilhos e desenvolver formas mais saudáveis de lidar com pensamentos e emoções difíceis.",
  },
  {
    icon: HeartPulse,
    title: "Autoestima e autocrítica",
    text: "Construir uma relação mais gentil consigo mesmo, reduzindo a cobrança e o sentimento de insuficiência.",
  },
  {
    icon: MessagesSquare,
    title: "Conflitos nos relacionamentos",
    text: "Melhorar a comunicação e os vínculos afetivos, familiares e amorosos com mais clareza e respeito.",
  },
  {
    icon: Compass,
    title: "Sensação de estar perdido",
    text: "Reencontrar direção e propósito, alinhando suas escolhas com aquilo que realmente importa para você.",
  },
  {
    icon: Leaf,
    title: "Esgotamento e sobrecarga",
    text: "Cuidar do cansaço emocional de quem sente que precisa dar conta de tudo o tempo todo.",
  },
  {
    icon: ShieldCheck,
    title: "Momentos de transição",
    text: "Apoio em mudanças, lutos, decisões importantes e novas fases da vida.",
  },
]

export function HowHelps({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="como-ajuda" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {!hideHeader && (
          <SectionHeading
            index="03"
            eyebrow="Como a terapia ajuda"
            title="Um espaço para o que você sente"
            description="A terapia pode te apoiar em diferentes momentos e questões. Veja alguns dos temas frequentemente trabalhados em consultório."
          />
        )}

        <Stagger
          staggerChildren={0.09}
          className={cn("grid border-t border-border sm:grid-cols-2 lg:grid-cols-3", hideHeader ? "" : "mt-14")}
        >
          {topics.map((topic) => {
            const Icon = topic.icon
            return (
              <StaggerItem
                key={topic.title}
                className="group border-b border-border p-8 transition-colors duration-300 hover:bg-card sm:[&:nth-child(odd)]:border-r lg:[&:not(:nth-child(3n))]:border-r"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-foreground">{topic.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.text}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
