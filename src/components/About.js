import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ── Inline SVG icons — only those still used ─────────────── */
const ShieldIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const NetworkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-4h14v4" />
        <path d="M12 12V8" />
    </svg>
);

/* ── Component ────────────────────────────────────────────── */
const About = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="about"
            className="about section section-alt"
            aria-labelledby="about-heading"
            ref={ref}
        >
            <div className="container">

                {/* Section header */}
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Background</span>
                    <h2 className="section-title" id="about-heading">About Me</h2>
                </div>

                {/* Single centered content card */}
                <div className="about-content animate-on-scroll">

                    {/* Role badges */}
                    <div className="about-intro-roles">
                        <span className="about-role-badge about-role-security">
                            <ShieldIcon /> Cybersecurity
                        </span>
                        <span className="about-role-badge about-role-network">
                            <NetworkIcon /> Networking &amp; IT Infrastructure
                        </span>
                    </div>

                    {/* Bio paragraphs */}
                    <div className="about-paragraphs">
                        <p className="about-intro-text">
                            Computer Science &amp; IT graduate with a deep passion for securing digital
                            ecosystems and architecting resilient network foundations. My technical journey
                            bridges proactive system administration and defensive cybersecurity.
                        </p>
                        <p className="about-intro-text">
                            Through academic projects and hands-on labs, I have focused on SOC operations,
                            SIEM deployment, and infrastructure monitoring — leveraging my understanding of
                            TCP/IP, routing, and system environments to analyze behavior and investigate how
                            threats move through a network.
                        </p>
                        <p className="about-intro-text">
                            Experience mentoring tech students has sharpened my communication,
                            collaboration, and quick problem-solving under dynamic environments. I am eager
                            to bring this blend of infrastructure knowledge and threat-hunting mindset to a
                            forward-thinking security team.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default About;
