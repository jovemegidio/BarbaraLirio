"use client"

import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { whatsappLink } from "@/lib/site"
import { MapPin, Video } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"

const services = [
  {
    title: "Atendimento Presencial",
    description:
      "Sessões em consultório acolhedor e reservado, pensado para que você se sinta seguro e à vontade durante todo o processo terapêutico.",
    image: "/images/consultorio-real.jpg",
    imagePosition: "object-center",
    alt: "Consultório aconchegante com sofá cinza, poltrona caramelo e mesa de madeira",
    icon: MapPin,
    meta: "Tatuapé · São Paulo",
  },
  {
    title: "Atendimento Online",
    description:
      "Terapia por videochamada com o mesmo cuidado e qualidade do presencial, onde quer que você esteja. Flexibilidade e sigilo garantidos.",
    image: "/images/como-funciona.jpg",
    imagePosition: "object-[center_18%]",
    alt: "Bárbara Lírio em atendimento online por videochamada",
    icon: Video,
    meta: "De onde você estiver",
  },
]

export function Services() {
  return (
    <section id="atendimento" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          eyebrow="Modalidades"
          title="Como podemos cuidar de você"
          description="Escolha o formato que melhor se adapta à sua rotina. Em ambos, o compromisso é o mesmo: oferecer um espaço seguro para o seu desenvolvimento."
        />
      </div>

      <div className="mt-14 flex flex-col">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <Reveal
              key={service.title}
              as="article"
              className="group relative flex h-[78vh] min-h-[460px] w-full items-end overflow-hidden"
            >
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.alt}
                fill
                sizes="100vw"
                className={`object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 ${service.imagePosition}`}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#2c1f22]/92 via-[#2c1f22]/40 to-transparent"
              />
              <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 md:pb-16">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 text-gold-soft">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-soft/40">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em]">{service.meta}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-4xl text-[#fffbf8] md:text-5xl">{service.title}</h3>
                  <p className="mt-4 text-pretty leading-relaxed text-[#f3e7e6]/90">{service.description}</p>
                </div>
              </div>
              <span aria-hidden className="absolute left-6 top-8 font-serif text-6xl text-[#fffbf8]/15 md:left-10">
                0{i + 1}
              </span>
            </Reveal>
          )
        })}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mt-12 flex justify-center">
          <CtaButton href={whatsappLink()} variant="primary">
            Agendar minha sessão
          </CtaButton>
        </Reveal>
      </div>
    </section>
  )
}
