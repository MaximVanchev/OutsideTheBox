'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { translations, Language } from '../translations';

interface PrivacyPopupProps {
  language: Language;
  onToggleLanguage: () => void;
  isVisible?: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose?: () => void;
}

export default function PrivacyPopup({
  language,
  onToggleLanguage,
  isVisible: externalIsVisible,
  initialTab = 'privacy',
  onClose: externalOnClose,
}: PrivacyPopupProps) {
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  // Use external visibility if provided, otherwise use internal
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : internalIsVisible;

  useEffect(() => {
    // Update active tab when initialTab changes
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    // Only show auto popup if not externally controlled
    if (externalIsVisible === undefined) {
      const hasSeenPopup = localStorage.getItem('hasSeenPrivacyPopup');
      if (!hasSeenPopup) {
        // Use setTimeout to avoid cascading renders
        const timer = setTimeout(() => {
          setInternalIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [externalIsVisible]);

  const handleClose = () => {
    if (externalOnClose) {
      // Use external close handler if provided
      externalOnClose();
    } else {
      // Use internal close handler
      setInternalIsVisible(false);
      localStorage.setItem('hasSeenPrivacyPopup', 'true');
    }
  };

  if (!isVisible) return null;

  const t = translations[language].popup;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-w-4xl max-h-[80vh] w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              aria-label={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </button>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={t.close}
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-[73px] bg-white border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'privacy'
                  ? 'border-[#d7df23] text-[#1a1a1a] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.privacyTitle}
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'terms'
                  ? 'border-[#d7df23] text-[#1a1a1a] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.termsTitle}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-180px)] px-6 py-6">
          {activeTab === 'privacy' ? (
            <div className="space-y-4 pb-8">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm">
                  {t.privacy.fullText}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pb-8">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm">
                  {t.terms.fullText}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleClose}
            className="w-full bg-[#d7df23] hover:bg-[#c5cc1f] text-black font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
