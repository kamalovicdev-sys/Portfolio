import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/contexts';

// Three.js sahnasi uchun o'rin: oliy matematika masalasining yechilish jarayoni (three/mathScene.js).
// three.js (~135 KB gzip) alohida chunk: sahifa ko'rinib bo'lgach, brauzer bo'sh paytida yuklanadi —
// birinchi chizilish (LCP) va SEO sekinlashmasligi uchun.
// stage — terminalda yozilayotgan yechim bosqichi; pointerX / pointerY — Hero dagi kursor o'rni (-0.5..0.5)
const MathScene = ({ stage, pointerX, pointerY, className = '' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const isDarkRef = useRef(true);
  const stageRef = useRef(stage);
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    isDarkRef.current = isDark;
    sceneRef.current?.setTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    stageRef.current = stage;
    sceneRef.current?.setStage(stage.problem, stage.stage);
  }, [stage]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { createMathScene } = await import('../three/mathScene.js');
      if (cancelled || !containerRef.current) return;
      sceneRef.current = createMathScene(containerRef.current, {
        isDark: isDarkRef.current,
        stage: stageRef.current,
        reduceMotion,
        getPointer: () => [pointerX.get(), pointerY.get()],
      });
    };

    const requestIdle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 300));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const idleHandle = requestIdle(load);

    return () => {
      cancelled = true;
      cancelIdle(idleHandle);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [pointerX, pointerY, reduceMotion]);

  return <div ref={containerRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
};

export default MathScene;
