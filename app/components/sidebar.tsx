'use client';

import Image from 'next/image';

import { translations, Language } from '../translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

export function Sidebar({ isOpen, onClose, language, onToggleLanguage }: SidebarProps) {
  const t = translations[language];

  const navigationItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'schedule', label: t.nav.schedule },
    { id: 'hosts', label: t.nav.hosts },
    { id: 'details', label: t.nav.details },
    { id: 'registration', label: t.nav.registration },
  ];

  function handleNavClick(id: string) {
    scrollToSection(id);
    // Close menu on mobile after navigation
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  }

  return (
    <>
      {/* Overlay - only on mobile when open */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          // On both mobile and desktop, toggle based on isOpen
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-8">
          {/* Close button - visible on both mobile and desktop */}
          <button
            onClick={onClose}
            className="mb-8 self-end text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8 flex flex-col h-auto">
            <Image
              src="/logo_OTB.png"
              alt="Outside The Box Logo"
              width={120}
              height={40}
              style={{ height: 'auto' }}
              priority
            />
          </div>

          <nav className="flex flex-col gap-4 mb-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-gray-700 transition-colors hover:text-[#d7df23] py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mt-auto">
            <button
              onClick={onToggleLanguage}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              aria-label={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
