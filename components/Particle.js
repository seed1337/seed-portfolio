import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 10000); // Adjust density as needed

      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1; // Adjust particle size range as needed
        const speedX = Math.random() - 0.5; // Adjust particle speed as needed (slower)
        const speedY = Math.random() - 0.5; // Adjust particle speed as needed (slower)

        particles.push({ x, y, size, speedX, speedY });
      }
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (
          Math.abs(particle.x - mousePos.current.x) < 100 &&
          Math.abs(particle.y - mousePos.current.y) < 100 &&
          particle.size < 10 // Adjust particle interaction range and threshold as needed
        ) {
          const angle = Math.atan2(
            particle.y - mousePos.current.y,
            particle.x - mousePos.current.x
          );
          particle.speedX += Math.cos(angle) * 0.02; // Adjust interaction strength as needed (slower)
          particle.speedY += Math.sin(angle) * 0.02; // Adjust interaction strength as needed (slower)
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; // Adjust particle color as needed
        ctx.fill();
      }

      requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { top, left } = canvas.getBoundingClientRect();
      mousePos.current.x = clientX - left;
      mousePos.current.y = clientY - top;
    };

    resizeCanvas();
    createParticles();
    updateParticles();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default ParticleBackground;
