"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  LuArrowRight,
  LuHeart,
  LuLightbulb,
  LuRocket,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
  LuZap,
} from "react-icons/lu";

/* ------------------------------------------------------------------ */
/*  Données                                                            */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "3", label: "Applications", icon: LuRocket },
  { value: "12k+", label: "Utilisateurs", icon: LuUsers },
  { value: "4.9", label: "Note moyenne", icon: LuSparkles },
  { value: "100%", label: "Sans publicité", icon: LuShieldCheck },
];

const values = [
  {
    icon: LuLightbulb,
    title: "Simplicité",
    text: "Des applications claires, directes et pensées pour être comprises en un coup d'œil.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: LuShieldCheck,
    title: "Confiance",
    text: "Aucune publicité intrusive, aucune revente de données. Votre vie privée reste la vôtre.",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: LuHeart,
    title: "Proximité",
    text: "Chaque application est conçue à partir de retours réels d'utilisateurs comme vous.",
    color: "from-rose-400 to-pink-600",
  },
  {
    icon: LuZap,
    title: "Performance",
    text: "Des interfaces rapides, légères et fluides, même sur les connexions les plus modestes.",
    color: "from-violet-500 to-fuchsia-600",
  },
];

const timeline = [
  {
    year: "2023",
    title: "Une idée simple",
    text: "Tout commence par un constat : les applications mobiles sont devenues indispensables, mais souvent compliquées.",
  },
  {
    year: "2024",
    title: "Bazar Connect",
    text: "Première application lancée : une messagerie simple, rapide et respectueuse de la vie privée.",
  },
  {
    year: "2025",
    title: "Bazar Finance",
    text: "Bazar Finance voit le jour pour rendre la gestion financière accessible à tous, sans jargon.",
  },
  {
    year: "Aujourd'hui",
    title: "Bazar Shop",
    text: "Un écosystème en pleine croissance, avec Bazar Play et de nouvelles applications à venir.",
  },
];

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Composants internes                                                */
/* ------------------------------------------------------------------ */

function SectionTitle({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm"
      >
        <LuSparkles size={13} />
        {kicker}
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl font-extrabold leading-tight tracking-tight text-[#102653] sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={itemVariants}
          className="mt-4 text-base leading-7 text-slate-600 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page À propos                                                      */
/* ------------------------------------------------------------------ */

export default function About() {
  const reduced = useReducedMotion();

  return (
    <main className="relative isolate overflow-hidden bg-white text-slate-900">
      {/* Décor lumineux de fond */}
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
            "radial-gradient(55% 55% at 15% 10%, rgba(219,234,254,0.85) 0%, transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(224,231,255,0.75) 0%, transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(186,230,253,0.5) 0%, transparent 60%)",
          backgroundSize: "180% 180%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(#102653_1px,transparent_1px)] [background-size:26px_26px]"
      />

      {/* ============ HERO ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm"
          >
            <motion.span
              animate={
                reduced ? {} : { rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <LuSparkles size={15} className="text-blue-600" />
            </motion.span>
            À propos de Bazar Shop
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#102653] sm:text-5xl lg:text-6xl"
          >
            Nous créons des applis
            <br />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              qui simplifient la vie.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Bazar Shop est né d'une conviction simple : la technologie doit
            être accessible, utile et respectueuse. Nous concevons des
            applications mobiles pratiques, belles et pensées pour le
            quotidien — sans publicité, sans complexité.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <a
              href="#applications"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102653] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-900"
            >
              Découvrir nos applications
              <LuArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-[#102653] transition hover:border-blue-200 hover:bg-blue-50"
            >
              Nous contacter
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={reduced ? {} : { y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-6 shadow-[0_18px_55px_rgba(15,35,80,0.08)] backdrop-blur transition-shadow hover:shadow-[0_28px_70px_rgba(15,35,80,0.15)]"
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={18} />
                </div>
                <p className="text-2xl font-extrabold tracking-tight text-[#102653] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </p>
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl"
                  animate={
                    reduced ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ============ MISSION ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <SectionTitle
          kicker="Notre mission"
          title="Rendre le numérique plus humain."
          description="Chaque application que nous créons répond à un besoin concret, sans superflu. Nous croyons qu'un bon outil est un outil qu'on oublie — parce qu'il fait simplement son travail."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={itemVariants}
                whileHover={reduced ? {} : { y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_40px_rgba(15,35,80,0.06)] transition hover:shadow-[0_20px_55px_rgba(15,35,80,0.12)]"
              >
                <div
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${v.color} text-white shadow-md`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-[#102653]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ============ HISTOIRE ============ */}
      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <SectionTitle
          kicker="Notre histoire"
          title="D'une idée à un écosystème."
        />

        <div className="relative">
          {/* Ligne verticale */}
          <motion.div
            aria-hidden
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-transparent sm:left-1/2"
            initial={reduced ? false : { scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          <ul className="space-y-10">
            {timeline.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={step.year}
                  initial={reduced ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                    isLeft ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  {/* Point */}
                  <span className="absolute left-4 top-2 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_0_4px_rgba(219,234,254,0.9)] sm:left-1/2" />

                  {/* Carte */}
                  <div
                    className={`ml-10 w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_40px_rgba(15,35,80,0.06)] sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      isLeft ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                      {step.year}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-[#102653]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102653] via-blue-900 to-indigo-900 px-8 py-14 text-center text-white shadow-[0_35px_90px_rgba(16,38,83,0.35)] sm:px-14"
        >
          {/* Halos décoratifs */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl"
            animate={
              reduced ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
            animate={
              reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Prêt à découvrir Bazar Shop ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100/90">
              Téléchargez nos applications et rejoignez une communauté qui
              croit qu'un bon outil doit rester simple.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#applications"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#102653] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Voir les applications
                <LuArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Nous écrire
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}