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

const WHATSAPP_NUMBER = "6502348574"; // sans + ni espaces
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Bazar Shop, je vous contacte depuis votre site."
);

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
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
      {/* Petit label animé au survol */}
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
        {/* Halo pulsé */}
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

      {/* Texte sous le bouton */}
      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#102653] shadow-sm ring-1 ring-slate-200 backdrop-blur">
        Contactez-nous
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Champ de formulaire                                                */
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
}) {
  const [focused, setFocused] = useState(false);

  const base =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400";
  const state = error
    ? "border-rose-300 focus:border-rose-500"
    : focused
      ? "border-blue-500"
      : "border-slate-200 hover:border-slate-300";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            focused ? "text-blue-600" : "text-slate-400"
          }`}
        />

        {textarea ? (
          <textarea
            id={id}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className={`${base} ${state} resize-none pl-10`}
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
            className={`${base} ${state} pl-10`}
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-xs font-medium text-rose-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
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

  /* Verrouille le scroll du body pendant l'envoi (optionnel) */
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
    if (!form.name.trim()) e.name = "Nom requis.";
    if (!form.email.trim()) e.email = "Email requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide.";
    if (!form.subject.trim()) e.subject = "Sujet requis.";
    if (form.message.trim().length < 10)
      e.message = "Message trop court (10 caractères min.).";
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
    <main className="relative min-h-screen bg-white text-slate-900">
      {/* Bandeau haut discret */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm text-white">
              ✦
            </span>
            <span className="text-sm font-extrabold text-[#102653]">
              Bazar Shop
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Contact
          </span>
        </div>
      </div>

      {/* ============ En-tête ============ */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 text-center lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600"
          >
            Contact
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-tight tracking-tight text-[#102653] sm:text-5xl"
          >
            Une question ?
            <br />
            <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Nous sommes là.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Écrivez-nous via le formulaire ou discutez directement sur
            WhatsApp. Réponse humaine sous 24 h ouvrées.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ Formulaire + coordonnées ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Formulaire */}
          <motion.form
            onSubmit={onSubmit}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,35,80,0.06)] sm:p-8"
          >
            <h2 className="text-lg font-bold text-[#102653] sm:text-xl">
              Envoyez-nous un message
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tous les champs sont requis.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Nom"
                placeholder="Votre nom"
                icon={LuUser}
                value={form.name}
                onChange={setField("name")}
                error={errors.name}
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
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={reduced || status === "sending" ? {} : { y: -1 }}
              whileTap={reduced ? {} : { scale: 0.99 }}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#102653] px-6 font-semibold text-white transition-colors hover:bg-blue-900 disabled:opacity-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "sending" ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                    Envoi…
                  </motion.span>
                ) : status === "sent" ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <LuCheck size={18} />
                    Message envoyé
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Envoyer
                    <LuArrowRight size={18} />
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
                  className="mt-3 text-center text-xs text-emerald-700"
                >
                  Merci ! Nous vous répondons sous 24 h ouvrées.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Coordonnées */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: LuMail,
                label: "Email",
                value: "contact@bazarshop.com",
                href: "mailto:contact@bazarshop.com",
              },
              {
                icon: LuPhone,
                label: "Téléphone",
                value: "+237 650 23 48 574",
                href: "tel:+2376502348574",
              },
              {
                icon: LuMapPin,
                label: "Adresse",
                value: "Douala, Cameroun",
                href: "#",
              },
              {
                icon: LuClock,
                label: "Horaires",
                value: "Lun – Ven · 9h – 18h",
                href: "#",
              },
            ].map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
                  whileHover={reduced ? {} : { x: 2 }}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,35,80,0.04)] transition-shadow hover:shadow-[0_15px_40px_rgba(15,35,80,0.08)]"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {info.label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-[#102653]">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* Bloc WhatsApp dans la colonne */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              whileHover={reduced ? {} : { y: -2 }}
              className="group flex items-center gap-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-4 transition-colors hover:bg-[#25D366]/10"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white shadow-md shadow-[#25D366]/30">
                <FaWhatsapp size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#128C7E]">
                  WhatsApp
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#102653]">
                  Discuter maintenant
                </p>
              </div>
              <LuArrowRight
                size={16}
                className="ml-auto text-[#25D366] transition-transform group-hover:translate-x-1"
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