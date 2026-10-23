"use client";

import { useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuClock,
  LuLoader,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuPhone,
  LuSend,
  LuSparkles,
  LuUser,
} from "react-icons/lu";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const contactInfos = [
  {
    icon: LuMail,
    label: "Email",
    value: "contact@bazarshop.com",
    href: "mailto:contact@bazarshop.com",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: LuPhone,
    label: "Téléphone",
    value: "+237 6 00 00 00 00",
    href: "tel:+237600000000",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: LuMapPin,
    label: "Adresse",
    value: "Douala, Cameroun",
    href: "#",
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    icon: LuClock,
    label: "Disponibilité",
    value: "Lun – Ven · 9h – 18h",
    href: "#",
    color: "from-amber-400 to-orange-500",
  },
];

const faqs = [
  {
    q: "Comment vous contacter rapidement ?",
    a: "Le formulaire ci-contre est le moyen le plus direct : nous répondons généralement sous 24 h ouvrées. Pour une urgence, utilisez l'adresse email directement.",
  },
  {
    q: "Proposez-vous un support pour les applications ?",
    a: "Oui. Chaque application dispose d'un support dédié. Précisez le nom de l'application dans votre message pour un traitement plus rapide.",
  },
  {
    q: "Puis-je suggérer une nouvelle application ?",
    a: "Absolument. Chaque suggestion est lue et étudiée. Décrivez le besoin que vous souhaitez résoudre, pas seulement la solution technique.",
  },
  {
    q: "Travaillez-vous avec des partenaires ?",
    a: "Nous sommes ouverts aux collaborations qui partagent nos valeurs : simplicité, respect de la vie privée et utilité concrète.",
  },
];

