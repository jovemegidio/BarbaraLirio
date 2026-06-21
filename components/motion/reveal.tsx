"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"
import { type ReactNode, useEffect, useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const
// Failsafe: se o IntersectionObserver não disparar a animação por qualquer
// motivo, o conteúdo aparece de qualquer forma após esse tempo, em vez de
// ficar invisível para sempre.
const FAILSAFE_MS = 1200

function useRevealFailsafe() {
  const [forced, setForced] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setForced(true), FAILSAFE_MS)
    return () => clearTimeout(id)
  }, [])
  return forced
}

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
  blur = false,
  once = true,
  amount = 0.1,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion()
  const forced = useRevealFailsafe()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const visible = { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
  const hidden = { opacity: 0, filter: blur ? "blur(10px)" : "blur(0px)", ...offset(direction, distance) }

  return (
    <MotionTag
      className={className}
      initial={hidden}
      animate={forced ? visible : undefined}
      whileInView={forced ? undefined : visible}
      viewport={{ once, amount }}
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
  amount = 0.1,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion()
  const forced = useRevealFailsafe()
  const MotionTag = motion[as]

  if (reduce) {
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
      className={className}
      variants={container}
      initial="hidden"
      animate={forced ? "show" : undefined}
      whileInView={forced ? undefined : "show"}
      viewport={{ once, amount }}
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
  blur = false,
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
