"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import {
  LuArrowRight,
  LuCheck,
  LuClock,
  LuLoader,
  LuMail,
  LuMapPin,
  LuMessageCircle,
  LuPhone,
  LuSend,
  LuUser,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_NUMBER = "6502348574";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Bazar Shop, je vous contacte depuis votre site."
);

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/*  Bouton WhatsApp flottant                                           */
/* ------------------------------------------------------------------ */

function WhatsAppButton({ reduced }: { reduced: boolean | null }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 8]);
  const [hover, setHover] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
      style={{ y }}
      className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-2 sm:bottom-8 sm:right-8"
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={reduced ? false : { opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-[#102653] px-3 py-1 text-xs font-semibold text-white shadow-lg"
          >
            Discuter sur WhatsApp
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Bazar Shop sur WhatsApp"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={reduced ? {} : { scale: 1.06 }}
        whileTap={reduced ? {} : { scale: 0.95 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_rgba(37,211,102,0.45)]"
      >
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <FaWhatsapp size={26} className="relative" />
      </motion.a>

      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#102653] shadow-sm ring-1 ring-slate-200 backdrop-blur">
        Contactez-nous
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Champ avec label flottant + focus animé                            */
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
  const active = focused || value.length > 0;

  const border = error
    ? "border-rose-300"
    : focused
      ? "border-blue-500"
      : "border-slate-200 group-hover:border-slate-300";

  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
      >
        <motion.span
          animate={
            reduced
              ? {}
              : { color: active ? "#2563eb" : "#64748b", scale: active ? 1.05 : 1 }
          }
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          <Icon size={12} />
        </motion.span>
        {label}
        {error && (
          <span className="ml-auto text-[10px] font-medium normal-case tracking-normal text-rose-600">
            {error}
          </span>
        )}
      </label>

      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className={`peer w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 ${border}`}
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
            className={`peer w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 ${border}`}
          />
        )}

        {/* Barre de focus en bas du champ */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
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

  useEffect(() => {
    if (status === "sent") {
      const t = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const setField = (key: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Requis";
    if (!form.email.trim()) e.email = "Requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalide";
    if (!form.subject.trim()) e.subject = "Requis";
    if (form.message.trim().length < 10) e.message = "10 car. min.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate() || status === "sending") return;

    setStatus("sending");
    await new Promise((r) => setTimeout(r, reduced ? 400 : 1200));
    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* ============ Décor de fond ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(219,234,254,0.9) 0%, transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(224,231,255,0.75) 0%, transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(226,232,240,0.9) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(#102653_1px,transparent_1px)] [background-size:28px_28px]"
      />

      {/* ============ En-tête ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 text-center lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Contact
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#102653] sm:text-5xl lg:text-6xl"
          >
            Une question ?
            <br />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Nous sommes là.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Écrivez-nous via le formulaire ou discutez directement sur
            WhatsApp. Réponse humaine sous 24&nbsp;h ouvrées.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ Formulaire + coordonnées ============ */}
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* ---------- Formulaire en verre ---------- */}
          <motion.form
            onSubmit={onSubmit}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_25px_70px_-20px_rgba(15,35,80,0.20)] backdrop-blur-xl sm:p-9"
          >
            {/* Halo décoratif interne */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/50 blur-3xl"
              animate={
                reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-[#102653] sm:text-2xl">
                    Envoyez-nous un message
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Tous les champs sont requis.
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 sm:inline-flex">
                  ~24h
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Nom"
                  placeholder="Votre nom"
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
                  placeholder="Le sujet de votre message"
                  icon={LuMessageCircle}
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
                  placeholder="Écrivez votre message…"
                  icon={LuSend}
                  value={form.message}
                  onChange={setField("message")}
                  error={errors.message}
                  textarea
                  reduced={reduced}
                />
              </div>

              {/* Bouton */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={reduced || status === "sending" ? {} : { y: -2 }}
                whileTap={reduced ? {} : { scale: 0.99 }}
                className="group relative mt-7 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#102653] px-6 font-semibold text-white shadow-lg shadow-blue-950/25 transition-colors hover:bg-blue-900 disabled:opacity-90"
              >
                {/* Halo animé sur le bouton */}
                {!reduced && status === "idle" && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-700/0 via-blue-700/40 to-blue-700/0"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1.6,
                    }}
                  />
                )}

                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="relative flex items-center gap-2"
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
                      exit={{ opacity: 0 }}
                      className="relative flex items-center gap-2"
                    >
                      <LuCheck size={18} />
                      Message envoyé
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="relative flex items-center gap-2"
                    >
                      Envoyer
                      <LuArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-xs font-medium text-emerald-700"
                  >
                    Merci&nbsp;! Nous vous répondons sous 24&nbsp;h ouvrées.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* ---------- Colonne coordonnées ---------- */}
          <div className="flex flex-col gap-3">
            {[
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
                value: "+237 650 23 48 574",
                href: "tel:+2376502348574",
                color: "from-cyan-500 to-blue-600",
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
                label: "Horaires",
                value: "Lun – Ven · 9h – 18h",
                href: "#",
                color: "from-amber-400 to-orange-500",
              },
            ].map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  whileHover={reduced ? {} : { y: -2 }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_8px_30px_-10px_rgba(15,35,80,0.10)] backdrop-blur transition-shadow hover:shadow-[0_18px_40px_-15px_rgba(15,35,80,0.18)]"
                >
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${info.color} text-white shadow-md`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {info.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-[#102653]">
                      {info.value}
                    </p>
                  </div>
                  <LuArrowRight
                    size={15}
                    className="ml-auto text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500"
                  />
                </motion.a>
              );
            })}

            {/* Bloc WhatsApp */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              whileHover={reduced ? {} : { y: -2 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 p-4 transition-colors hover:from-[#25D366]/15 hover:to-[#128C7E]/15"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white shadow-md shadow-[#25D366]/40">
                <FaWhatsapp size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#128C7E]">
                  WhatsApp
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#102653]">
                  Discuter maintenant
                </p>
              </div>
              <LuArrowRight
                size={15}
                className="ml-auto text-[#25D366] transition-transform group-hover:translate-x-0.5"
              />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ============ Bouton WhatsApp flottant ============ */}
      <WhatsAppButton reduced={reduced} />
    </main>
  );
}