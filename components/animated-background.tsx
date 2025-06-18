"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  backgroundImage?: string | null
  variant?: "tech" | "business" | "creative" | "minimal" | "geometric" | "circuit"
}

export function AnimatedBackground({ backgroundImage, variant = "tech" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const isDark = resolvedTheme === "dark"

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Different background variants
    const createBackground = () => {
      switch (variant) {
        case "tech":
          return createTechBackground(ctx, canvas, isDark)
        case "business":
          return createBusinessBackground(ctx, canvas, isDark)
        case "creative":
          return createCreativeBackground(ctx, canvas, isDark)
        case "minimal":
          return createMinimalBackground(ctx, canvas, isDark)
        case "geometric":
          return createGeometricBackground(ctx, canvas, isDark)
        case "circuit":
          return createCircuitBackground(ctx, canvas, isDark)
        default:
          return createTechBackground(ctx, canvas, isDark)
      }
    }

    const animate = createBackground()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }

    function createTechBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const particles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number
        color: string
        type: "node" | "data"
      }> = []

      // Create tech particles with theme-aware colors
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: isDark ? Math.random() * 0.4 + 0.2 : Math.random() * 0.3 + 0.1,
          color: isDark ? (Math.random() > 0.5 ? "#3b82f6" : "#06b6d4") : Math.random() > 0.5 ? "#1e40af" : "#0891b2",
          type: Math.random() > 0.7 ? "data" : "node",
        })
      }

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw grid pattern with theme-aware colors
        ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(30, 64, 175, 0.1)"
        ctx.lineWidth = 1
        const gridSize = 50
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Draw connections with theme-aware opacity
        ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.25)" : "rgba(30, 64, 175, 0.15)"
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              ctx.globalAlpha = ((150 - distance) / 150) * (isDark ? 0.4 : 0.25)
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }

        // Update and draw particles
        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          ctx.globalAlpha = particle.opacity
          ctx.fillStyle = particle.color

          if (particle.type === "data") {
            ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size)
          } else {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        ctx.globalAlpha = 1
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function createBusinessBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const elements: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number
        rotation: number
        rotationSpeed: number
        type: "chart" | "arrow" | "dot"
      }> = []

      for (let i = 0; i < 60; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 15 + 5,
          opacity: isDark ? Math.random() * 0.25 + 0.1 : Math.random() * 0.2 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: ["chart", "arrow", "dot"][Math.floor(Math.random() * 3)] as "chart" | "arrow" | "dot",
        })
      }

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw subtle diagonal lines with theme-aware colors
        ctx.strokeStyle = isDark ? "rgba(100, 116, 139, 0.15)" : "rgba(71, 85, 105, 0.1)"
        ctx.lineWidth = 1
        for (let i = -canvas.height; i < canvas.width; i += 100) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i + canvas.height, canvas.height)
          ctx.stroke()
        }

        elements.forEach((element) => {
          element.x += element.vx
          element.y += element.vy
          element.rotation += element.rotationSpeed

          if (element.x < -50 || element.x > canvas.width + 50) element.vx *= -1
          if (element.y < -50 || element.y > canvas.height + 50) element.vy *= -1

          ctx.save()
          ctx.translate(element.x, element.y)
          ctx.rotate(element.rotation)
          ctx.globalAlpha = element.opacity

          const color = isDark ? "#64748b" : "#475569"

          if (element.type === "chart") {
            ctx.fillStyle = color
            for (let i = 0; i < 3; i++) {
              const height = (i + 1) * 3
              ctx.fillRect(i * 4 - 6, -height, 3, height)
            }
          } else if (element.type === "arrow") {
            ctx.strokeStyle = color
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(-element.size / 2, 0)
            ctx.lineTo(element.size / 2, 0)
            ctx.moveTo(element.size / 2 - 5, -3)
            ctx.lineTo(element.size / 2, 0)
            ctx.lineTo(element.size / 2 - 5, 3)
            ctx.stroke()
          } else {
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(0, 0, element.size / 4, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        })

        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function createCreativeBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const shapes: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number
        color: string
        rotation: number
        rotationSpeed: number
        type: "triangle" | "circle" | "square"
      }> = []

      const colors = isDark
        ? ["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981"]
        : ["#d97706", "#dc2626", "#7c3aed", "#0891b2", "#059669"]

      for (let i = 0; i < 50; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 20 + 10,
          opacity: isDark ? Math.random() * 0.4 + 0.15 : Math.random() * 0.25 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          type: ["triangle", "circle", "square"][Math.floor(Math.random() * 3)] as "triangle" | "circle" | "square",
        })
      }

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        shapes.forEach((shape) => {
          shape.x += shape.vx
          shape.y += shape.vy
          shape.rotation += shape.rotationSpeed

          if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1
          if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1

          ctx.save()
          ctx.translate(shape.x, shape.y)
          ctx.rotate(shape.rotation)
          ctx.globalAlpha = shape.opacity
          ctx.fillStyle = shape.color

          if (shape.type === "triangle") {
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.fill()
          } else if (shape.type === "circle") {
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          }

          ctx.restore()
        })

        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function createMinimalBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const dots: Array<{
        x: number
        y: number
        size: number
        opacity: number
        pulseSpeed: number
        pulseOffset: number
      }> = []

      for (let i = 0; i < 30; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          opacity: isDark ? Math.random() * 0.3 + 0.15 : Math.random() * 0.2 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }

      let time = 0

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.016

        dots.forEach((dot) => {
          const pulse = Math.sin(time * dot.pulseSpeed + dot.pulseOffset) * 0.5 + 0.5
          ctx.globalAlpha = dot.opacity * pulse
          ctx.fillStyle = isDark ? "#6b7280" : "#9ca3af"
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function createGeometricBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const polygons: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number
        rotation: number
        rotationSpeed: number
        sides: number
      }> = []

      for (let i = 0; i < 40; i++) {
        polygons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 30 + 15,
          opacity: isDark ? Math.random() * 0.2 + 0.1 : Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          sides: Math.floor(Math.random() * 4) + 3,
        })
      }

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        polygons.forEach((polygon) => {
          polygon.x += polygon.vx
          polygon.y += polygon.vy
          polygon.rotation += polygon.rotationSpeed

          if (polygon.x < 0 || polygon.x > canvas.width) polygon.vx *= -1
          if (polygon.y < 0 || polygon.y > canvas.height) polygon.vy *= -1

          ctx.save()
          ctx.translate(polygon.x, polygon.y)
          ctx.rotate(polygon.rotation)
          ctx.globalAlpha = polygon.opacity
          ctx.strokeStyle = isDark ? "#4f46e5" : "#3730a3"
          ctx.lineWidth = 1

          ctx.beginPath()
          for (let i = 0; i < polygon.sides; i++) {
            const angle = (i / polygon.sides) * Math.PI * 2
            const x = (Math.cos(angle) * polygon.size) / 2
            const y = (Math.sin(angle) * polygon.size) / 2
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()

          ctx.restore()
        })

        animationFrameId = requestAnimationFrame(animate)
      }
    }

    function createCircuitBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isDark: boolean) {
      const circuits: Array<{
        x: number
        y: number
        width: number
        height: number
        opacity: number
        pulse: number
        pulseSpeed: number
      }> = []

      for (let i = 0; i < 20; i++) {
        circuits.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
          opacity: isDark ? Math.random() * 0.4 + 0.15 : Math.random() * 0.25 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }

      let time = 0

      return function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.016

        circuits.forEach((circuit) => {
          circuit.pulse += circuit.pulseSpeed
          const pulseValue = Math.sin(circuit.pulse) * 0.3 + 0.7

          ctx.globalAlpha = circuit.opacity * pulseValue
          ctx.strokeStyle = isDark ? "#00ff88" : "#059669"
          ctx.lineWidth = 1

          // Draw circuit pattern
          ctx.beginPath()
          ctx.moveTo(circuit.x, circuit.y)
          ctx.lineTo(circuit.x + circuit.width / 3, circuit.y)
          ctx.lineTo(circuit.x + circuit.width / 3, circuit.y + circuit.height / 3)
          ctx.lineTo(circuit.x + (circuit.width * 2) / 3, circuit.y + circuit.height / 3)
          ctx.lineTo(circuit.x + (circuit.width * 2) / 3, circuit.y + (circuit.height * 2) / 3)
          ctx.lineTo(circuit.x + circuit.width, circuit.y + (circuit.height * 2) / 3)
          ctx.stroke()

          // Draw nodes
          ctx.fillStyle = isDark ? "#00ff88" : "#059669"
          ctx.beginPath()
          ctx.arc(circuit.x + circuit.width / 3, circuit.y + circuit.height / 3, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(circuit.x + (circuit.width * 2) / 3, circuit.y + (circuit.height * 2) / 3, 2, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(animate)
      }
    }
  }, [variant, theme, resolvedTheme])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-50"
        style={{ zIndex: -1 }}
      />
      {backgroundImage && (
        <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -2 }}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
        </div>
      )}
    </>
  )
}
