import { Stagger, StaggerItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Primeiro contato",
    text: "Você envia uma mensagem pelo WhatsApp e conversamos sobre suas necessidades e horários disponíveis.",
  },
  {
    number: "02",
    title: "Agendamento",
    text: "Definimos juntos a modalidade (presencial ou online) e o melhor dia para iniciar o acompanhamento.",
  },
  {
    number: "03",
    title: "Sessão inicial",
    text: "Um encontro para nos conhecermos, entender sua história e construir os objetivos da terapia.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    text: "Seguimos o processo no seu ritmo, com encontros regulares e um espaço seguro para o seu crescimento.",
  },
]

export function Process({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="processo" className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {!hideHeader && (
          <SectionHeading index="05" eyebrow="Como funciona" title="Dar o primeiro passo é simples" />
        )}

        <Stagger
          as="ul"
          staggerChildren={0.14}
          className={cn("grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4", hideHeader ? "" : "mt-14")}
        >
          {steps.map((step) => (
            <StaggerItem
              as="li"
              key={step.number}
              className="group relative bg-secondary/40 p-8 transition-colors duration-300 hover:bg-card"
            >
              <span className="font-serif text-5xl text-gold-gradient inline-block transition-transform duration-300 group-hover:-translate-y-1">
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-xl text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
