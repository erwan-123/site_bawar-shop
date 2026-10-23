"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import {
  LuArrowDown as ArrowDown,
  LuArrowRight as ArrowRight,
  LuDownload as Download,
  LuSparkles as Sparkles,
} from "react-icons/lu";

/* ------------------------------------------------------------------ */
/* Données des applications                                            */
/* ------------------------------------------------------------------ */

type AppItem = {
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  image?: string;
};

const apps: AppItem[] = [
  {
    name: "Bazar Connect",
    category: "Communication",
    icon: "💬",
    color: "from-blue-500 to-indigo-600",
    description: "Restez connecté.",
  },
  {
    name: "Bazar Finance",
    category: "Finance",
    icon: "💳",
    color: "from-cyan-400 to-blue-600",
    description: "Vos finances.",
  },
  {
    name: "Bazar Play",
    category: "Divertissement",
    icon: "▶",
    color: "from-violet-500 to-fuchsia-600",
    description: "Votre favori.",
  },
];

const slides = [
  {
    kicker: "Communication",
    line1: "Restez connecté,",
    line2: "simplement.",
    accent: "from-blue-600 via-indigo-600 to-sky-500",
    glow: "rgba(59,130,246,0.35)",
  },
  {
    kicker: "Finance",
    line1: "Vos finances,",
    line2: "à portée de main.",
    accent: "from-cyan-500 via-blue-600 to-indigo-600",
    glow: "rgba(34,211,238,0.35)",
  },
  {
    kicker: "Divertissement",
    line1: "Découvrez votre",
    line2: "prochain favori.",
    accent: "from-violet-600 via-fuchsia-600 to-pink-500",
    glow: "rgba(168,85,247,0.35)",
  },
];

/* ------------------------------------------------------------------ */
/* Variants d'animation                                                */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)", rotateX: -35 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: "-0.5em",
    filter: "blur(8px)",
    transition: { duration: 0.35 },
  },
};

