import React, { useEffect, useState } from 'react';

const CosmicBackground = ({ animationIntensity = 'normal', deviceCapabilities = 'high' }) => {
  const [particles, setParticles] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    // Generate cosmic particles based on device capabilities
    const particleCount = deviceCapabilities === 'high' ? 50 : deviceCapabilities === 'medium' ? 30 : 15;
    const starCount = deviceCapabilities === 'high' ? 8 : deviceCapabilities === 'medium' ? 5 : 3;

    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          animationDelay: Math.random() * 8,
          color: ['primary', 'secondary', 'accent'][Math.floor(Math.random() * 3)]
        });
      }
      setParticles(newParticles);
    };

    const generateShootingStars = () => {
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          startX: Math.random() * 20 - 10,
          startY: Math.random() * 20 - 10,
          animationDelay: Math.random() * 30,
          duration: Math.random() * 2 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          size: Math.random() * 2 + 1
        });
      }
      setShootingStars(newStars);
    };

    generateParticles();
    generateShootingStars();

    // Regenerate particles periodically for dynamic effect
    const particleInterval = setInterval(generateParticles, 60000); // Every minute
    const starInterval = setInterval(generateShootingStars, 45000); // Every 45 seconds

    return () => {
      clearInterval(particleInterval);
      clearInterval(starInterval);
    };
  }, [deviceCapabilities]);

  const getIntensityClass = () => {
    switch (animationIntensity) {
      case 'low':
        return 'opacity-30';
      case 'high':
        return 'opacity-80';
      default:
        return 'opacity-50';
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-1 overflow-hidden ${getIntensityClass()}`}>
      {/* Cosmic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background opacity-90"></div>
      
      {/* Nebula Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl animate-cosmic-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 via-accent/5 to-transparent rounded-full blur-3xl animate-cosmic-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-accent/8 via-primary/3 to-transparent rounded-full blur-2xl animate-cosmic-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-${particle.size} h-${particle.size} bg-${particle.color} rounded-full animate-cosmic-pulse`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        ></div>
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-primary rounded-full animate-shooting-star"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.duration}s`,
          }}
        ></div>
      ))}

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Dynamic constellation lines */}
        <path
          d="M 100 150 Q 200 100 300 150 T 500 150"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-cosmic-pulse"
        />
        <path
          d="M 600 300 Q 700 250 800 300 T 1000 300"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-cosmic-pulse"
          style={{ animationDelay: '3s' }}
        />
        <path
          d="M 200 500 Q 300 450 400 500 T 600 500"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          className="animate-cosmic-pulse"
          style={{ animationDelay: '6s' }}
        />
      </svg>

      {/* Rotating Planets */}
      <div className="absolute top-20 right-20 w-16 h-16 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full animate-planet-rotation cosmic-glow"></div>
      </div>
      <div className="absolute bottom-32 left-32 w-12 h-12 opacity-25">
        <div className="w-full h-full bg-gradient-to-br from-secondary to-accent rounded-full animate-planet-rotation cosmic-glow" style={{ animationDelay: '10s', animationDuration: '45s' }}></div>
      </div>
      <div className="absolute top-1/2 right-1/4 w-8 h-8 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-accent to-primary rounded-full animate-planet-rotation cosmic-glow" style={{ animationDelay: '20s', animationDuration: '30s' }}></div>
      </div>

      {/* Space Shuttle */}
      <div className="absolute bottom-20 left-20 opacity-40">
        <div className="relative">
          <div className="w-8 h-12 bg-gradient-to-t from-muted to-foreground rounded-t-full transform rotate-45 animate-cosmic-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full animate-cosmic-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-cosmic-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Cosmic Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default CosmicBackground;