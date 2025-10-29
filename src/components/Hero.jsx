import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/Hero.module.css";

const Hero = () => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animationFrameRef = useRef(null);
  const mouseMoveRef = useRef(null);

  // Precargar imágenes (igual que antes)
  useEffect(() => {
    const imageUrls = [
      "/images/layer-1.webp",
      "/images/layer-2.webp",
      "/images/layer-5.webp",
      "/images/layer-6.webp",
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    // OPTIMIZACIÓN: Throttle para mousemove
    const handleMouseMove = (e) => {
      if (mouseMoveRef.current) return;
      
      mouseMoveRef.current = requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth / 2) * -0.005;
        const y = (e.clientY - window.innerHeight / 2) * 0.01;

        document.documentElement.style.setProperty("--move-x", `${x}deg`);
        document.documentElement.style.setProperty("--move-y", `${y}deg`);
        
        mouseMoveRef.current = null;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // OPTIMIZACIÓN: Lluvia con menos partículas
    const initRain = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const c = canvas.getContext("2d");
      c.scale(dpr, dpr);

      // REDUCIR gotas para mejor performance
      const isMobile = window.innerWidth < 768;
      const rainCount = isMobile ? 40 : 80; // Reducido de 70/140

      function RainDrops(x, y, endy, velocity, opacity) {
        this.x = x;
        this.y = y;
        this.endy = endy;
        this.velocity = velocity;
        this.opacity = opacity;

        this.draw = function () {
          c.beginPath();
          c.moveTo(this.x, this.y);
          c.lineTo(this.x, this.y - this.endy);
          c.lineWidth = 1;
          c.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
          c.stroke();
        };

        this.update = function () {
          const rainEnd = window.innerHeight + 100;
          if (this.y >= rainEnd) {
            this.y = this.endy - 100;
          } else {
            this.y = this.y + this.velocity;
          }
          this.draw();
        };
      }

      const rainArray = [];

      for (let i = 0; i < rainCount; i++) {
        const rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
        const rainYLocation = Math.random() * -500;
        const randomRainHeight = Math.floor(Math.random() * 6) + 2; // Reducido
        const randomSpeed = Math.random() * 10 + 0.2; // Reducido
        const randomOpacity = Math.random() * 0.25; // Reducido
        rainArray.push(
          new RainDrops(
            rainXLocation,
            rainYLocation,
            randomRainHeight,
            randomSpeed,
            randomOpacity
          )
        );
      }

      function animateRain() {
        animationFrameRef.current = requestAnimationFrame(animateRain);
        c.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < rainArray.length; i++) {
          rainArray[i].update();
        }
      }

      animateRain();

      const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        c.scale(dpr, dpr);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };

    const cleanupRain = initRain();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveRef.current) {
        cancelAnimationFrame(mouseMoveRef.current);
      }
      if (cleanupRain) cleanupRain();
    };
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // MANTENER tu return original exactamente igual
  return (
    <div className={styles.layers}>
      <div className={styles.layers__container}>
        {/* Capa 1 - Fondo principal */}
        <div
          className={`${styles.layers__item} ${styles.layer_1}`}
          style={{
            backgroundImage: "url(/images/layer-1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Capa 2 - Logo/Elemento principal */}
        <div
          className={`${styles.layers__item} ${styles.layer_2}`}
          style={{
            backgroundImage: "url(/images/layer-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Capa 3 - Contenido de texto */}
        <div className={`${styles.layers__item} ${styles.layer_3}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.titleRnc}>
              RED NUEVA
              <span>CONEXIÓN</span>
            </h1>
            <div className={styles.heroContentP}>Conectándote al mundo.</div>
          </div>
        </div>

        {/* Capa 4 - Lluvia */}
        <div
          className={`${styles.layers__item} ${styles.layer_4} ${styles.pointerEventsNone}`}
        >
          <canvas
            ref={canvasRef}
            className="rain w-full h-full"
            style={{ display: "block" }}
          ></canvas>
        </div>

        {/* Capa 5 - Elementos frontales */}
        <div
          className={`${styles.layers__item} ${styles.layer_5} ${styles.pointerEventsNone}`}
          style={{
            backgroundImage: "url(/images/layer-5.webp)",
            backgroundSize: "60%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Capa 6 - Elementos más frontales */}
        <div
          className={`${styles.layers__item} ${styles.layer_6} ${styles.pointerEventsNone}`}
          style={{
            backgroundImage: "url(/images/layer-6.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;