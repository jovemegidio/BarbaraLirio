"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { MapPin, Monitor, MessageCircle, ArrowDown } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { whatsappLink } from "@/lib/site"

const EASE = [0.16, 1, 0.3, 1] as const

const headlineLead = "Você está dando conta de tudo,"
const headlineAccent = "menos de si"

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = headlineLead.split(" ")

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
  }
  const wordVariant = {
    hidden: { opacity: 0, y: "0.8em", filter: "blur(8px)" },
    show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
  }
  const fade = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
  }

  return (
    <section ref={sectionRef} id="topo" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Imagem de fundo em tela cheia */}
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/barbara-hero.jpg"
          alt="Bárbara Lírio, psicóloga clínica, sorrindo de forma acolhedora"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      </motion.div>

      {/* Scrim para legibilidade do texto claro */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#2c1f22]/90 via-[#2c1f22]/45 to-[#2c1f22]/35"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#2c1f22]/55 to-transparent" />
      {/* Scrim superior para legibilidade do cabeçalho sobre áreas claras da foto */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2c1f22]/75 to-transparent"
      />

      {/* Conteúdo sobreposto */}
      <motion.div
        style={{ y: overlayY, opacity: overlayOpacity }}
        className="relative z-10 flex h-full flex-col justify-end pb-20 md:pb-24"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="mx-auto w-full max-w-6xl px-6"
        >
          <motion.span
            variants={fade}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#f3e7e6]"
          >
            <span className="h-px w-12 bg-gold" />
            Bárbara Lírio · Psicóloga Clínica
          </motion.span>

          <h1 className="mt-6 max-w-4xl text-balance font-serif text-5xl font-medium leading-[1.0] text-[#fffbf8] md:text-7xl lg:text-8xl">
            <span className="sr-only">
              {headlineLead} {headlineAccent}
            </span>
            <span aria-hidden className="inline">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span variants={wordVariant} className="inline-block">
                    {word}
                    {i < words.length - 1 ? "\u00A0" : " "}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span variants={wordVariant} className="inline-block italic text-gold-soft">
                  {`\u00A0${headlineAccent}`}
                </motion.span>
              </span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-[#f3e7e6]/90"
          >
            Um espaço seguro para olhar para o que você sente, compreender sua história e construir formas mais
            saudáveis de viver.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
            <CtaButton href={whatsappLink()} variant="primary" icon={<MessageCircle className="h-4 w-4" />}>
              Conversar pelo WhatsApp
            </CtaButton>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#f3e7e6]/85">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-soft" /> Presencial no Tatuapé
              </li>
              <li className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-gold-soft" /> Online
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: overlayOpacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[#f3e7e6]/70"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
