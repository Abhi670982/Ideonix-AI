"use client";

import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  density?: number; // number of dots
  minSize?: number;
  maxSize?: number;
  speedFactor?: number;
  color?: string; // primary color
  glowColor?: string; // glow color
}

export default function AnimatedBackground({
  density = 60,
  minSize = 1,
  maxSize = 3,
  speedFactor = 0.5,
  color = "rgba(56, 189, 248, 0.3)", // Cyan-500 with opacity
  glowColor = "rgba(129, 140, 248, 0.15)", // Indigo-400 with opacity
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120, // Interaction radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Particle definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
      pulseDirection: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        // Random velocity vector
        this.vx = (Math.random() - 0.5) * speedFactor;
        this.vy = (Math.random() - 0.5) * speedFactor;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.pulseSpeed = Math.random() * 0.005 + 0.002;
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (gentle attraction/repulsion)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Push away gently
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }

        // Pulse opacity for organic breathing effect
        this.alpha += this.pulseSpeed * this.pulseDirection;
        if (this.alpha > 0.7 || this.alpha < 0.15) {
          this.pulseDirection *= -1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = color.replace(/[\d.]+\)$/, `${this.alpha})`);
        context.fill();

        // Optional subtle glow for larger particles
        if (this.size > (maxSize + minSize) / 2) {
          context.beginPath();
          context.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          context.fillStyle = glowColor.replace(/[\d.]+\)$/, `${this.alpha * 0.4})`);
          context.fill();
        }
      }
    }

    // Initialize particle array
    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      particles.push(new Particle());
    }

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Render subtle connection lines if particles are close
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const linkAlpha = (100 - dist) / 100 * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${linkAlpha})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, minSize, maxSize, speedFactor, color, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen bg-background"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
