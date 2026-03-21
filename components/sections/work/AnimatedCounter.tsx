import { useState, useEffect } from "react"
import { useMotionValue, animate } from "motion/react"

export function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: 1.5, 
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(latest)
      }
    })
    return controls.stop
  }, [value, count])

  const rounded = value % 1 !== 0 ? displayValue.toFixed(1) : Math.round(displayValue)

  return (
    <span>
      {rounded}{suffix}
    </span>
  )
}
