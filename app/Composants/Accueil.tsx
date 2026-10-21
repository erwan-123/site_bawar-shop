"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  LuArrowDown,
  LuArrowRight,
  LuDownload,
  LuSparkles,
} from "react-icons/lu";

/* ================================================================== */
/*  Données                                                            */
/* ================================================================== */

type AppItem = {
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
};

const apps: AppItem[] = [
  {
    name: "Bazar Connect",
    category: "Communication",
    icon: "💬",
    color: "from-blue-500 to-indigo-600",
    description: "Restez connecté, simplement.",
  },
  {
    name: "Bazar Finance",
    category: "Finance",
    icon: "💳",
    color: "from-cyan-400 to-blue-600",
    description: "Vos finances à portée de main.",
  },
  {
    name: "Bazar Play",
    category: "Divertissement",
    icon: "▶",
    color: "from-violet-500 to-fuchsia-600",
    description: "Découvrez votre prochain favori.",
  },
];

type Slide = {
  kicker: string;
  line1: string;
  line2: string;
  accent: string;
  glow: string;
};

const slides: Slide[] = [
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

/* ================================================================== */
/*  Variants Motion                                                    */
/* ================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.1 },
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
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

/* ================================================================== */
/*  Écran de chargement                                                */
/* ================================================================== */

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  /* Progression simulée + verrouillage sur le chargement réel */
  useEffect(() => {
    let raf = 0;
    let mounted = true;

    const start = performance.now();
    const MIN_DURATION = reducedMotion ? 400 : 1900;
    const TARGET = 92;

    const tick = (now: number) => {
      if (!mounted) return;
      const t = Math.min((now - start) / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * TARGET));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* Attendre à la fois la durée mini ET le vrai chargement du document */
    const finish = () => {
      if (!mounted) return;
      setProgress(100);
      setTimeout(onDone, reducedMotion ? 120 : 520);
    };

    const delay = new Promise<void>((resolve) =>
      setTimeout(resolve, MIN_DURATION)
    );
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true })
          );

    Promise.all([delay, loaded]).then(finish);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, [onDone, reducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(12px)", scale: 1.04 }
      }
      transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: EASE }}
    >
      {/* Décor de fond */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={
          reducedMotion
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 30% 30%, rgba(219,234,254,0.9) 0%, transparent 60%), radial-gradient(45% 45% at 75% 70%, rgba(224,231,255,0.8) 0%, transparent 60%)",
          backgroundSize: "160% 160%",
        }}
      />

      {/* Logo animé */}
      <div className="relative mb-10 flex items-center justify-center">
        <motion.span
          className="absolute h-24 w-24 rounded-full border border-blue-200"
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute h-24 w-24 rounded-full border border-dashed border-indigo-300"
          animate={reducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-2xl text-white shadow-[0_18px_45px_rgba(37,99,235,0.35)]"
          animate={
            reducedMotion
              ? {}
              : { scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      </div>

      {/* Nom */}
      <motion.p
        className="mb-1 text-lg font-extrabold tracking-tight text-[#102653]"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        Bazar Shop
      </motion.p>
      <motion.p
        className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-blue-600"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Chargement
      </motion.p>

      {/* Barre de progression */}
      <div className="relative h-1 w-56 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>

      <p className="mt-3 text-xs font-semibold tabular-nums text-slate-500">
        {progress}%
      </p>
    </motion.div>
  );
}

/* ================================================================== */
/*  Composant mot animé                                                */
/* ================================================================== */

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
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

/* ================================================================== */
/*  Carte flottante                                                    */
/* ================================================================== */

function FloatingAppCard({
  app,
  className = "",
  delay = 0,
  reducedMotion,
}: {
  app: AppItem;
  className?: string;
  delay?: number;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.9 }}
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: [0, -12, 0], scale: 1 }
      }
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : {
              opacity: { duration: 0.7, delay },
              scale: { duration: 0.7, delay, ease: EASE },
              y: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.4,
              },
            }
      }
    >
      <div className="group w-44 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_18px_55px_rgba(15,35,80,0.15)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,35,80,0.22)] sm:w-48">
        <div
          className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${app.color} text-xl text-white shadow-md`}
        >
          {app.icon}
        </div>
        <p className="text-sm font-bold text-slate-900">{app.name}</p>
        <p className="mt-0.5 text-xs text-slate-500">{app.category}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500">
            {app.description}
          </span>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-100">
            <LuDownload size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  Hero                                                               */
/* ================================================================== */

export default function BazarShopHero() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const SLIDE_DURATION = 5200;

  /* Rotation auto du diaporama */
  useEffect(() => {
    if (reducedMotion || paused || loading) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearTimeout(id);
  }, [active, reducedMotion, paused, loading]);

  const slide = slides[active];

  return (
    <>
      {/* ================= LOADER ================= */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ================= CONTENU ================= */}
      <motion.section
        className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-white text-slate-900"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        initial={false}
        animate={loading ? { opacity: 0, scale: 0.985 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: EASE }}
        onAnimationComplete={() => {
          if (!loading) setReady(true);
        }}
      >
        {/* ============ Décor de fond animé ============ */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          animate={
            reducedMotion
              ? {}
              : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          }
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(55% 55% at 15% 20%, rgba(219,234,254,0.85) 0%, transparent 60%), radial-gradient(50% 50% at 85% 10%, rgba(224,231,255,0.75) 0%, transparent 60%), radial-gradient(60% 60% at 75% 95%, rgba(186,230,253,0.6) 0%, transparent 60%)",
            backgroundSize: "180% 180%",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(#102653_1px,transparent_1px)] [background-size:26px_26px]"
        />

        {/* Halo coloré contextuel */}
        <AnimatePresence>
          <motion.div
            key={`glow-${active}`}
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full blur-[120px]"
            style={{ background: slide.glow }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </AnimatePresence>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:px-10">
          {/* ================= Colonne texte ================= */}
          <div className="relative z-10 max-w-xl">
            {/* Badge */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm backdrop-blur"
            >
              <motion.span
                animate={
                  reducedMotion
                    ? {}
                    : { rotate: [0, 18, -12, 0], scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <LuSparkles size={15} className="text-blue-600" />
              </motion.span>
              Vos prochaines applications préférées
            </motion.div>

            {/* ---- Zone diaporama ---- */}
            <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
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
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: EASE },
                      },
                      exit: { opacity: 0, x: -10 },
                    }}
                    className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-blue-600"
                  >
                    <span className="h-px w-8 bg-blue-300" />
                    {slide.kicker}
                  </motion.p>

                  <h1 className="text-[2.75rem] font-extrabold leading-[1.04] tracking-tight text-[#102653] sm:text-6xl lg:text-[4.25rem]">
                    <AnimatedWords text={slide.line1} />
                    <br />
                    <span
                      className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
                    >
                      <AnimatedWords text={slide.line2} />
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-lg leading-8 text-slate-600"
            >
              Bienvenue sur Bazar Shop, votre espace pour découvrir des
              applications mobiles pratiques, innovantes et pensées pour vous
              simplifier la vie.
            </motion.p>

            {/* Indicateurs */}
            <div className="mt-7 flex items-center gap-2.5" aria-hidden="true">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setPaused(false);
                  }}
                  aria-label={`Aller au slide ${i + 1}`}
                  className="relative h-1 overflow-hidden rounded-full bg-slate-200 transition-all duration-300"
                  style={{ width: i === active ? 56 : 20 }}
                >
                  {i === active && (
                    <motion.span
                      key={`bar-${active}-${paused}-${loading}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration:
                          reducedMotion || loading ? 0 : SLIDE_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Boutons */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#applications"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102653] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                Découvrir les applications
                <LuArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#applications"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-[#102653] backdrop-blur transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                Explorer le catalogue
                <LuArrowDown size={17} />
              </a>
            </motion.div>

            {/* Avatars */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 flex items-center gap-3 text-sm text-slate-500"
            >
              <span className="flex -space-x-2" aria-hidden="true">
                {["📱", "✨", "🚀"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-blue-50 text-xs"
                    animate={reducedMotion ? {} : { y: [0, -4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.28,
                    }}
                  >
                    {e}
                  </motion.span>
                ))}
              </span>
              <span>Des applis à découvrir, en quelques clics.</span>
            </motion.div>
          </div>

          {/* ================= Colonne visuelle ================= */}
          <div className="relative mx-auto flex h-[480px] w-full max-w-[540px] items-center justify-center sm:h-[560px]">
            <motion.div
              aria-hidden="true"
              className="absolute h-[340px] w-[340px] rounded-full border border-blue-100 sm:h-[420px] sm:w-[420px]"
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute h-[280px] w-[280px] rounded-full border border-dashed border-indigo-200 sm:h-[350px] sm:w-[350px]"
              animate={reducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute h-[300px] w-[300px] rounded-full bg-blue-400/25 blur-[80px] sm:h-[360px] sm:w-[360px]"
              animate={
                reducedMotion
                  ? {}
                  : { scale: [1, 1.15, 1], opacity: [0.45, 0.8, 0.45] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Smartphone */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 40, rotate: 6, scale: 0.88 }
              }
              animate={
                ready
                  ? reducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: [0, -9, 0], rotate: 0, scale: 1 }
                  : reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 40, rotate: 6, scale: 0.88 }
              }
              transition={
                reducedMotion
                  ? { duration: 0.2 }
                  : {
                      opacity: { duration: 0.9, delay: 0.25, ease: EASE },
                      rotate: { duration: 0.9, delay: 0.25, ease: EASE },
                      scale: { duration: 0.9, delay: 0.25, ease: EASE },
                      y: {
                        duration: 6.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              className="relative z-10 h-[370px] w-[190px] rounded-[2.5rem] border-[7px] border-[#102653] bg-[#102653] p-2 shadow-[0_35px_90px_rgba(16,38,83,0.3)] sm:h-[440px] sm:w-[220px]"
            >
              <div className="relative h-full overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-blue-50 via-white to-indigo-50">
                <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-[#102653]" />

                <div className="px-3 pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                    Bazar Shop
                  </p>
                  <p className="mt-2 text-xl font-extrabold leading-tight text-[#102653]">
                    Le meilleur
                    <br />
                    de vos applis.
                  </p>

                  <motion.div
                    className="mt-4 rounded-2xl bg-white p-3 shadow-sm"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
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
                    <div className="mt-3 h-2 rounded-full bg-slate-100" />
                    <div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-100" />
                    <div className="mt-3 rounded-lg bg-[#102653] py-2 text-center text-[9px] font-semibold text-white">
                      Découvrir l’appli
                    </div>
                  </motion.div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {apps.slice(1).map((app, i) => (
                      <motion.div
                        key={app.name}
                        className="rounded-xl bg-white p-2 shadow-sm"
                        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={ready ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: 0.85 + i * 0.12,
                          ease: EASE,
                        }}
                      >
                        <div
                          className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${app.color} text-xs text-white`}
                        >
                          {app.icon}
                        </div>
                        <p className="mt-2 truncate text-[9px] font-bold text-slate-800">
                          {app.name}
                        </p>
                        <p className="mt-0.5 text-[8px] text-slate-500">
                          {app.category}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-3 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-[#102653]/25" />
              </div>
            </motion.div>

            {/* Cartes flottantes — apparaissent après le hero */}
            {ready && (
              <>
                <FloatingAppCard
                  app={apps[0]}
                  className="left-0 top-14 sm:left-2 sm:top-16"
                  delay={0.5}
                  reducedMotion={reducedMotion}
                />
                <FloatingAppCard
                  app={apps[1]}
                  className="bottom-12 right-0 sm:bottom-14 sm:right-2"
                  delay={0.75}
                  reducedMotion={reducedMotion}
                />
              </>
            )}

            <motion.div
              className="absolute right-7 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-white bg-white/90 text-blue-700 shadow-lg sm:right-12 sm:top-8"
              animate={
                reducedMotion ? {} : { y: [0, -10, 0], rotate: [0, 8, 0] }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              <LuSparkles size={21} />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}