"use client"

import { useEffect, useRef } from "react"

export function RepositoryDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 600
    canvas.height = 400

    // Draw repository diagram
    drawRepositoryDiagram(ctx)
  }, [])

  const drawRepositoryDiagram = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw central repository
    ctx.fillStyle = "#FF0000" // Shell red
    ctx.beginPath()
    ctx.roundRect(250, 150, 100, 100, 10)
    ctx.fill()

    // Draw repository label
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Central", 300, 185)
    ctx.fillText("Repository", 300, 205)

    // Draw developers
    drawDeveloper(ctx, 100, 80, "Developer 1")
    drawDeveloper(ctx, 500, 80, "Developer 2")
    drawDeveloper(ctx, 100, 300, "Developer 3")
    drawDeveloper(ctx, 500, 300, "Developer 4")

    // Draw arrows
    drawArrow(ctx, 130, 110, 240, 150) // Dev 1 to Repo
    drawArrow(ctx, 240, 200, 130, 290) // Repo to Dev 3
    drawArrow(ctx, 470, 110, 360, 150) // Dev 2 to Repo
    drawArrow(ctx, 360, 200, 470, 290) // Repo to Dev 4

    // Draw bidirectional arrows
    drawBidirectionalArrow(ctx, 130, 200, 240, 200) // Dev 3 to Repo
    drawBidirectionalArrow(ctx, 360, 80, 470, 80) // Dev 2 to Repo
  }

  const drawDeveloper = (ctx: CanvasRenderingContext2D, x: number, y: number, label: string) => {
    // Developer circle
    ctx.fillStyle = "#FFCC00" // Shell yellow
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    // Developer label
    ctx.fillStyle = "#000000"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(label, x, y + 45)
  }

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headLength = 10
    const angle = Math.atan2(toY - fromY, toX - fromX)

    // Draw line
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    // Draw arrowhead
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fillStyle = "#333333"
    ctx.fill()
  }

  const drawBidirectionalArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
  ) => {
    const headLength = 10
    const angle = Math.atan2(toY - fromY, toX - fromX)
    const reverseAngle = Math.atan2(fromY - toY, fromX - toX)

    // Draw line
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    // Draw arrowhead at 'to' point
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fillStyle = "#333333"
    ctx.fill()

    // Draw arrowhead at 'from' point
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(
      fromX - headLength * Math.cos(reverseAngle - Math.PI / 6),
      fromY - headLength * Math.sin(reverseAngle - Math.PI / 6),
    )
    ctx.lineTo(
      fromX - headLength * Math.cos(reverseAngle + Math.PI / 6),
      fromY - headLength * Math.sin(reverseAngle + Math.PI / 6),
    )
    ctx.closePath()
    ctx.fillStyle = "#333333"
    ctx.fill()
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
