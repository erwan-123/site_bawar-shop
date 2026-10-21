
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiArrowUp,
  HiArrowRight,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineWrenchScrewdriver,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";

const navigation = [
  { label: "Accueil", href: "/" },

  { label: "Catégories", href: "/categories" },
  { label: "Nouveautés", href: "/nouveautes" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  {
    label: "Applications mobiles",
    href: "/categories/mobile",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    label: "Logiciels PC",
    href: "/categories/pc",
    icon: HiOutlineComputerDesktop,
  },
  {
    label: "Outils et utilitaires",
    href: "/categories/outils",
    icon: HiOutlineWrenchScrewdriver,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-slate-200 bg-white text-[#0B1F3A]"
    >
      {/* Décoration d'arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Bloc principal */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10">
          {/* Identité de la marque */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Basar Shop, accueil"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1F3A] text-xl font-extrabold text-white shadow-lg shadow-blue-950/15">
                B
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Bazar <span className="text-blue-600">Shop</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Découvrez un univers d’applications, de logiciels et d’outils
              numériques pour simplifier votre quotidien et améliorer votre
              expérience digitale.
            </p>

            <Link
              href="/applications"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Explorer les applications
              <HiArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {/* Réseaux sociaux */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Retrouvez-nous
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:-translate-y-1 hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:grid sm:grid-cols-2 sm:gap-8 lg:col-span-5"
          >
            <div>
              <h2 className="text-sm font-extrabold text-[#0B1F3A]">
                Navigation
              </h2>

              <ul className="mt-5 space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 sm:mt-0">
              <h2 className="text-sm font-extrabold text-[#0B1F3A]">
                Nos catégories
              </h2>

              <ul className="mt-5 space-y-4">
                {categories.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:underline"
                    >
                      <Icon
                        className="h-5 w-5 text-blue-600"
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact et confiance */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h2 className="text-sm font-extrabold text-[#0B1F3A]">
              Besoin d’aide ?
            </h2>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Une question ou une suggestion ? Notre page de contact vous
              permet de nous écrire.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:underline"
            >
              <HiOutlineEnvelope className="h-5 w-5" aria-hidden="true" />
              Nous contacter
            </Link>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <HiOutlineShieldCheck
                  className="mt-0.5 h-6 w-6 shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">
                    Une expérience simplifiée
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Parcourez les catégories et trouvez les outils adaptés à
                    vos besoins numériques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bas de page */}
        <div className="flex flex-col gap-5 border-t border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            © {currentYear} Basar Shop. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/confidentialite"
              className="text-xs text-slate-500 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:underline"
            >
              Confidentialité
            </Link>

            <Link
              href="/conditions"
              className="text-xs text-slate-500 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:underline"
            >
              Conditions d’utilisation
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({
                top: 0,
                behavior: shouldReduceMotion ? "auto" : "smooth",
              })}
              className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-[#0B1F3A] transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Retour en haut
              <HiArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
