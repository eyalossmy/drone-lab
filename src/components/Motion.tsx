import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

/** עוטף כל דף — כניסה ויציאה רכות בין מסכים */
export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
      transition={{ duration: 0.55, ease }}
    >
      {children}
    </motion.main>
  )
}

/** אלמנט שעולה פנימה כשהוא נכנס למסך */
export function Reveal({ delay = 0, children, ...rest }: { delay?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const rise = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
}
