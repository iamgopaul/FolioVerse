"use client"

import type { ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
}

export function ParallaxSection({ children, className = "" }: ParallaxSectionProps) {
  return <div className={`relative ${className}`}>{children}</div>
}
