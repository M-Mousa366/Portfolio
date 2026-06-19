import { personalInfo } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './Icons';

const DownloadIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const Hero = () => {
    const { name, title, summary, resumePath, contact } = personalInfo;

    const handleImgError = (e) => {
        e.target.style.display = 'none';
        e.target.parentElement.classList.add('photo-placeholder');
    };

    return (
        <section id="hero" className="hero" aria-label="Introduction">
            <div className="hero-bg-grid" aria-hidden="true" />
            <div className="hero-bg-glow" aria-hidden="true" />
            <div className="hero-bg-glow-2" aria-hidden="true" />

            <div className="hero-inner">

                {/* ── LEFT: Text ─────────────────────────────── */}
                <div className="hero-content hero-content-animate">
                    <h1 className="hero-name">{name}</h1>
                    <p className="hero-title">{title}</p>
                    <p className="hero-summary">{summary}</p>

                    <div className="hero-actions">
                        <a
                            href={resumePath}
                            download
                            className="btn btn-primary"
                            aria-label="Download Resume PDF"
                        >
                            <DownloadIcon />
                            Download Resume
                        </a>

                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            aria-label="Visit GitHub profile (opens in new tab)"
                        >
                            <GitHubIcon />
                            GitHub
                        </a>

                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            aria-label="Visit LinkedIn profile (opens in new tab)"
                        >
                            <LinkedInIcon />
                            LinkedIn
                        </a>
                    </div>

                </div>

                {/* ── RIGHT: Photo ────────────────────────────── */}
                <div className="hero-photo-wrap hero-photo-animate">
                    <div className="hero-photo-container">
                        <img
                            src="/profile.jpg"
                            alt={`${name} — ${title}`}
                            className="hero-photo"
                            width="320"
                            height="400"
                            loading="eager"
                            decoding="async"
                            onError={handleImgError}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
