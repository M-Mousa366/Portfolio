import { personalInfo } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SkillTag from './SkillTag';

/* ── Inline SVG icons ─────────────────────────────────────────── */
const ShieldIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const NetworkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-4h14v4" />
        <path d="M12 12V8" />
    </svg>
);

const BrainIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const AwardIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);

const TargetIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

/* ── Data ─────────────────────────────────────────────────────── */
const technicalFocus = [
    'Security Monitoring',
    'SIEM & Log Analysis',
    'Incident Investigation',
    'Threat Detection',
    'SOC Operations',
    'TCP/IP Networking',
    'Routing & Switching',
    'Windows & Linux',
    'Infrastructure Monitoring',
    'Active Directory',
];

const strengths = [
    { label: 'Analytical Thinking', icon: '◈' },
    { label: 'Problem Solving', icon: '◈' },
    { label: 'Communication', icon: '◈' },
    { label: 'Continuous Learning', icon: '◈' },
    { label: 'Tech Troubleshooting', icon: '◈' },
    { label: 'Team Collaboration', icon: '◈' },
];

/* ── Component ───────────────────────────────────────────────── */
const About = () => {
    const ref = useScrollAnimation();
    const { highlights } = personalInfo.about;

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

                <div className="about-grid animate-on-scroll">

                    {/* ── LEFT COLUMN ─────────────────────────── */}
                    <div className="about-left">

                        {/* Quick-facts card */}
                        <div className="about-facts-card" aria-label="Quick facts">
                            <div className="about-facts-header">
                                <span className="about-facts-title">Quick Facts</span>
                            </div>
                            <ul className="about-facts-list">
                                {highlights.map((item, i) => {
                                    const Icon = i === 0 ? TargetIcon : i === 1 ? AwardIcon : MapPinIcon;
                                    return (
                                        <li key={i} className="about-fact-item">
                                            <span className="about-fact-icon"><Icon /></span>
                                            <div className="about-fact-text">
                                                <span className="about-fact-label">{item.label}</span>
                                                <span className="about-fact-value">{item.value}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Strengths card */}
                        <div className="about-strengths-card" aria-label="Professional strengths">
                            <div className="about-card-label">
                                <BrainIcon />
                                <span>Professional Strengths</span>
                            </div>
                            <ul className="about-strengths-list">
                                {strengths.map((s, i) => (
                                    <li key={i} className="about-strength-item">
                                        <span className="strength-dot" aria-hidden="true" />
                                        {s.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* ── RIGHT COLUMN ────────────────────────── */}
                    <div className="about-right">

                        {/* Introduction card */}
                        <div className="about-intro-card">
                            <div className="about-intro-roles">
                                <span className="about-role-badge about-role-security">
                                    <ShieldIcon /> Cybersecurity
                                </span>
                                <span className="about-role-badge about-role-network">
                                    <NetworkIcon /> Networking &amp; IT Infrastructure
                                </span>
                            </div>

                            <p className="about-intro-text">
                                Computer Science &amp; IT graduate with a deep passion for securing digital
                                ecosystems and architecting resilient network foundations. My technical journey
                                bridges proactive system administration and defensive cybersecurity.
                            </p>
                            <p className="about-intro-text">
                                Through academic projects and hands-on labs I have focused on SOC operations,
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

                        {/* Technical focus card */}
                        <div className="about-focus-card" aria-label="Technical focus areas">
                            <div className="about-card-label">
                                <ShieldIcon />
                                <span>Technical Focus</span>
                            </div>
                            <div className="about-focus-tags">
                                {technicalFocus.map((skill, i) => (
                                    <SkillTag key={i} skill={skill} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