/* ------------------------------------------------------------------ */
/*  Champ de formulaire animé                                          */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  textarea,
  reduced,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  reduced: boolean | null;
}) {
  const [focused, setFocused] = useState(false);

  const base =
    "peer w-full rounded-xl border bg-white/90 px-4 py-3 pl-11 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400";

  const state = error
    ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
    : focused
      ? "border-blue-400 ring-4 ring-blue-100"
      : "border-slate-200 hover:border-slate-300";

  return (
    <motion.div variants={itemVariants} className="relative">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
      >
        {label}
      </label>

      <div className="relative">
        {/* Icône animée */}
        <motion.span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          animate={
            reduced
              ? {}
              : {
                  color: focused || value ? "#2563eb" : "#94a3b8",
                  scale: focused ? 1.1 : 1,
                }
          }
          transition={{ duration: 0.25 }}
        >
          <Icon size={16} />
        </motion.span>

        {textarea ? (
          <textarea
            id={id}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className={`${base} ${state} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className={`${base} ${state}`}
          />
        )}

        {/* Barre de focus animée */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 text-xs font-medium text-rose-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordéon FAQ                                                      */
/* ------------------------------------------------------------------ */

function FaqItem({
  q,
  a,
  index,
  reduced,
}: {
  q: string;
  a: string;
  index: number;
  reduced: boolean | null;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_40px_rgba(15,35,80,0.05)]"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-[#102653] sm:text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700"
        >
          <LuChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Contact                                                       */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const reduced = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const setField = (key: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Votre nom est requis.";
    if (!form.email.trim()) e.email = "Votre email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Format d'email invalide.";
    if (!form.subject.trim()) e.subject = "Précisez un sujet.";
    if (form.message.trim().length < 12)
      e.message = "Décrivez votre message (12 caractères min.).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate() || status === "sending") return;

    setStatus("sending");
    /* Simulation d'envoi — remplace par un fetch vers ton API */
    await new Promise((r) => setTimeout(r, reduced ? 400 : 1400));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 4200);
  };

  return (
    <main className="relative isolate overflow-hidden bg-white text-slate-900">
      {/* Décor de fond */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        animate={
          reduced
            ? {}
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(55% 55% at 15% 10%, rgba(219,234,254,0.9) 0%, transparent 60%), radial-gradient(50% 50% at 85% 25%, rgba(224,231,255,0.75) 0%, transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(186,230,253,0.55) 0%, transparent 60%)",
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
            Nous sommes à votre écoute
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#102653] sm:text-5xl lg:text-6xl"
          >
            Parlons de votre
            <br />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              prochain projet.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Une question, une suggestion ou une idée ? Notre équipe vous répond
            sous 24 h ouvrées. Chaque message est lu avec attention.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ FORMULAIRE + INFOS ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* ---------- Formulaire ---------- */}
          <motion.form
            onSubmit={onSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_25px_70px_rgba(15,35,80,0.10)] backdrop-blur sm:p-8"
          >
            {/* Halo animé */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-200/60 blur-3xl"
              animate={
                reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <h2 className="text-xl font-extrabold text-[#102653] sm:text-2xl">
                Envoyez-nous un message
              </h2>
              <p className="mt-1.5 text-sm text-slate-600">
                Tous les champs sont requis. Réponse sous 24 h ouvrées.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Nom complet"
                  placeholder="Awa Ndiaye"
                  icon={LuUser}
                  value={form.name}
                  onChange={setField("name")}
                  error={errors.name}
                  reduced={reduced}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="vous@exemple.com"
                  icon={LuMail}
                  value={form.email}
                  onChange={setField("email")}
                  error={errors.email}
                  reduced={reduced}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="subject"
                  label="Sujet"
                  placeholder="Une question sur Bazar Finance…"
                  icon={LuMessageSquare}
                  value={form.subject}
                  onChange={setField("subject")}
                  error={errors.subject}
                  reduced={reduced}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="message"
                  label="Message"
                  placeholder="Décrivez votre demande…"
                  icon={LuSend}
                  value={form.message}
                  onChange={setField("message")}
                  error={errors.message}
                  textarea
                  reduced={reduced}
                />
              </div>

              {/* Bouton d'envoi avec états animés */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={reduced || status === "sending" ? {} : { y: -2 }}
                whileTap={reduced ? {} : { scale: 0.98 }}
                className="group relative mt-6 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#102653] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-90"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={reduced ? {} : { rotate: 360 }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-flex"
                      >
                        <LuLoader size={18} />
                      </motion.span>
                      Envoi en cours…
                    </motion.span>
                  ) : status === "sent" ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex items-center gap-2"
                    >
                      <LuCheck size={18} />
                      Message envoyé !
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      Envoyer le message
                      <LuArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Confirmation */}
              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                        <LuCheck size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-emerald-900">
                          Merci, votre message est bien parti.
                        </p>
                        <p className="mt-0.5 text-xs text-emerald-700">
                          Nous vous répondrons à l'adresse indiquée sous 24 h
                          ouvrées.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* ---------- Coordonnées ---------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {contactInfos.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={itemVariants}
                  whileHover={reduced ? {} : { y: -4 }}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_40px_rgba(15,35,80,0.06)] backdrop-blur transition-shadow hover:shadow-[0_20px_55px_rgba(15,35,80,0.12)]"
                >
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/0 via-blue-50/60 to-indigo-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${info.color} text-white shadow-md`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {info.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-bold text-[#102653]">
                      {info.value}
                    </p>
                  </div>
                  <motion.span
                    className="ml-auto text-slate-400"
                    animate={reduced ? {} : { x: [0, 4, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <LuArrowRight size={16} />
                  </motion.span>
                </motion.a>
              );
            })}

            {/* Encart promesse */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#102653] via-blue-900 to-indigo-900 p-6 text-white shadow-[0_20px_60px_rgba(16,38,83,0.35)]"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/30 blur-3xl"
                animate={
                  reduced
                    ? {}
                    : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                Notre engagement
              </p>
              <p className="relative mt-2 text-sm leading-7 text-blue-50/90">
                Chaque message reçoit une réponse humaine, jamais un robot.
                Nous ne partageons jamais vos coordonnées.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-4xl px-6 pb-24 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm"
          >
            <LuSparkles size={13} />
            Questions fréquentes
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-extrabold tracking-tight text-[#102653] sm:text-4xl"
          >
            Vous avez peut-être déjà la réponse.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-3"
        >
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} reduced={reduced} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}