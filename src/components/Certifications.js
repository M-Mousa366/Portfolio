import { certifications } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SkillTag from './SkillTag';

/* ── Logo image paths (SVG, served from public/) ─────────── */
const LOGO_PATHS = {
    cisco: '/cisco.png',
    microsoft: '/Microsoft.png',
    certiport: '/Certiport.png',
    depi: '/DEPI (E).png',
};

/* ── Accent colors per provider ──────────────────────────── */
const ACCENT = {
    cisco: { border: 'rgba(155, 162, 163, 0.25)', bg: 'rgba(0,188,235,0.06)' },
    microsoft: { border: 'rgba(0,164,239,0.25)', bg: 'rgba(0,164,239,0.06)' },
    certiport: { border: 'rgba(232,83,10,0.25)', bg: 'rgba(232,83,10,0.06)' },
    depi: { border: 'rgba(201, 209, 226, 0.25)', bg: 'rgba(199, 207, 225, 0.06)' },
};

const ExternalIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

/* ── Logo renderer ────────────────────────────────────────── */
const CertLogo = ({ cert }) => {
    const logoPath = LOGO_PATHS[cert.logo] ?? null;
    if (logoPath) {
        return (
            <img
                src={logoPath}
                alt={`${cert.issuer} logo`}
                className={`cert-logo-img cert-logo-img--${cert.logo}`}
                data-provider={cert.logo}
                loading="lazy"
                decoding="async"
            />
        );
    }

    return (
        <span className="cert-logo-fallback">
            {cert.issuer.slice(0, 2).toUpperCase()}
        </span>
    );
};

/* ── Single Card ──────────────────────────────────────────── */
const CertCard = ({ cert, index }) => {
    const accent = ACCENT[cert.logo] ?? ACCENT.depi;
    const credUrl = cert.credentialFile ?? cert.credentialUrl;

    return (
        <article
            className="cert-card animate-on-scroll"
            style={{ transitionDelay: `${index * 0.07}s` }}
            aria-label={`${cert.name} — issued by ${cert.issuerFull}`}
        >
            {/* Logo banner */}
            <div
                className={`cert-logo-wrap cert-logo-wrap--${cert.logo}`}
                data-provider={cert.logo}
                style={{ borderColor: accent.border }}
            >
                <CertLogo cert={cert} />
            </div>

            {/* Content */}
            <div className="cert-body">
                <div className="cert-header">
                    <h3 className="cert-name">{cert.name}</h3>
                    {cert.date && (
                        <span className="cert-date" aria-label={`Issued ${cert.date}`}>
                            {cert.date}
                        </span>
                    )}
                </div>

                <p className="cert-issuer-full">{cert.issuerFull}</p>

                {cert.skills?.length > 0 && (
                    <div className="cert-skills" aria-label="Skills covered">
                        {cert.skills.map((s, i) => (
                            <SkillTag key={i} skill={s} />
                        ))}
                    </div>
                )}
            </div>

            {/* Credential button — only when a file or URL exists */}
            {credUrl && (
                <a
                    href={credUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-action-btn"
                    aria-label={`View credential certificate for ${cert.name} (opens in new tab)`}
                >
                    View Credential
                    <ExternalIcon />
                </a>
            )}
        </article>
    );
};

/* ── Section ──────────────────────────────────────────────── */
const Certifications = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="certifications"
            className="certifications section"
            aria-labelledby="certs-heading"
            ref={ref}
        >
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Credentials</span>
                    <h2 className="section-title" id="certs-heading">Certifications</h2>
                </div>

                <div className="certs-grid">
                    {certifications.map((cert, i) => (
                        <CertCard key={cert.id} cert={cert} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
