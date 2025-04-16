"use client"

import { useEffect, useRef } from "react"

export function BranchingVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 300

    // Draw branching diagram
    drawBranchingDiagram(ctx)
  }, [])

  const drawBranchingDiagram = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Main branch
    ctx.strokeStyle = "#FF0000" // Shell red
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(50, 150)
    ctx.lineTo(450, 150)
    ctx.stroke()

    // Feature branch
    ctx.strokeStyle = "#FFCC00" // Shell yellow
    ctx.beginPath()
    ctx.moveTo(150, 150)
    ctx.bezierCurveTo(200, 150, 200, 80, 250, 80)
    ctx.lineTo(350, 80)
    ctx.bezierCurveTo(400, 80, 400, 150, 450, 150)
    ctx.stroke()

    // Bugfix branch
    ctx.strokeStyle = "#0066B2" // Shell blue
    ctx.beginPath()
    ctx.moveTo(200, 150)
    ctx.bezierCurveTo(250, 150, 250, 220, 300, 220)
    ctx.lineTo(350, 220)
    ctx.bezierCurveTo(400, 220, 400, 150, 450, 150)
    ctx.stroke()

    // Commit points on main branch
    drawCommit(ctx, 50, 150, "#FF0000")
    drawCommit(ctx, 150, 150, "#FF0000")
    drawCommit(ctx, 200, 150, "#FF0000")
    drawCommit(ctx, 450, 150, "#FF0000")

    // Commit points on feature branch
    drawCommit(ctx, 250, 80, "#FFCC00")
    drawCommit(ctx, 300, 80, "#FFCC00")
    drawCommit(ctx, 350, 80, "#FFCC00")

    // Commit points on bugfix branch
    drawCommit(ctx, 300, 220, "#0066B2")
    drawCommit(ctx, 350, 220, "#0066B2")

    // Labels
    ctx.font = "14px Arial"
    ctx.fillStyle = "#333333"
    ctx.textAlign = "center"

    // Main branch label
    ctx.fillText("main", 100, 130)

    // Feature branch label
    ctx.fillText("feature", 300, 60)

    // Bugfix branch label
    ctx.fillText("bugfix", 325, 240)

    // Merge point label
    ctx.fillText("merge", 450, 130)
  }

  const drawCommit = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.stroke()
  }

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto border rounded-lg shadow-md"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
