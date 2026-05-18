import React, { useEffect, useRef } from 'react';

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // --- High DPI Scaling ---
    const setupCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // --- Configuration ---
    const mouse = { x: -1000, y: -1000, isActive: false };
    
    const TIER_1_COUNT = 6;  // Small
    const TIER_2_COUNT = 2;  // Medium
    const TIER_3_COUNT = 1;  // Large (The Boss)

    // --- Helper Functions ---
    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // --- Classes ---

    class Shockwave {
        x: number;
        y: number;
        radius: number;
        maxRadius: number;
        alpha: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.radius = 1;
            this.maxRadius = 350;
            this.alpha = 1;
        }

        update() {
            this.radius += 12; 
            this.alpha -= 0.03;
        }

        draw(ctx: CanvasRenderingContext2D) {
            if (this.alpha <= 0) return;
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(34, 211, 238, ${this.alpha * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.restore();
        }
    }

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        color: string;

        constructor(x: number, y: number, color: string) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            // Slightly faster speed for "explosion" feel
            const speed = randomRange(3, 10); 
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.life = 1.0;
            this.color = color;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.90; // Higher friction so they explode then stop
            this.vy *= 0.90;
            this.life -= 0.05; // Fade out faster
        }

        draw(ctx: CanvasRenderingContext2D) {
            if (this.life <= 0) return;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, randomRange(1.5, 4), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    class Fish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tier: number; 
      size: number;
      color: string;
      glowColor: string;
      trail: {x: number, y: number}[];
      maxSpeed: number;
      turnSpeed: number;
      eatAnim: number;
      flashTimer: number; // For the color change effect
      wobble: number; 

      constructor(tier: number) {
        this.tier = tier;
        this.wobble = Math.random() * Math.PI * 2;
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.trail = [];
        this.flashTimer = 0;
      }

      reset() {
        this.eatAnim = 0;
        this.flashTimer = 0;
        
        if (this.tier === 1) { // Small - Neon Cyan
            this.size = 6; 
            this.color = '#00f3ff'; 
            this.glowColor = 'rgba(0, 243, 255, 0.4)';
            this.maxSpeed = randomRange(4, 5.5);
            this.turnSpeed = 0.15;
        } else if (this.tier === 2) { // Medium - Plasma Pink
            this.size = 14;
            this.color = '#d946ef'; 
            this.glowColor = 'rgba(217, 70, 239, 0.4)';
            this.maxSpeed = randomRange(3, 4);
            this.turnSpeed = 0.1;
        } else { // Large - Fiery Orange
            this.size = 30; 
            this.color = '#ff4500'; 
            this.glowColor = 'rgba(255, 69, 0, 0.4)';
            this.maxSpeed = randomRange(2.2, 3);
            this.turnSpeed = 0.06;
        }

        // Spawn logic
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { this.x = -50; this.y = Math.random() * height; }
        else if (side === 1) { this.x = width + 50; this.y = Math.random() * height; }
        else if (side === 2) { this.x = Math.random() * width; this.y = -50; }
        else { this.x = Math.random() * width; this.y = height + 50; }

        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * this.maxSpeed;
        this.vy = Math.sin(angle) * this.maxSpeed;
        this.trail = [];
      }

      update(allFish: Fish[], particles: Particle[], shockwaves: Shockwave[]) {
        this.wobble += 0.2;
        if (this.eatAnim > 0) this.eatAnim -= 0.05; 
        if (this.flashTimer > 0) this.flashTimer--; // Decrease flash timer

        this.x += this.vx;
        this.y += this.vy;

        // Shockwave Interaction
        for (const wave of shockwaves) {
            const dx = this.x - wave.x;
            const dy = this.y - wave.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < wave.radius + 80 && dist > wave.radius - 80) {
                const force = 10;
                const angle = Math.atan2(dy, dx);
                this.vx += Math.cos(angle) * force;
                this.vy += Math.sin(angle) * force;
            }
        }

        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > (this.tier === 1 ? 6 : 12)) {
            this.trail.shift();
        }

        // Screen Wrap
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;

        // --- BEHAVIOR AI ---
        let targetX = this.x + this.vx * 20;
        let targetY = this.y + this.vy * 20;
        let speedMultiplier = 1;
        
        let closestPrey: Fish | null = null;
        let closestPredator: Fish | null = null;
        let minPreyDist = 500;
        let minPredatorDist = 250;

        for (let other of allFish) {
            if (other === this) continue;
            const d = getDistance(this, other);

            if (this.tier > other.tier) { // I am the hunter
                // Eat check
                if (d < this.size + other.size + 5) {
                    other.reset(); 
                    this.eatAnim = 1.0;
                    this.flashTimer = 15; // Set flash timer (approx 1/4 second at 60fps)
                    
                    // EXPLOSION EFFECT
                    // Create particles using the prey's color + some sparks
                    for(let i=0; i<8; i++) {
                        particles.push(new Particle(this.x, this.y, other.color));
                    }
                    particles.push(new Particle(this.x, this.y, '#ffffff')); // Add white spark
                    continue;
                }
                // Spot prey
                if (d < minPreyDist) {
                    minPreyDist = d;
                    closestPrey = other;
                }
            } else if (other.tier > this.tier) { // I am the prey
                if (d < minPredatorDist) {
                    minPredatorDist = d;
                    closestPredator = other;
                }
            }
        }

        // --- DECISION TREE MODIFIED ---
        
        if (mouse.isActive) {
            // Priority 1: ABSOLUTE OBEDIENCE TO GRAVITY (MOUSE)
            // Ignore predators, ignore food, just go to mouse.
            const distToMouse = getDistance(this, mouse);
            
            // Keep a tiny distance so they don't visually overlap perfectly
            if (distToMouse > 20) {
                targetX = mouse.x;
                targetY = mouse.y;
                speedMultiplier = 2.5; // Rush to cursor
            }
        } else if (closestPredator) {
            // Priority 2: Flee (Only if mouse is NOT active)
            targetX = this.x - (closestPredator.x - this.x);
            targetY = this.y - (closestPredator.y - this.y);
            speedMultiplier = 2.5;
        } else if (closestPrey) {
            // Priority 3: Hunt
            targetX = closestPrey.x;
            targetY = closestPrey.y;
            speedMultiplier = 1.5;
        }

        // Apply Steer
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist > 0) {
            const desiredVx = (dx / dist) * this.maxSpeed * speedMultiplier;
            const desiredVy = (dy / dist) * this.maxSpeed * speedMultiplier;
            
            this.vx += (desiredVx - this.vx) * this.turnSpeed;
            this.vy += (desiredVy - this.vy) * this.turnSpeed;
        }

        // Speed Limit
        const currentSpeed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        const limit = this.maxSpeed * 3; 
        
        if (currentSpeed > limit) {
             this.vx = (this.vx / currentSpeed) * limit;
             this.vy = (this.vy / currentSpeed) * limit;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const angle = Math.atan2(this.vy, this.vx);
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);
        
        // Easing scale from eatAnim
        const scale = this.eatAnim > 0 ? 1 + (this.eatAnim * 0.4) : 1;
        ctx.scale(scale, scale);

        // Determine Color
        // If flashTimer > 0, use Bright Gold/White. Otherwise use normal color.
        let currentColor = this.color;
        if (this.flashTimer > 0) {
            currentColor = '#fbbf24'; // Bright Amber/Gold flash
            ctx.shadowBlur = 40; // Extra glow during flash
            ctx.shadowColor = '#fbbf24';
        } else {
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
        }

        ctx.fillStyle = currentColor;
        
        ctx.beginPath();
        
        if (this.tier === 1) {
            // Tier 1 Shape
            ctx.moveTo(this.size * 2, 0); 
            ctx.lineTo(-this.size, -this.size * 0.6);
            ctx.lineTo(-this.size * 0.5, 0);
            ctx.lineTo(-this.size, this.size * 0.6);
            ctx.closePath();
            ctx.fill();

        } else if (this.tier === 2) {
            // Tier 2 Shape
            ctx.moveTo(this.size * 1.5, 0); 
            ctx.lineTo(-this.size * 0.5, -this.size); 
            ctx.lineTo(-this.size * 0.2, 0); 
            ctx.lineTo(-this.size * 0.5, this.size); 
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = this.flashTimer > 0 ? '#fff' : '#fff';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
            ctx.fill();

        } else {
            // Tier 3 Shape
            ctx.moveTo(this.size * 1.8, 0); 
            ctx.lineTo(this.size * 0.5, -this.size * 0.8);
            ctx.lineTo(-this.size * 1.2, -this.size * 0.4); 
            ctx.lineTo(-this.size * 0.8, 0); 
            ctx.lineTo(-this.size * 1.2, this.size * 0.4); 
            ctx.lineTo(this.size * 0.5, this.size * 0.8);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.rect(-this.size * 0.5, -this.size*0.2, this.size, this.size*0.4);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(this.size, -this.size*0.3, this.size*0.15, 0, Math.PI*2);
            ctx.arc(this.size, this.size*0.3, this.size*0.15, 0, Math.PI*2);
            ctx.fill();
        }

        ctx.restore();
      }
    }

    // --- Init ---
    const allFish: Fish[] = [];
    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    for (let i = 0; i < TIER_1_COUNT; i++) allFish.push(new Fish(1));
    for (let i = 0; i < TIER_2_COUNT; i++) allFish.push(new Fish(2));
    for (let i = 0; i < TIER_3_COUNT; i++) allFish.push(new Fish(3));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
          shockwaves[i].update();
          shockwaves[i].draw(ctx);
          if (shockwaves[i].alpha <= 0) shockwaves.splice(i, 1);
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].draw(ctx);
          if (particles[i].life <= 0) particles.splice(i, 1);
      }

      // Update Fish
      allFish.forEach(fish => {
          fish.update(allFish, particles, shockwaves);
          fish.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY; 
        mouse.isActive = true;

        clearTimeout((canvas as any).mouseTimeout);
        (canvas as any).mouseTimeout = setTimeout(() => {
            mouse.isActive = false;
        }, 3000); 
    };

    const handleMouseDown = (e: MouseEvent) => {
        shockwaves.push(new Shockwave(e.clientX, e.clientY));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-100" 
    />
  );
};

export default CanvasBackground;