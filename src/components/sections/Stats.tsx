'use client'

import { motion, useInView, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/constants'

function parseNumeric(value: string): { number: number; suffix: string; numeric: boolean } {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { number: 0, suffix: value, numeric: false }
  return { number: parseInt(match[1], 10), suffix: match[2], numeric: true }
}

interface CounterProps {
  value: string
  inView: boolean
  reduce: boolean
}

function Counter({ value, inView, reduce }: CounterProps) {
  const { number, suffix, numeric } = parseNumeric(value)
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!numeric || !inView || reduce) return
    const controls = animate(mv, number, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, number, numeric, reduce, mv, rounded])

  if (!numeric) {
    return <span className="text-base sm:text-lg lg:text-xl">{value}</span>
  }

  const shown = reduce ? number : display
  return (
    <span>
      {shown}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section
      aria-label="Statistik"
      className="bg-[#FFFFFF]"
    >
      <div className="container-wide py-16 lg:py-20">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                delay: shouldReduce ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="font-display font-extrabold text-4xl lg:text-5xl text-[#F59E0B] mb-2 tabular-nums">
                <Counter value={stat.value} inView={inView} reduce={shouldReduce} />
              </div>
              <div className="text-sm text-[#6B7280]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
