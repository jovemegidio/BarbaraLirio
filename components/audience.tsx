import { Users, User, HeartHandshake, Sparkles } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const groups = [
  {
    icon: User,
    title: "Adultos",
    text: "Para quem busca lidar com ansiedade, autoconhecimento, relações e momentos de transição na vida.",
  },
  {
    icon: Sparkles,
    title: "Adolescentes",
    text: "Apoio no enfrentamento das pressões, mudanças e descobertas próprias dessa fase da vida.",
  },
  {
    icon: HeartHandshake,
    title: "Casais",
    text: "Espaço para reconstruir a comunicação, fortalecer vínculos e atravessar conflitos com cuidado.",
  },
  {
    icon: Users,
    title: "Quem nunca fez terapia",
    text: "Se você está começando agora, será acolhido sem julgamentos, no seu tempo e respeitando seu ritmo.",
  },
]

export function Audience({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="para-quem" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {!hideHeader && (
          <SectionHeading
            index="04"
            eyebrow="Para quem é"
            title="A terapia é para todos os momentos"
            description="Não é preciso esperar uma crise para buscar ajuda. Cuidar da saúde emocional é um ato de coragem e respeito consigo mesmo."
          />
        )}

        <Stagger
          staggerChildren={0.1}
          className={cn("grid border-t border-border sm:grid-cols-2 lg:grid-cols-4", hideHeader ? "" : "mt-14")}
        >
          {groups.map((group) => {
            const Icon = group.icon
            return (
              <StaggerItem
                key={group.title}
                className="group border-b border-border p-8 transition-colors duration-300 hover:bg-card sm:[&:nth-child(odd)]:border-r lg:[&:not(:nth-child(4n))]:border-r"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-foreground">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.text}</p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
