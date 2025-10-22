// "use client";
// import { useEffect, useRef } from "react";

// export default function MatrixRain() {
//   const canvasRef = useRef(null);
//   const rafId = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     function resize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     const letters =
//       "アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
//     const fontSize = 14;
//     const columns = () => Math.floor(canvas.width / fontSize);
//     let drops = new Array(columns()).fill(1);

//     function draw() {
//       ctx.fillStyle = "rgba(0,0,0,0.1)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#00ff88";
//       ctx.font = `${fontSize}px monospace`;
//       for (let i = 0; i < drops.length; i++) {
//         const text = letters[Math.floor(Math.random() * letters.length)];
//         ctx.fillText(text, i * fontSize, drops[i] * fontSize);
//         if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
//           drops[i] = 0;
//         drops[i]++;
//       }
//       rafId.current = requestAnimationFrame(draw);
//     }

//     draw();
//     return () => {
//       cancelAnimationFrame(rafId.current);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
// }

"use client";
import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef(null);
  const rafId = useRef(null);
  const state = useRef({ cols: 0, y: [], fontSize: 3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.scale(dpr, dpr);
      state.current.fontSize = 16;
      const cols = Math.ceil(window.innerWidth / state.current.fontSize);
      state.current.cols = cols;
      state.current.y = Array.from({ length: cols }, () => Math.random() * -50);
      ctx.font = `${state.current.fontSize}px monospace`;
    }

    function draw() {
      const { cols, y, fontSize } = state.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#00ff00";
      for (let i = 0; i < cols; i++) {
        const char = String.fromCharCode(0x30a0 + Math.random() * 96);
        const x = i * fontSize;
        const yPos = y[i] * fontSize;
        ctx.fillText(char, x, yPos);
        if (yPos > h && Math.random() > 0.975) y[i] = 0;
        y[i]++;
      }
      rafId.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-40 pointer-events-none"
    />
  );
}
