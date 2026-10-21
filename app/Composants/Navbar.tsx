
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineSquares2X2,
  HiOutlineHome,
  HiOutlineDevicePhoneMobile,
  HiOutlineFolder,
  HiOutlineSparkles,
  HiOutlineEnvelope,
  HiOutlineXMark,
  HiOutlineBars3,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

const NAV_LINKS = [
  { label: "Accueil", href: "/", icon: HiOutlineHome },
//   { label: "Applications", href: "/applications", icon: HiOutlineDevicePhoneMobile },
  { label: "à propos", href: "/à propos", icon: HiOutlineFolder },
  { label: "Nouveautés", href: "/nouveautes", icon: HiOutlineSparkles },
  { label: "Contact", href: "/contact", icon: HiOutlineEnvelope },
];

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: "easeOut" as const };

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="sticky top-0 z-50 w-full bg-white"
    >
      {/* Barre d'annonce
      <AnimatePresence initial={false}>
        {announcementVisible && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={transition}
            className="overflow-hidden bg-[#0B1F3A] text-white"
          >
            <div className="relative flex min-h-9 items-center justify-center px-10 py-2">
              <p className="text-center text-xs font-medium sm:text-sm">
                Bienvenue sur Basar Shop — Découvrez et téléchargez vos applications préférées !
              </p>

              <button
                type="button"
                onClick={() => setAnnouncementVisible(false)}
                aria-label="Fermer la barre d'annonce"
                className="absolute right-3 rounded-md p-1 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <HiOutlineXMark size={19} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Navigation principale */}
      <div className="border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[76px] items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Basar Shop - Accueil"
              className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A]"
            >
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                transition={transition}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-white shadow-sm transition-colors group-hover:bg-[#193B63]"
              >
                <HiOutlineSquares2X2 size={27} />
              </motion.span>

              <span className="text-xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-2xl">
                Basar Shop
              </span>
            </Link>

            {/* Liens pour ordinateur */}
            <nav
              aria-label="Navigation principale"
              className="hidden items-center gap-5 lg:flex xl:gap-7"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap rounded-md py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                      active
                        ? "text-[#0B1F3A]"
                        : "text-slate-600 hover:text-[#193B63]"
                    }`}
                  >
                    {link.label}

                    {active && (
                      <motion.span
                        layout={!reduceMotion}
                        className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#0B1F3A]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bouton d'exploration */}
            <Link
              href="/applications"
              className="hidden items-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#193B63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 lg:inline-flex"
            >
              <HiOutlineArrowDownTray size={19} />
              Telecharger les apps
            </Link>

            {/* Menu hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[#0B1F3A] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, rotate: 45 }}
                  transition={transition}
                  className="flex"
                >
                  {menuOpen ? (
                    <HiOutlineXMark size={27} />
                  ) : (
                    <HiOutlineBars3 size={27} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={transition}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-slate-200 bg-white shadow-xl lg:hidden"
          >
            <nav
              aria-label="Navigation mobile"
              className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                      active
                        ? "bg-slate-100 text-[#0B1F3A]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#193B63]"
                    }`}
                  >
                    <Icon size={21} />
                    <span>{link.label}</span>

                    {active && (
                      <motion.span
                        layoutId="mobile-active-indicator"
                        className="ml-auto h-2 w-2 rounded-full bg-[#0B1F3A]"
                      />
                    )}
                  </Link>
                );
              })}

              <div className="border-t border-slate-100 pt-3">
                <Link
                  href="/applications"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#193B63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A]"
                >
                  <HiOutlineArrowDownTray size={20} />
                  Découvrir les applications
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
