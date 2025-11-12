'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Sidebar } from './components/sidebar';
import { translations, Language } from './translations';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showScrollTop, setShowScrollTop] = useState(false);

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'en' ? 'bg' : 'en'));
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <main>
        {/* Desktop Header - Always visible */}
        <header className="hidden lg:flex sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="w-full flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div>
              <Image
                src="/logo_OTB.png"
                alt="Outside The Box Logo"
                width={120}
                height={40}
                priority
              />
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
              >
                {language === 'en' ? 'BG' : 'EN'}
              </button>

              {/* Sidebar Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Header - Mobile only */}
        <header
          className={`lg:hidden sticky top-0 z-50 flex items-center bg-white text-gray-700 justify-between px-6 py-6 transition-transform duration-300 shadow-sm border-b border-gray-200 ${
            isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <div className="flex flex-col lg:hidden">
            <Image
              src="/logo_OTB.png"
              alt="Outside The Box Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              aria-label={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-700 hover:text-gray-900 lg:hidden z-50 transition-colors"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-orange-400/20 via-pink-400/20 to-blue-400/20">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/iStock-2165740998.jpg"
              alt="Outside The Box Event"
              fill
              className="object-cover opacity-80 object-left sm:object-center"
              priority
            />
            <div className="absolute inset-0 bg-[#1a1a1a]/60" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="mb-8 text-lg sm:text-xl">{t.hero.subtitle}</p>
            <a
              href="#registration"
              className="rounded-lg bg-[#d7df23] px-8 py-4 font-bold text-black transition-colors hover:bg-[#28a028]"
            >
              {t.hero.cta}
            </a>
          </div>
        </section>

        {/* About The Event Section */}
        <section id="about" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-6 text-3xl font-bold text-center">
            {t.about.title.split(' ').map((word, index) =>
              word === t.about.highlightWord ? (
                <span key={index} className="bg-[#40e0d0] p-2 rounded-lg px-1">
                  {word}
                </span>
              ) : index > 0 ? (
                ` ${word}`
              ) : (
                word
              ),
            )}
          </h2>
          <div className="text-lg leading-relaxed text-center space-y-4">
            {t.about.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* What You'll Experience Section */}
        <section id="experience" className="bg-[#1a1a1a] pt-8 pb-8 text-white scroll-mt-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Title Block - Takes full width on mobile, spans 2 cols on md, 3 cols on lg */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-black bg-white rounded-lg p-6 flex flex-col justify-center text-center min-h-[200px]">
                <h2 className="mb-4 text-3xl font-bold">
                  {t.experience.title.split(' ').map((word, index, array) => {
                    if (word.includes(t.experience.highlightWord)) {
                      const parts = word.split(t.experience.highlightWord);
                      return (
                        <span key={index}>
                          {index > 0 ? ' ' : ''}
                          {parts[0]}
                          <span className="bg-[#d7df23] px-1 text-black rounded-lg">
                            {t.experience.highlightWord}
                          </span>
                          {parts[1]}
                        </span>
                      );
                    }
                    return index > 0 ? ` ${word}` : word;
                  })}
                </h2>
                <div className="text-lg leading-relaxed space-y-2">
                  {t.experience.description.map((text, index) => (
                    <div key={index}>{text}</div>
                  ))}
                </div>
              </div>

              {/* Experience Blocks */}
              {t.experience.blocks.map((block, index) => {
                const colors = [
                  'bg-[#d7df23]',
                  'bg-[#24938a]',
                  'bg-[#9075ff]',
                  'bg-[#ff75d0]',
                  'bg-[#9a23df]',
                ];
                return (
                  <div
                    key={index}
                    className={`${colors[index]} rounded-lg p-6 flex flex-col justify-center text-center min-h-[200px]`}
                  >
                    <h3 className="mb-4 text-xl font-bold text-black leading-tight">
                      {block.title}
                    </h3>
                    <p className="text-black text-base leading-relaxed">{block.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            {t.schedule.title.split('').map((char, index) => {
              const highlightStart = t.schedule.title.indexOf(t.schedule.highlightWord);
              const highlightEnd = highlightStart + t.schedule.highlightWord.length;
              if (index >= highlightStart && index < highlightEnd) {
                return index === highlightStart ? (
                  <span key={index} className="bg-[#d7df23] p-2 rounded-lg px-0.5">
                    {t.schedule.highlightWord}
                  </span>
                ) : null;
              }
              return char;
            })}
          </h2>
          <div className="text-black">
            {t.schedule.items.map((item, index) => {
              const colors = [
                'bg-[#d7df23]',
                'bg-white',
                'bg-black text-white',
                'bg-[#d7df23]',
                'bg-white',
                'bg-black text-white',
                'bg-[#d7df23]',
                'bg-white',
                'bg-black text-white',
                'bg-[#d7df23]',
                'bg-white',
                'bg-black text-white',
                'bg-[#d7df23]',
              ];
              return (
                <div key={index} className={`${colors[index]} p-3`}>
                  <span className="font-bold">{item.time}</span>
                  {item.description && (
                    <div>
                      {Array.isArray(item.description) ? (
                        item.description.map((desc, i) => <div key={i}>{desc}</div>)
                      ) : (
                        <div>{item.description}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Your Hosts Section */}
        <section id="hosts" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            {t.hosts.title.split('').map((char, index) => {
              const highlightStart = t.hosts.title.indexOf(t.hosts.highlightWord);
              const highlightEnd = highlightStart + t.hosts.highlightWord.length;
              if (index >= highlightStart && index < highlightEnd) {
                return index === highlightStart ? (
                  <span key={index} className="bg-[#9075ff] rounded-lg p-2 px-0.5 text-white">
                    {t.hosts.highlightWord}
                  </span>
                ) : null;
              }
              return char;
            })}
          </h2>
          {/* Grid Layout: 2x3 - Photos and Bios with titles */}
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alex Photo */}
              <div className="flex flex-col items-center justify-center p-6 min-h-[350px]">
                <div className="relative h-96 w-96 mb-4">
                  <Image src="/Alex.png" alt="Alex" fill className="object-cover" />
                </div>
              </div>

              {/* Alex Bio with Title */}
              <div className=" text-white rounded-lg p-6 flex flex-col justify-center min-h-[350px]">
                <h3 className="text-xl font-bold mb-4 text-center">{t.hosts.alex.title}</h3>
                <div className="space-y-4">
                  {t.hosts.alex.bio.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Yonko Bio with Title */}
              <div className=" text-white rounded-lg p-6 flex flex-col justify-center min-h-[350px]">
                <h3 className="text-xl font-bold mb-4 text-center">{t.hosts.yonko.title}</h3>
                <div className="space-y-4">
                  {t.hosts.yonko.bio.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Yonko Photo */}
              <div className="flex flex-col items-center justify-center p-6 min-h-[350px]">
                <div className="relative h-96 w-96 mb-4">
                  <Image src="/Yonko.png" alt="Yonko" fill className="object-cover" />
                </div>
              </div>

              {/* Sariel Photo */}
              <div className="flex flex-col items-center justify-center p-6 min-h-[350px]">
                <div className="relative h-96 w-96 mb-4">
                  <Image
                    src="/Sariel-Orenda.png"
                    alt="Sariel Orenda"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Sariel Bio with Title */}
              <div className="text-white rounded-lg p-6 flex flex-col justify-center min-h-[350px]">
                <h3 className="text-xl font-bold mb-4 text-center">{t.hosts.sariel.title}</h3>
                <div className="space-y-4">
                  {t.hosts.sariel.bio.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section id="details" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            {t.details.title.split('').map((char, index) => {
              const highlightStart = t.details.title.indexOf(t.details.highlightWord);
              const highlightEnd = highlightStart + t.details.highlightWord.length;
              if (index >= highlightStart && index < highlightEnd) {
                return index === highlightStart ? (
                  <span key={index} className="bg-[#9a23df] px-0.5 p-2 rounded-lg text-white">
                    {t.details.highlightWord}
                  </span>
                ) : null;
              }
              return char;
            })}
          </h2>
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded bg-[#d7df23] p-4 text-black">
              <MapPinIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">{t.details.venue}</div>
            </div>
            <div className="rounded bg-white p-4 text-[#1a1a1a]">
              <CalendarIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold text-2xl">{t.details.date}</div>
            </div>
            <div className="rounded bg-black p-4 text-[#d7df23]">
              <ClockIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">{t.details.time}</div>
            </div>
            <div className="rounded bg-[#d7df23] p-4 text-black">
              <TagIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">{t.details.price}</div>
            </div>
          </div>
          <div className="h-64 w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2139.7373178956973!2d23.31431222188126!3d42.68010566911832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8516ba54b99b%3A0x899415ed6a0bed7e!2sToplocentrala%20-%20Regional%20Centre%20for%20Contemporary%20Art!5e0!3m2!1sen!2sbg!4v1762524005665!5m2!1sen!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Toplocentrala - Regional Centre for Contemporary Art"
              className="rounded-lg"
            />
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="registration" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-6 text-3xl font-bold text-center">
            {t.registration.title.split('').map((char, index) => {
              const highlightStart = t.registration.title.indexOf(t.registration.highlightWord);
              const highlightEnd = highlightStart + t.registration.highlightWord.length;
              if (index >= highlightStart && index < highlightEnd) {
                return index === highlightStart ? (
                  <span key={index} className="bg-[#9a23df] rounded-lg p-2 px-0.5 text-white">
                    {t.registration.highlightWord}
                  </span>
                ) : null;
              }
              return char;
            })}
          </h2>
          <p className="mb-8 text-center text-lg">{t.registration.subtitle}</p>
          <form className="mx-auto max-w-2xl space-y-6">
            <input
              type="text"
              placeholder={t.registration.form.name}
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <input
              type="tel"
              placeholder={t.registration.form.phone}
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <input
              type="email"
              placeholder={t.registration.form.email}
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#32cd32]" />
                <span className="text-sm leading-relaxed">{t.registration.form.terms}</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#32cd32]" />
                <span className="text-sm leading-relaxed">{t.registration.form.marketing}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#d7df23] px-8 py-4 font-bold text-black transition-colors hover:bg-[#28a028]"
            >
              {t.registration.form.submit}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] px-6 py-12">
          <div className="mb-8 flex justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61583303465385"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a] transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/otb_events/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a] transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCeZWd4uqEc0npnQqHhn_GfA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a] transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
          <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="hover:text-[#32cd32]">
              {t.footer.links.terms}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#32cd32]">
              {t.footer.links.contacts}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#32cd32]">
              {t.footer.links.privacy}
            </a>
          </div>
          <p className="text-center text-sm text-gray-400">{t.footer.copyright}</p>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label={language === 'en' ? 'Scroll to top' : 'Върни се нагоре'}
          >
            <div className="bg-[#d7df23] hover:bg-[#c5cc1f] text-black rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110">
              <ChevronUpIcon className="h-6 w-6" />
            </div>
            {/* Language indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {language === 'en' ? 'To Top' : 'Нагоре'}
            </div>
          </button>
        )}
      </main>
    </div>
  );
}
