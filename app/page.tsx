'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MapPinIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { Sidebar } from './components/sidebar';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bg'>('en');

  function toggleLanguage() {
    setLanguage((prev) => (prev === 'en' ? 'bg' : 'en'));
  }

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <main className="lg:ml-64">
        {/* Header - Sticky across entire page - Mobile only */}
        <header
          className={`lg:hidden sticky top-0 z-50 flex items-center bg-[#1a1a1a] text-white justify-between px-6 py-6 transition-transform duration-300 ${
            isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <div className="flex flex-col lg:hidden">
            <span className="text-2xl font-bold">OUTSIDE</span>
            <span className="text-xl font-bold">THE BOX</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              aria-label={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white lg:hidden z-50"
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
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              REWIRE YOUR
              <br />
              MIND.
              <br />
              REDEFINE
              <br />
              YOUR REALITY.
            </h1>
            <p className="mb-8 text-lg sm:text-xl">SATURDAY 12.12.25 @ TOPLO CENTRALA</p>
            <a
              href="#registration"
              className="rounded-lg bg-[#d7df23] px-8 py-4 font-bold text-black transition-colors hover:bg-[#28a028]"
            >
              REGISTER NOW
            </a>
          </div>
        </section>

        {/* About The Event Section */}
        <section id="about" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-6 text-3xl font-bold text-center">
            About <span className="bg-[#40e0d0] rounded-lg px-1">The</span> Event
          </h2>
          <div className="text-lg leading-relaxed text-center">
            <p>Feeling stuck in the same loops?</p>
            <p>Ready for real, lasting change?</p>
            <p>
              Join Alex & Yonko for a transformative one-day experience that blends deep inner
              healing with practical neuroscience - helping you break free from recurring patterns
              and create the life you truly want.
            </p>
            <p>
              This isn&apos;t theory. It&apos;s real work - guided processes, emotional release, and
              the science of how to rewire your brain for freedom, clarity, and self-leadership.
            </p>
          </div>
        </section>

        {/* What You'll Experience Section */}
        <section id="experience" className="bg-gray-100 pt-8 text-[#1a1a1a] scroll-mt-20">
          <h2 className="mb-6 text-3xl px-6 font-bold text-center">
            What You<span className="bg-[#d7df23] px-1 text-black rounded-lg">&apos;ll E</span>
            xperience
          </h2>
          <div className="mb-8 text-center px-6 text-lg leading-relaxed">
            <div>
              This event bridges heart and science - the emotional depth of healing with the
              practical tools to make change stick.
            </div>
            <div>
              It&apos;s for those ready to stop repeating the past and start consciously creating
              their future.
            </div>
          </div>
          <div className="text-center">
            {/* Experience Block 1 */}
            <div className="bg-[#d7df23] p-6">
              <h3 className="mb-2 text-2xl font-bold text-black">
                Shadow Work & Inner Child Healing
              </h3>
              <p className="text-black text-xl">
                Uncover the unconscious patterns that run your life and reshape them with awareness
              </p>
            </div>

            {/* Experience Block 2 */}
            <div className=" bg-[#24938a] p-6">
              <h3 className="mb-2 text-2xl font-bold text-black">Break Approval Addiction</h3>
              <p className="text-black text-xl">
                Stop living for others and start standing fully in your truth
              </p>
            </div>

            {/* Experience Block 3 */}
            <div className="bg-[#9075ff] p-6">
              <h3 className="mb-2 text-2xl font-bold text-black">Rewire Your Brain</h3>
              <p className="text-black text-xl">
                Use neuroplasticity to consciously reshape your thoughts, emotions, and behaviors
              </p>
            </div>

            {/* Experience Block 4 */}
            <div className="bg-[#ff75d0] p-6">
              <h3 className="mb-2 text-2xl font-bold text-black">Master the Present Moment</h3>
              <p className="text-black text-xl">Access the only point of real power: now</p>
            </div>

            {/* Experience Block 5 */}
            <div className="bg-[#9a23df] p-6">
              <h3 className="mb-2 text-2xl font-bold text-black">Two Guided Meditations</h3>
              <p className="text-black text-xl">
                Reprogram your nervous system for safety, success, and expansion (30 min + 45 min)
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Sch<span className="bg-[#d7df23] rounded-lg px-0.5">ed</span>ule
          </h2>
          <div className="text-black">
            <div className="bg-[#d7df23] p-3">
              <span className="font-bold">10:00 - 10:20 | Arrival & Intention</span>
              <div>Welcome, grounding, setting the tone for the day.</div>
            </div>
            <div className="bg-white p-3">
              <span className="font-bold ">
                10:20 - 11:20 | Part 1: Returning to the self (Alex)
              </span>
              <div>
                • Shadow & Inner Child: what you&apos;ve suppressed, and how it still runs you
              </div>
              <div>• Approval Addiction: stop living for validation</div>
              <div>• Coming Back to You: emotional honesty, alignment with your real self</div>
            </div>
            <div className="bg-black text-white p-3">
              <span className="font-bold">11:20 - 11:30 | Break</span>
            </div>
            <div className="bg-[#d7df23] p-3">
              <span className="font-bold">
                11:30 - 12:20 | Part 2: The architecture of your reality (Yonko)
              </span>
              <div>
                How your thoughts, emotions, habits, and environment create the loop you&apos;re
                stuck in.
              </div>
            </div>
            <div className="bg-white p-3">
              <span className="font-bold">12:20 - 12:50 | Break + Connection</span>
              <div>Light refreshments, sharing, informal Q&A.</div>
            </div>
            <div className="bg-black text-white p-3">
              <span className="font-bold">12:50 - 13:40 | Breaking the Patterns (Yonko)</span>
              <div>
                Why we repeat the past, how beliefs form, and how to step out of the familiar
                version of you.
              </div>
            </div>
            <div className="bg-[#d7df23] p-3">
              <span className="font-bold">13:40 - 13:45 | Short Break</span>
            </div>
            <div className="bg-white p-3">
              <span className="font-bold">13:45 - 14:15 | Meditation 1: The Present Moment</span>
              <div>Guided practice to access the only place real change can happen: now.</div>
            </div>
            <div className="bg-black text-white p-3">
              <span className="font-bold">14:15 - 14:20 | Integration</span>
              <div>Silent reflection + journaling.</div>
            </div>
            <div className="bg-[#d7df23] p-3">
              <span className="font-bold">14:20 - 15:05 | Becoming Your New Self</span>
              <div>
                Tools for catching old patterns in real time, choosing differently, and rehearsing
                your new identity.{' '}
              </div>
            </div>
            <div className="bg-white p-3">
              <span className="font-bold">15:05 - 15:10 | Prepare for Deep Work</span>
            </div>
            <div className="bg-black text-white p-3">
              <span className="font-bold">15:10 - 15:55 | MEDITATION 2: Creating Your Reality</span>
              <div>Release the old identity, embody the new one, lock in the elevated state.</div>
            </div>
            <div className="bg-[#d7df23] p-3">
              <span className="font-bold">15:55 - 16:00 | Closing</span>
              <div>Share, integrate, next steps, gratitude.</div>
            </div>
          </div>
        </section>

        {/* Your Hosts Section */}
        <section id="hosts" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            You<span className="bg-[#9075ff] rounded-lg px-0.5 text-white">r H</span>osts
          </h2>
          <div className="space-y-12">
            {/* Host 1: Alex */}
            <div>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-[#663399] p-1">
                    <div className="h-full w-full rounded-full bg-[#32cd32] p-2">
                      <div className="h-full w-full rounded-full bg-gray-800" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#9a23df]">Alex - Returning to the Self</h3>
                </div>
              </div>
              <p className="text-center max-w-2xl mx-auto  leading-relaxed">
                After building and selling his advertising agency to one of the world&apos;s largest
                global marketing groups, Alex shifted his focus from scaling brands to helping
                people expand from within.
              </p>
              <p className="text-center max-w-2xl mx-auto  leading-relaxed mt-5">
                With over 13 years of experience in strategy and human behavior, his work now
                bridges deep inner transformation with practical tools for real-life change. Alex
                guides others to break free from old patterns, reconnect with their authentic
                selves, and live in alignment with purpose, presence, and truth.
              </p>
            </div>

            {/* Host 2: Yonko */}
            <div>
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-[#663399] p-1">
                    <div className="h-full w-full rounded-full bg-[#32cd32] p-2">
                      <div className="h-full w-full rounded-full bg-gray-800" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#9075ff]">
                    Yonko - The Architecture of Reality
                  </h3>
                </div>
              </div>
              <p className="text-center max-w-2xl mx-auto leading-relaxed">
                After years of performing on screen and stage, creating festivals, and bringing
                people together through art and story, Yonko discovered that the greatest
                performance is the one we live every day - when we embody our truth.
              </p>
              <p className="text-center max-w-2xl mx-auto  leading-relaxed mt-5">
                His work bridges creativity, consciousness, and science - guiding others to awaken
                their inner power, expand awareness, and remember who they truly are. Through
                movement, breath, and presence, Yonko helps people align body, mind, and energy-
                shifting from survival to creation.
              </p>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section id="details" className="bg-[#1a1a1a] px-6 py-16 scroll-mt-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Even<span className="bg-[#9a23df] px-0.5 rounded-lg text-white">t D</span>etails
          </h2>
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded bg-[#d7df23] p-4 text-black">
              <MapPinIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">Toplocentrala</div>
            </div>
            <div className="rounded bg-white p-4 text-[#1a1a1a]">
              <CalendarIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold text-2xl">7.12.25</div>
            </div>
            <div className="rounded bg-black p-4 text-[#d7df23]">
              <ClockIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">10:00 - 16:00</div>
            </div>
            <div className="rounded bg-[#d7df23] p-4 text-black">
              <TagIcon className="mb-2 h-8 w-8" />
              <div className="font-semibold">199 лв. Без ДДС</div>
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
            Registr<span className="bg-[#9a23df] rounded-lg px-0.5 text-white">atio</span>n Form
          </h2>
          <p className="mb-8 text-center text-lg">
            Limited to 45 participants - only <strong>15</strong> free seats remaining!
          </p>
          <form className="mx-auto max-w-2xl space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded bg-[#2d2d2d] px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
            />
            <div className="relative">
              <select className="w-full appearance-none rounded bg-[#2d2d2d] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#32cd32]">
                <option>No. Tickets</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#32cd32]" />
                <span className="text-sm leading-relaxed">I read the T&C & Privacy Policy</span>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#32cd32]" />
                <span className="text-sm leading-relaxed">
                  I agree to receive updates, news, information and inspirational content from
                  Outside the Box. I understand I can unsubscribe at anytime.
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#32cd32] px-8 py-4 font-bold text-white transition-colors hover:bg-[#28a028]"
            >
              FINALIZE YOUR ORDER
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] px-6 py-12">
          <div className="mb-8 flex justify-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a]"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a]"
              aria-label="Instagram"
            >
              i
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a]"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1a1a1a]"
              aria-label="YouTube"
            >
              yt
            </a>
          </div>
          <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="hover:text-[#32cd32]">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#32cd32]">
              Contacts
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#32cd32]">
              Privacy Policy
            </a>
          </div>
          <p className="text-center text-sm text-gray-400">© 2023. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