function Words({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordItem}
          className="mr-[0.25em] inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Écran de chargement animé                                           */
/* ------------------------------------------------------------------ */

function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [activeApp, setActiveApp] = useState(0);

  useEffect(() => {
    let raf = 0;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    let loadHandler: (() => void) | undefined;

    let pageLoaded = document.readyState === "complete";

    const start = performance.now();
    const duration = reduced ? 500 : 2400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 94));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finishWhenReady = () => {
      if (!pageLoaded) return;
      finishTimer = setTimeout(() => {
        setProgress(100);
        finishTimer = setTimeout(onDone, reduced ? 120 : 450);
      }, Math.max(0, duration - (performance.now() - start)));
    };

    if (!pageLoaded) {
      loadHandler = () => {
        pageLoaded = true;
        finishWhenReady();
      };
      window.addEventListener("load", loadHandler, { once: true });
    } else {
      finishWhenReady();
    }

    return () => {
      cancelAnimationFrame(raf);
      if (finishTimer) clearTimeout(finishTimer);
      if (loadHandler) window.removeEventListener("load", loadHandler);
    };
  }, [onDone, reduced]);

  useEffect(() => {
    if (reduced || apps.length < 2) return;
    const id = setInterval(() => {
      setActiveApp((current) => (current + 1) % apps.length);
    }, 850);
    return () => clearInterval(id);
  }, [reduced]);

  const app = apps[activeApp];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white px-5"
      initial={{ opacity: 1 }}
      exit={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(10px)", scale: 1.025 }
      }
      transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE }}
      role="status"
      aria-label="Chargement de Bazar Shop"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(219,234,254,0.8), transparent 48%), radial-gradient(circle at 15% 85%, rgba(224,231,255,0.55), transparent 38%)",
        }}
      />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <motion.div
          className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-2xl text-white shadow-[0_18px_45px_rgba(37,99,235,0.3)]"
          animate={
            reduced ? {} : { scale: [1, 1.07, 1], rotate: [0, 4, -4, 0] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>

        <p className="text-xl font-extrabold tracking-tight text-[#102653]">
          Bazar Shop
        </p>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-600">
          Vos applications, au même endroit
        </p>

        <div className="relative mt-8 flex h-40 w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={app.name}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, scale: 0.88, rotate: -3 }
              }
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, scale: 0.92, rotate: 3 }
              }
              transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE }}
              className="absolute flex w-56 items-center gap-3 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,35,80,0.12)] backdrop-blur"
            >
              {app.image ? (
                <img
                  src={app.image}
                  alt={`Capture de ${app.name}`}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <div
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${app.color} text-2xl text-white shadow-md`}
                >
                  {app.icon}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {app.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{app.category}</p>
                <p className="mt-1 text-[11px] text-blue-700">
                  {app.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-3 text-xs font-medium text-slate-500">
          Préparation de votre expérience…
        </p>

        <div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-xs font-semibold tabular-nums text-slate-500">
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Cartes 3D inclinées                                                 */
/* ------------------------------------------------------------------ */

function TiltCard({
  app,
  className = "",
  delay = 0,
  reduced,
}: {
  app: AppItem;
  className?: string;
  delay?: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  /* Typage explicite du tuple pour TS strict */
  const glare = useTransform<number, string>(
    [glareX, glareY] as const,
    ([gx, gy]: [string, string]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.75) 0%, transparent 55%)`
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={reduced ? false : { opacity: 0, y: 30, scale: 0.9 }}
      animate={
        reduced ? { opacity: 1 } : { opacity: 1, y: [0, -10, 0], scale: 1 }
      }
      transition={
        reduced
          ? { duration: 0.2 }
          : {
              opacity: { duration: 0.7, delay },
              scale: { duration: 0.7, delay, ease: EASE },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.4,
              },
            }
      }
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-40 cursor-pointer rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_18px_55px_rgba(15,35,80,0.15)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(15,35,80,0.28)] sm:w-44"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <motion.div className="absolute -inset-1" style={{ background: glare }} />
        </motion.div>

        <div style={{ transform: "translateZ(30px)" }} className="relative">
          <div
            className={`mb-2 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${app.color} text-lg text-white shadow-md`}
          >
            {app.icon}
          </div>

          <p className="text-sm font-bold text-slate-900">{app.name}</p>
          <p className="text-xs text-slate-500">{app.category}</p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-500">
              {app.description}
            </span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-50 text-blue-700">
              <Download size={12} />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero Bazar Shop                                                     */
/* ------------------------------------------------------------------ */

