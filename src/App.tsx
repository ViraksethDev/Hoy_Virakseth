/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // High-performance scroll tracking using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Studio", href: "#studio" },
    { name: "About", href: "#about" },
    { name: "Journal", href: "#journal" },
    { name: "Reach Us", href: "#reach-us" },
  ];

  const handleOpenJourney = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsJourneyModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id.charAt(0).toUpperCase() + id.slice(1).replace("-", " "));
    setMobileMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Parallax calculations for multi-plane depth
  const h1TranslateY = scrollY * -0.32;
  const h1Opacity = Math.max(0, 1 - Math.pow(scrollY / 650, 1.2));

  const subtextTranslateY = scrollY * -0.2;
  const subtextOpacity = Math.max(0, 1 - Math.pow(scrollY / 550, 1.2));

  const ctaTranslateY = scrollY * -0.12;
  const ctaOpacity = Math.max(0, 1 - Math.pow(scrollY / 480, 1.2));

  const videoScale = 1 + Math.min(scrollY * 0.00015, 0.06);
  const videoTranslateY = scrollY * 0.05;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden selection:bg-white/20 selection:text-white bg-background text-foreground">
      {/* Background Video with Subtle Parallax Depth */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{
          transform: `scale(${videoScale}) translate3d(0, ${videoTranslateY}px, 0)`,
          willChange: "transform",
        }}
      >
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
      </div>

      {/* Navigation Bar (Glassmorphic & Adaptive Sticky) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 30
            ? "bg-[#001730]/75 backdrop-blur-md border-b border-white/10 py-4 shadow-xl shadow-black/20"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="flex row items-center justify-between px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="text-3xl tracking-tight text-foreground select-none transition-opacity hover:opacity-90 flex items-baseline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah
            <sup className="text-xs ml-0.5 tracking-normal">®</sup>
          </a>

          {/* Nav links (hidden on mobile, md:flex) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const tabKey = item.name.toLowerCase().replace(" ", "-");
              const isActive =
                activeTab === item.name ||
                (activeTab === "Home" && item.name === "Home" && scrollY < 300);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(tabKey);
                  }}
                  className={`text-sm transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Sound Toggle + Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
              className="liquid-glass rounded-full p-2.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              aria-label="Toggle ambient sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleOpenJourney}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer hidden sm:inline-flex items-center justify-center font-normal"
            >
              Begin Journey
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass rounded-full p-2.5 text-foreground md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pt-3 pb-6 max-w-7xl mx-auto">
            <div className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 border border-white/10 backdrop-blur-xl">
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const tabKey = item.name.toLowerCase().replace(" ", "-");
                  const isActive = activeTab === item.name;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(tabKey);
                      }}
                      className={`text-base py-1.5 transition-colors cursor-pointer ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </nav>
              <button
                type="button"
                onClick={handleOpenJourney}
                className="liquid-glass rounded-full px-6 py-3 text-sm text-foreground text-center mt-2 cursor-pointer"
              >
                Begin Journey
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Container */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 max-w-7xl mx-auto w-full"
      >
        {/* Parallax Layer 1: H1 Heading (Drifts at 0.32x scroll speed) */}
        <div
          style={{
            transform: `translate3d(0, ${h1TranslateY}px, 0)`,
            opacity: h1Opacity,
            willChange: "transform, opacity",
          }}
          className="transition-transform duration-75 ease-out"
        >
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground select-text"
          >
            Where <em className="not-italic text-muted-foreground">dreams</em> rise{" "}
            <em className="not-italic text-muted-foreground">through the silence.</em>
          </h1>
        </div>

        {/* Parallax Layer 2: Subtext (Drifts at 0.20x scroll speed) */}
        <div
          style={{
            transform: `translate3d(0, ${subtextTranslateY}px, 0)`,
            opacity: subtextOpacity,
            willChange: "transform, opacity",
          }}
          className="transition-transform duration-75 ease-out"
        >
          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-normal">
            We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the
            chaos, we build digital spaces for sharp focus and inspired work.
          </p>
        </div>

        {/* Parallax Layer 3: CTA Button (Drifts at 0.12x scroll speed) */}
        <div
          style={{
            transform: `translate3d(0, ${ctaTranslateY}px, 0)`,
            opacity: ctaOpacity,
            willChange: "transform, opacity",
          }}
          className="transition-transform duration-75 ease-out"
        >
          <button
            type="button"
            onClick={handleOpenJourney}
            className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer transition-transform duration-300 font-normal group inline-flex items-center gap-2"
          >
            <span>Begin Journey</span>
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollY / 180) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-300 pointer-events-auto"
          onClick={() => scrollToSection("studio")}
        >
          <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground font-medium">
            Scroll to Drift
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce opacity-80" />
        </div>
      </section>

      {/* Continuation Section: Studio / Artifacts of Focus */}
      <section
        id="studio"
        className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full border-t border-white/5"
      >
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            The Studio Architecture
          </p>
          <h2
            className="text-4xl sm:text-6xl text-foreground font-normal leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Sanctuaries designed for unbroken clarity.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-6 leading-relaxed">
            Every millimeter is tuned to reduce cognitive friction. We remove superfluous chrome to
            leave you alone with your most ambitious ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Acoustic Silence",
              desc: "Visual noise cancellation tailored for the restless mind. Pure ambient flow with zero intrusive notifications.",
            },
            {
              num: "02",
              title: "Kinetic Cadence",
              desc: "Interfaces that respond with deliberate, organic inertia. Every interaction feels weighted, intentional, and calm.",
            },
            {
              num: "03",
              title: "Private Horizons",
              desc: "Offline-first architectures that preserve your thought sanctuary. Uncompromised privacy for your craft.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="liquid-glass rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 border border-white/10"
            >
              <div>
                <span className="text-xs font-mono text-muted-foreground tracking-widest block mb-6">
                  {item.num} / THREE TENETS
                </span>
                <h3
                  className="text-2xl text-foreground mb-3 font-normal"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-8">
                <button
                  type="button"
                  onClick={handleOpenJourney}
                  className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore system</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continuation Section: About / The Manifesto */}
      <section
        id="about"
        className="relative z-10 py-32 px-6 max-w-5xl mx-auto w-full text-center border-t border-white/5"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-6">
          Manifesto
        </span>
        <blockquote
          className="text-3xl sm:text-5xl md:text-6xl text-foreground font-normal leading-[1.15] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          &ldquo;In an age that demands endless velocity, the ultimate act of creative courage is to
          stand still and build something that endures.&rdquo;
        </blockquote>
        <p className="text-muted-foreground text-sm sm:text-base mt-8 max-w-xl mx-auto leading-relaxed">
          Velorah was founded on the conviction that depth requires stillness. We craft instruments
          that protect your attention rather than monetizing it.
        </p>
      </section>

      {/* Continuation Section: Journal */}
      <section
        id="journal"
        className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Journal &bull; Dispatches
            </p>
            <h2
              className="text-4xl sm:text-5xl text-foreground font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Notes on quietude and craft.
            </h2>
          </div>
          <button
            type="button"
            onClick={handleOpenJourney}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>View all dispatches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              date: "October 2026",
              title: "On the Architecture of Solitude",
              read: "04 min read",
            },
            {
              date: "September 2026",
              title: "Designing for Cognitive Stillness",
              read: "07 min read",
            },
            {
              date: "August 2026",
              title: "The Return to Tangible Digital Instruments",
              read: "05 min read",
            },
          ].map((article, i) => (
            <div
              key={i}
              onClick={handleOpenJourney}
              className="liquid-glass rounded-2xl p-7 flex flex-col justify-between cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-6 font-mono">
                <span>{article.date}</span>
                <span>{article.read}</span>
              </div>
              <h3
                className="text-2xl text-foreground font-normal mb-8 group-hover:text-white transition-colors"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {article.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                <span>Read Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continuation Section: Reach Us */}
      <section
        id="reach-us"
        className="relative z-10 py-28 px-6 max-w-4xl mx-auto w-full text-center border-t border-white/5"
      >
        <div className="liquid-glass rounded-3xl p-10 sm:p-14 border border-white/10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Private Inquiries
          </p>
          <h2
            className="text-3xl sm:text-5xl text-foreground font-normal mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Connect with the atelier.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Whether inquiring about tailored studio installations, commissions, or private access,
            our doors open quietly.
          </p>
          <button
            type="button"
            onClick={handleOpenJourney}
            className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
          >
            Send Private Message
          </button>
        </div>
      </section>

      {/* Minimalist Cinematic Footer */}
      <footer className="relative z-10 py-10 px-8 border-t border-white/5 text-xs text-muted-foreground/60 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-light">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Velorah®
          </span>
          <span>&bull;</span>
          <span>Zurich &bull; Kyoto &bull; San Francisco</span>
        </div>
        <div className="tracking-widest">
          ALL RIGHTS RESERVED &bull; MMXXVI
        </div>
      </footer>

      {/* Interactive Modal: Begin Journey */}
      {isJourneyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md animate-fade-rise">
          <div className="relative w-full max-w-md liquid-glass rounded-3xl p-8 border border-white/10 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setIsJourneyModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 transition-colors rounded-full"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-foreground bg-white/5 border border-white/10 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-white/80" />
                  <span>Early Access Chapter I</span>
                </div>

                <h3
                  className="text-3xl text-foreground mb-3 leading-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Step into the silence.
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Velorah crafts refined environments for mindful creation. Enter your email to
                  receive private early access to the sanctuary.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-full text-sm bg-white/5 border border-white/15 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full liquid-glass rounded-full py-3.5 px-6 text-sm text-foreground font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    Request Private Invitation
                  </button>
                </form>

                <p className="text-[11px] text-muted-foreground/60 mt-4 text-center">
                  Zero noise. No marketing spam. Unsubscribe at any time.
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl text-foreground mb-2"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Your presence is noted.
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We have reserved your invitation for{" "}
                  <span className="text-foreground font-medium">{email}</span>. A discreet dispatch
                  will arrive when the gates open.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsJourneyModalOpen(false);
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="liquid-glass rounded-full px-8 py-2.5 text-sm text-foreground hover:scale-[1.02] cursor-pointer"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
