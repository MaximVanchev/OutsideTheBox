'use client';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'bg';
  onToggleLanguage: () => void;
}

const navigationItems = [
  { id: 'about', label: 'About The Event' },
  { id: 'experience', label: "What You'll Experience" },
  { id: 'schedule', label: 'Schedule' },
  { id: 'hosts', label: 'Your Hosts' },
  { id: 'details', label: 'Event Details' },
  { id: 'registration', label: 'Registration Form' },
];

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
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-[#1a1a1a] transition-transform duration-300 ease-in-out ${
          // On desktop (lg+), always visible. On mobile, toggle based on isOpen
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-8">
          {/* Close button - only visible on mobile */}
          <button
            onClick={onClose}
            className="mb-8 self-end text-white lg:hidden"
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

          {/* Logo on desktop */}
          <div className="mb-8 hidden flex-col lg:flex">
            <span className="text-xl font-bold text-white">OUTSIDE</span>
            <span className="text-lg font-bold text-white">THE BOX</span>
          </div>

          <nav className="flex flex-col gap-4 mb-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-white transition-colors hover:text-[#32cd32] py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mt-auto">
            <button
              onClick={onToggleLanguage}
              className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
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