export default function BazarShopHero() {
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  const DUR = 5000;

  useEffect(() => {
    if (reduced || paused || loading) return;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, DUR);
    return () => clearTimeout(id);
  }, [active, reduced, paused, loading]);

  const slide = slides[active];

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onDone={handleLoaderDone} />}
      </AnimatePresence>

      <motion.section
        id="accueil"
        className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-white pt-24 text-slate-900"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: reduced ? 0.2 : 0.8, ease: EASE }}
        onAnimationComplete={() => {
          if (!loading) setReady(true);
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          animate={
            reduced
              ? {}
              : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          }
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(55% 55% at 15% 20%, rgba(219,234,254,0.85) 0%, transparent 60%), radial-gradient(50% 50% at 85% 10%, rgba(224,231,255,0.75) 0%, transparent 60%)",
            backgroundSize: "180% 180%",
          }}
        />

        <AnimatePresence>
          <motion.div
            key={`glow-${active}`}
            aria-hidden
            className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full blur-[120px]"
            style={{ background: slide.glow }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: EASE }}
          />
        </AnimatePresence>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-10">
          {/* Texte */}
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm"
            >
              <Sparkles size={15} className="text-blue-600" />
              Vos prochaines applications préférées
            </motion.div>

            <div className="relative min-h-[260px] sm:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={wordContainer}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  exit="exit"
                  className="absolute inset-0"
                  style={{ perspective: 800 }}
                >
                  <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                    <span className="h-px w-8 bg-blue-300" />
                    {slide.kicker}
                  </p>

                  <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-[#102653] sm:text-6xl lg:text-7xl">
                    <Words text={slide.line1} />
                    <br />
                    <span
                      className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
                    >
                      <Words text={slide.line2} />
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-lg leading-8 text-slate-600"
            >
              Bienvenue sur Bazar Shop, votre espace pour découvrir des
              applications mobiles pratiques et pensées pour vous simplifier
              la vie.
            </motion.p>

            <div className="mt-6 flex items-center gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setPaused(false);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className="relative h-1 overflow-hidden rounded-full bg-slate-200 transition-all"
                  style={{ width: i === active ? 56 : 20 }}
                >
                  {i === active && (
                    <motion.span
                      key={`bar-${active}-${paused}-${loading}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: reduced || loading ? 0 : DUR / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#applications"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102653] px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-900"
              >
                Découvrir
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#applications"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-[#102653]"
              >
                Explorer
                <ArrowDown size={17} />
              </a>
            </motion.div>
          </div>

          {/* Visuel */}
          <div className="relative mx-auto flex h-[460px] w-full max-w-[540px] items-center justify-center sm:h-[540px]">
            <motion.div
              aria-hidden
              className="absolute h-[320px] w-[320px] rounded-full border border-blue-100 sm:h-[400px] sm:w-[400px]"
              animate={reduced ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              aria-hidden
              className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-indigo-200 sm:h-[330px] sm:w-[330px]"
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: 40, rotate: 6, scale: 0.88 }
              }
              animate={
                ready
                  ? reduced
                    ? { opacity: 1 }
                    : { opacity: 1, y: [0, -8, 0], rotate: 0, scale: 1 }
                  : { opacity: 0 }
              }
              transition={
                reduced
                  ? { duration: 0.2 }
                  : {
                      opacity: { duration: 0.9, delay: 0.25, ease: EASE },
                      scale: { duration: 0.9, delay: 0.25, ease: EASE },
                      rotate: { duration: 0.9, delay: 0.25, ease: EASE },
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              className="relative z-10 h-[360px] w-[185px] rounded-[2.5rem] border-[7px] border-[#102653] bg-[#102653] p-2 shadow-[0_35px_90px_rgba(16,38,83,0.3)] sm:h-[420px] sm:w-[210px]"
            >
              <div className="flex h-full flex-col rounded-[1.9rem] bg-gradient-to-b from-blue-50 via-white to-indigo-50 p-3">
                <div className="mx-auto h-4 w-16 rounded-full bg-[#102653]" />

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Bazar Shop
                </p>
                <p className="mt-1 text-lg font-extrabold leading-tight text-[#102653]">
                  Le meilleur
                  <br />
                  de vos applis.
                </p>

                <div className="mt-4 rounded-xl bg-white p-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      ✦
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-800">
                        Bazar Connect
                      </p>
                      <p className="text-[8px] text-slate-500">
                        Communiquez facilement
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100" />
                  <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-100" />
                  <div className="mt-2 rounded-md bg-[#102653] py-1.5 text-center text-[8px] font-semibold text-white">
                    Découvrir
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {apps.slice(1).map((a) => (
                    <div
                      key={a.name}
                      className="rounded-lg bg-white p-1.5 shadow-sm"
                    >
                      <div
                        className={`grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br ${a.color} text-[10px] text-white`}
                      >
                        {a.icon}
                      </div>
                      <p className="mt-1 truncate text-[8px] font-bold text-slate-800">
                        {a.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {ready && (
              <>
                <TiltCard
                  app={apps[0]}
                  className="left-0 top-14 sm:left-2 sm:top-16"
                  delay={0.5}
                  reduced={reduced}
                />
                <TiltCard
                  app={apps[1]}
                  className="bottom-12 right-0 sm:bottom-14 sm:right-2"
                  delay={0.75}
                  reduced={reduced}
                />
              </>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}