import { useEffect, useRef } from 'react';

export const HeroVisualization = () => {
  const neuralNetworkRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create neural network
    const container = neuralNetworkRef.current;
    if (!container) return;

    const nodeCount = 12;
    const nodes: { element: HTMLDivElement; x: number; y: number }[] = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'absolute w-1 h-1 rounded-full bg-primary/60 shadow-[0_0_15px_hsl(var(--primary)/0.8)]';
      node.style.animation = `pulse 3s ease-in-out infinite ${i * 0.2}s`;
      
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 120 + Math.random() * 40;
      const x = 50 + Math.cos(angle) * radius / 4;
      const y = 50 + Math.sin(angle) * radius / 4;
      node.style.left = x + '%';
      node.style.top = y + '%';
      
      container.appendChild(node);
      nodes.push({ element: node, x, y });
    }

    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.6) {
          const line = document.createElement('div');
          line.className = 'absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent';
          line.style.animation = `dataFlow 4s linear infinite ${Math.random() * 2}s`;
          
          const x1 = nodes[i].x;
          const y1 = nodes[i].y;
          const x2 = nodes[j].x;
          const y2 = nodes[j].y;
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          
          line.style.width = length + '%';
          line.style.left = x1 + '%';
          line.style.top = y1 + '%';
          line.style.transform = `rotate(${angle}deg)`;
          line.style.transformOrigin = 'left center';
          
          container.appendChild(line);
        }
      }
    }

    // Create particles
    const particleContainer = particleContainerRef.current;
    if (!particleContainer) return;

    const particleInterval = setInterval(() => {
      if (particleContainer.children.length < 30) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-0.5 h-0.5 rounded-full bg-primary/80';
        
        const startX = 50 + (Math.random() - 0.5) * 20;
        const startY = 50 + (Math.random() - 0.5) * 20;
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        
        particleContainer.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const life = Math.random() * 2000 + 2000;
        
        let currentX = startX;
        let currentY = startY;
        const startTime = Date.now();
        
        const animateParticle = () => {
          const elapsed = Date.now() - startTime;
          if (elapsed > life) {
            particle.remove();
            return;
          }
          
          currentX += Math.cos(angle) * speed * 0.1;
          currentY += Math.sin(angle) * speed * 0.1;
          
          particle.style.left = currentX + '%';
          particle.style.top = currentY + '%';
          particle.style.opacity = String(1 - (elapsed / life));
          
          requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
      }
    }, 200);

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="w-[400px] h-[400px] mx-auto mb-12 relative perspective-[1000px]">
      {/* Holographic rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={`ring-${i}`}
          className="absolute border-2 border-primary/30 rounded-full"
          style={{
            width: `${250 + i * 70}px`,
            height: `${250 + i * 70}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `expandRing 4s ease-out infinite ${i}s`,
          }}
        />
      ))}

      {/* Neural network background */}
      <div ref={neuralNetworkRef} className="absolute w-full h-full" />

      {/* Main 3D visualization */}
      <div className="absolute w-full h-full flex items-center justify-center" style={{ animation: 'float 6s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
        <div className="relative w-[300px] h-[300px]" style={{ transformStyle: 'preserve-3d', animation: 'rotate3d 20s linear infinite' }}>
          {/* Central Sound Wave */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] flex items-center justify-center gap-1.5 [filter:drop-shadow(0_0_30px_hsl(var(--primary)/0.8))]">
            {[20, 40, 60, 80, 90, 100, 80, 60, 40, 20].map((height, i) => (
              <div
                key={`wave-${i}`}
                className="w-1 rounded-sm bg-gradient-to-b from-accent to-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                style={{
                  height: `${height}px`,
                  animation: `waveMotion 1.5s ease-in-out infinite ${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Wireframe Brain with Electrodes */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] opacity-40">
            <div className="absolute w-20 h-[140px] border border-primary/50 rounded-full left-5 top-5 border-r-0" style={{ borderTopLeftRadius: '80px 70px', borderBottomLeftRadius: '80px 70px' }} />
            <div className="absolute w-20 h-[140px] border border-primary/50 rounded-full right-5 top-5 border-l-0" style={{ borderTopRightRadius: '80px 70px', borderBottomRightRadius: '80px 70px' }} />
            
            {/* Brain folds */}
            <div className="absolute w-10 h-[50px] border border-primary/30 rounded-full left-[30px] top-10 border-r-0" />
            <div className="absolute w-10 h-[50px] border border-primary/30 rounded-full right-[30px] top-10 border-l-0" />
            <div className="absolute w-9 h-10 border border-primary/30 rounded-full left-[35px] top-20 border-r-0" />
            <div className="absolute w-9 h-10 border border-primary/30 rounded-full right-[35px] top-20 border-l-0" />

            {/* Blinking Electrodes */}
            {[
              { left: '25px', top: '30px', delay: '0s' },
              { right: '25px', top: '30px', delay: '0.3s' },
              { left: '30px', top: '70px', delay: '0.6s' },
              { right: '30px', top: '70px', delay: '0.9s' },
              { left: '35px', top: '110px', delay: '1.2s' },
              { right: '35px', top: '110px', delay: '1.5s' },
              { left: '50px', top: '50px', delay: '0.4s' },
              { right: '50px', top: '50px', delay: '0.7s' },
              { left: '55px', top: '90px', delay: '1s' },
              { right: '55px', top: '90px', delay: '1.3s' },
            ].map((pos, i) => (
              <div
                key={`electrode-${i}`}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_15px_hsl(var(--accent)/0.8),0_0_25px_hsl(var(--primary)/0.5)]"
                style={{
                  ...pos,
                  animation: `electrodeBlink 2s ease-in-out infinite ${pos.delay}`,
                }}
              />
            ))}
          </div>

          {/* Realistic ASL Hand Outline */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[100px] h-[120px] opacity-70">
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                className="fill-none stroke-primary/80 stroke-2"
                style={{ animation: 'handGlow 3s ease-in-out infinite' }}
                d="M 30 80 Q 25 70 25 60 L 25 50 Q 25 45 28 42 L 28 35 Q 28 30 32 28 L 32 25 Q 32 18 38 15 Q 42 13 46 15 Q 48 10 53 10 Q 58 10 60 15 Q 64 13 68 15 Q 74 18 74 25 L 74 28 Q 78 30 78 35 L 78 60 Q 78 75 70 85 Q 65 90 55 95 Q 45 98 35 95 Q 32 93 30 90 Z"
              />
              <path className="fill-none stroke-primary/80 stroke-2" d="M 28 50 Q 20 48 15 52 Q 10 56 10 62 Q 10 68 15 72 Q 20 76 28 74" />
              <path className="fill-none stroke-primary/80 stroke-2" d="M 38 25 Q 38 18 40 12 Q 42 5 45 3 Q 48 1 51 3 Q 54 5 56 12 Q 58 18 58 25" />
              <path className="fill-none stroke-primary/80 stroke-2" d="M 46 15 L 48 8 Q 50 3 53 3 Q 56 3 58 8 L 60 15" />
              <path className="fill-none stroke-primary/80 stroke-2" d="M 60 15 L 62 10 Q 64 6 67 6 Q 70 6 72 10 L 74 15" />
              <path className="fill-none stroke-primary/80 stroke-2" d="M 74 28 Q 76 22 78 18 Q 80 12 83 10 Q 86 8 89 10 Q 92 12 94 18 Q 96 22 98 28 L 98 35 Q 98 40 96 44 Q 94 48 90 50 Q 86 52 82 50 Q 78 48 78 42" />
              <line className="stroke-primary/80 stroke-1" x1="35" y1="50" x2="35" y2="75" />
              <line className="stroke-primary/80 stroke-1" x1="45" y1="45" x2="45" y2="78" />
              <line className="stroke-primary/80 stroke-1" x1="55" y1="45" x2="55" y2="78" />
              <line className="stroke-primary/80 stroke-1" x1="65" y1="50" x2="65" y2="75" />
            </svg>
          </div>
        </div>
      </div>

      {/* Particle container */}
      <div ref={particleContainerRef} className="absolute w-full h-full pointer-events-none" />

      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-0.5 h-0.5 bg-primary/80 rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 2 + 2}s ease-in-out infinite ${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            left: `${Math.random() * 50}%`,
            top: `${Math.random() * 50}%`,
            background: 'linear-gradient(90deg, rgba(0, 212, 255, 0), hsl(var(--primary)))',
            animation: `shoot ${Math.random() * 3 + 3}s linear infinite ${Math.random() * 5}s`,
            width: `${Math.random() * 50 + 50}px`,
          }}
        />
      ))}
    </div>
  );
};
