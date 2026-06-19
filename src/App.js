import { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { SunIcon, MoonIcon } from './components/Icons';
import MMLogo from './components/MMLogo';
import { navLinks } from './data/portfolioData';

function getInitialTheme() {
    try {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
        return 'dark';
    }
}

function App() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const [theme, setTheme] = useState(getInitialTheme);

    // Sync theme attribute on <html> and persist to localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('portfolio-theme', theme); } catch { }
    }, [theme]);

    const toggleTheme = useCallback(
        () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
        []
    );

    // Drive hamburger animation via body class
    useEffect(() => {
        document.body.classList.toggle('nav-open', isNavOpen);
        return () => document.body.classList.remove('nav-open');
    }, [isNavOpen]);

    // Close mobile nav on Escape
    useEffect(() => {
        if (!isNavOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') setIsNavOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isNavOpen]);

    // Highlight active nav link based on scroll position
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.25, rootMargin: '-68px 0px -60% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    // Smooth scroll — CSS scroll-padding-top handles fixed nav offset
    const handleNavClick = useCallback((e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setIsNavOpen(false);
    }, []);

    return (
        <div className="App">
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <header className="nav-header" role="banner">
                <nav className="nav-container" aria-label="Main navigation">
                    <a
                        className="nav-brand"
                        href="#hero"
                        onClick={(e) => handleNavClick(e, 'hero')}
                        aria-label="Mohamed Adel Mousa — back to top"
                        title="Back to Top"
                    >
                        <span className="nav-brand-logo" aria-hidden="true">
                            <MMLogo size={34} aria-hidden="true" />
                        </span>
                        <span className="nav-brand-text">
                            <span className="nav-brand-name">Mohamed Mousa</span>
                            <span className="nav-brand-role">Cybersecurity Engineer</span>
                        </span>
                    </a>

                    <div className="nav-right">
                        <ul className="nav-links" id="mobile-nav" role="list">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={`#${link.id}`}
                                        className={activeSection === link.id ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, link.id)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>

                        <button
                            className="hamburger"
                            aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isNavOpen}
                            aria-controls="mobile-nav"
                            onClick={() => setIsNavOpen((o) => !o)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>
            </header>

            <main id="main-content">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Certifications />
                <Experience />
                <Education />
                <Contact />
            </main>

            <footer className="footer" role="contentinfo">
                <div className="container">
                    <p>© 2026 Mohamed Adel Mousa. All rights reserved.</p>
                </div>
            </footer>

            {isNavOpen && (
                <div
                    className="nav-overlay"
                    onClick={() => setIsNavOpen(false)}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

export default App;
