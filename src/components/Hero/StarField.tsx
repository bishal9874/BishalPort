"use client";
import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    prevX: number;
    prevY: number;
    radius: number;
    color: string;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface ShootingStar {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: string;
    phase: number;
    speed: number;
}

const STAR_COUNT = 1200;
const SHOOTING_STAR_INTERVAL = 3000;
const WARP_SPEED = 0.5;
const BASE_SPEED = 0.15;

const STAR_COLORS = [
    "rgba(255, 255, 255,",      // white
    "rgba(200, 220, 255,",      // cool blue-white
    "rgba(255, 240, 220,",      // warm yellow-white
    "rgba(180, 200, 255,",      // blue
    "rgba(255, 200, 180,",      // orange-ish
    "rgba(220, 180, 255,",      // purple tint
];

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let width = 0;
        let height = 0;
        let centerX = 0;
        let centerY = 0;
        let mouseX = 0;
        let mouseY = 0;
        let time = 0;
        let lastShootingStarTime = 0;

        const stars: Star[] = [];
        const shootingStars: ShootingStar[] = [];
        const nebulae: Nebula[] = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            centerX = width / 2;
            centerY = height / 2;
        };

        const createStar = (): Star => {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * Math.max(width, height) * 0.8;
            return {
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                z: Math.random() * 1000 + 1,
                prevX: 0,
                prevY: 0,
                radius: Math.random() * 1.8 + 0.3,
                color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
            };
        };

        const createNebula = (): Nebula => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 300 + 150,
            color: [
                "rgba(80, 40, 120,",
                "rgba(30, 60, 120,",
                "rgba(60, 20, 80,",
                "rgba(20, 40, 100,",
                "rgba(100, 30, 60,",
            ][Math.floor(Math.random() * 5)],
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.005 + 0.002,
        });

        const createShootingStar = (): ShootingStar => {
            const side = Math.floor(Math.random() * 2);
            const angle = Math.random() * 0.5 + 0.3;
            return {
                x: side === 0 ? Math.random() * width : -50,
                y: Math.random() * height * 0.5,
                vx: Math.cos(angle) * (8 + Math.random() * 6),
                vy: Math.sin(angle) * (8 + Math.random() * 6),
                life: 0,
                maxLife: 40 + Math.random() * 30,
                size: Math.random() * 2 + 1,
            };
        };

        // Initialize
        resize();
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(createStar());
        }
        for (let i = 0; i < 5; i++) {
            nebulae.push(createNebula());
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - centerX) / centerX;
            mouseY = (e.clientY - centerY) / centerY;
        };

        const drawNebulae = () => {
            nebulae.forEach((nebula) => {
                const opacity = 0.04 + Math.sin(nebula.phase + time * nebula.speed) * 0.02;
                const gradient = ctx.createRadialGradient(
                    nebula.x, nebula.y, 0,
                    nebula.x, nebula.y, nebula.radius
                );
                gradient.addColorStop(0, `${nebula.color} ${opacity})`);
                gradient.addColorStop(0.5, `${nebula.color} ${opacity * 0.5})`);
                gradient.addColorStop(1, `${nebula.color} 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    nebula.x - nebula.radius,
                    nebula.y - nebula.radius,
                    nebula.radius * 2,
                    nebula.radius * 2
                );
            });
        };

        const drawStars = () => {
            stars.forEach((star) => {
                // Parallax shift based on mouse
                const parallaxX = mouseX * (30 / (star.z * 0.01));
                const parallaxY = mouseY * (30 / (star.z * 0.01));

                // Project 3D to 2D
                const scale = 1000 / (star.z + 1);
                const projX = (star.x - centerX) * scale + centerX + parallaxX;
                const projY = (star.y - centerY) * scale + centerY + parallaxY;

                // Twinkle effect
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
                const opacity = 0.4 + twinkle * 0.4 + (1000 - star.z) / 2000;
                const clampedOpacity = Math.max(0.1, Math.min(1, opacity));
                const visualRadius = star.radius * scale * 0.5;

                // Draw star glow
                if (visualRadius > 0.8) {
                    const glowGradient = ctx.createRadialGradient(
                        projX, projY, 0,
                        projX, projY, visualRadius * 4
                    );
                    glowGradient.addColorStop(0, `${star.color} ${clampedOpacity * 0.3})`);
                    glowGradient.addColorStop(1, `${star.color} 0)`);
                    ctx.fillStyle = glowGradient;
                    ctx.beginPath();
                    ctx.arc(projX, projY, visualRadius * 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw star core
                ctx.fillStyle = `${star.color} ${clampedOpacity})`;
                ctx.beginPath();
                ctx.arc(projX, projY, Math.max(0.5, visualRadius), 0, Math.PI * 2);
                ctx.fill();

                // Draw cross-shaped spike for bright stars
                if (visualRadius > 1.2 && clampedOpacity > 0.6) {
                    ctx.strokeStyle = `${star.color} ${clampedOpacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    const spikeLen = visualRadius * 6;
                    ctx.beginPath();
                    ctx.moveTo(projX - spikeLen, projY);
                    ctx.lineTo(projX + spikeLen, projY);
                    ctx.moveTo(projX, projY - spikeLen);
                    ctx.lineTo(projX, projY + spikeLen);
                    ctx.stroke();
                }

                // Move star toward camera (warp effect)
                star.z -= BASE_SPEED + WARP_SPEED * (1000 - star.z) / 1000;

                // Reset star if it passes the camera
                if (star.z <= 0 || projX < -100 || projX > width + 100 || projY < -100 || projY > height + 100) {
                    Object.assign(star, createStar());
                    star.z = 900 + Math.random() * 100;
                }
            });
        };

        const drawShootingStars = () => {
            shootingStars.forEach((ss, index) => {
                ss.x += ss.vx;
                ss.y += ss.vy;
                ss.life++;

                const progress = ss.life / ss.maxLife;
                const opacity = progress < 0.1
                    ? progress / 0.1
                    : 1 - (progress - 0.1) / 0.9;

                // Trail
                const trailLength = 30;
                const gradient = ctx.createLinearGradient(
                    ss.x, ss.y,
                    ss.x - ss.vx * trailLength * 0.3,
                    ss.y - ss.vy * trailLength * 0.3
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                gradient.addColorStop(0.3, `rgba(200, 220, 255, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = ss.size;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(
                    ss.x - ss.vx * trailLength * 0.3,
                    ss.y - ss.vy * trailLength * 0.3
                );
                ctx.stroke();

                // Head glow
                const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
                headGlow.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                headGlow.addColorStop(1, `rgba(200, 220, 255, 0)`);
                ctx.fillStyle = headGlow;
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
                ctx.fill();

                if (ss.life >= ss.maxLife || ss.x > width + 100 || ss.y > height + 100) {
                    shootingStars.splice(index, 1);
                }
            });
        };

        const animate = () => {
            time++;
            ctx.clearRect(0, 0, width, height);

            // Deep space background
            const bgGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.max(width, height) * 0.7
            );
            bgGradient.addColorStop(0, "rgba(8, 5, 20, 1)");
            bgGradient.addColorStop(0.4, "rgba(5, 3, 15, 1)");
            bgGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            drawNebulae();
            drawStars();

            // Shooting stars
            if (time - lastShootingStarTime > SHOOTING_STAR_INTERVAL / 16) {
                if (Math.random() < 0.008) {
                    shootingStars.push(createShootingStar());
                    lastShootingStarTime = time;
                }
            }
            drawShootingStars();

            // Central galaxy glow
            const galaxyGlow = ctx.createRadialGradient(
                centerX, centerY * 0.8, 0,
                centerX, centerY * 0.8, 400
            );
            galaxyGlow.addColorStop(0, "rgba(60, 40, 100, 0.06)");
            galaxyGlow.addColorStop(0.3, "rgba(40, 30, 80, 0.03)");
            galaxyGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = galaxyGlow;
            ctx.fillRect(0, 0, width, height);

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    );
}
