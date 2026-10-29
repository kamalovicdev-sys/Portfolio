import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const spring = { stiffness: 180, damping: 18 };

// 3D kartochka: sichqoncha ortidan og'adi, ustida yorug'lik aksi yuradi.
// Ichidagi elementlarga translate-z-* klassi berilsa, ular oldinga "chiqib" turadi.
// Telefonda (sensorli ekran) va "kamroq animatsiya" sozlamasi yoqilganda og'maydi.
//
// Ikki qatlam: tashqi qatlam (wrapperClassName, animatsiya props) kursorni kuzatadi va o'zi og'maydi,
// ichki qatlam (className) og'adi. Aks holda og'gan kartochka chetlari kursor ostidan "qochib",
// pointerleave → tekislanish → yana og'ish halqasi paydo bo'ladi
const TiltCard = ({ children, className = '', wrapperClassName = '', maxTilt = 8, ...props }) => {
  const reduceMotion = useReducedMotion();

  // Kursorning kartochka ichidagi o'rni: 0..1 (0.5 — markaz)
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);

  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const smoothGlare = useSpring(glareOpacity, spring);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(74, 222, 128, 0.14), transparent 60%)`;

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={wrapperClassName}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
        className={`relative ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity: smoothGlare }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
