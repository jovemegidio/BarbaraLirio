"use client"

import { motion, useInView, useReducedMotion, type Variants } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

// Fail-safe: se o IntersectionObserver não disparar (acontece dentro do
// iframe do preview), revelamos o conteúdo mesmo assim após este tempo,
// para que nada fique permanentemente invisível (em branco).
const FAILSAFE_MS = 1100

type Direction = "up" | "down" | "left" | "right" | "none"

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance }
    case "down":
      return { y: -distance }
    case "left":
      return { x: distance }
    case "right":
      return { x: -distance }
    default:
      return {}
  }
}

/** Dispara quando o elemento entra na viewport, com fallback por timeout. */
function useReveal(amount: number, once = true) {
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once, amount })
  const [failsafe, setFailsafe] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), FAILSAFE_MS)
    return () => clearTimeout(t)
  }, [])

  return { ref, show: inView || failsafe }
}

// O conteúdo nasce visível (sem depender da animação ter montado). Só depois
// que o React confirma ter montado no cliente é que trocamos para a versão
// animada — assim, se a hidratação inicial falhar por qualquer motivo nunca
// fica permanentemente invisível, só perde o efeito de entrada.
function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

interface RevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  distance?: number
  delay?: number
  duration?: number
  blur?: boolean
  once?: boolean
  amount?: number
  as?: "div" | "section" | "li" | "span" | "article"
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.9,
  blur = true,
  once = true,
  amount = 0.15,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const MotionTag = motion[as]
  const { ref, show } = useReveal(amount, once)

  if (reduce || !mounted) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, filter: blur ? "blur(10px)" : "blur(0px)", ...offset(direction, distance) }}
      animate={show ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 } : undefined}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
  once?: boolean
  amount?: number
  as?: "div" | "ul" | "section"
}

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.1,
  once = true,
  amount = 0.12,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const MotionTag = motion[as]
  const { ref, show } = useReveal(amount, once)

  if (reduce || !mounted) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren, staggerChildren },
    },
  }

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={show ? "show" : "hidden"}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: Direction
  distance?: number
  duration?: number
  blur?: boolean
  as?: "div" | "li" | "article" | "span"
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 26,
  duration = 0.8,
  blur = true,
  as = "div",
}: StaggerItemProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const item: Variants = {
    hidden: { opacity: 0, filter: blur ? "blur(8px)" : "blur(0px)", ...offset(direction, distance) },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: { duration, ease: EASE },
    },
  }

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  )
}
