import { useState, useEffect, useCallback, memo } from 'react';
import { certifications } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SkillTag from './SkillTag';

// Stable helper — lives outside components so it's never recreated
const isPdfPath = (path) =>
    !!path && (path.endsWith('.pdf') || path.endsWith('.pdf.pdf'));
const LOGO_PATHS = {
    cisco: '/cisco.png',
    microsoft: '/Microsoft.png',
    certiport: '/Certiport.png',
    depi: '/DEPI (E).png',
};

/* ── Accent colors per provider ──────────────────────────── */
const ACCENT = {
    cisco: { border: 'rgba(155,162,163,0.25)', bg: 'rgba(0,188,235,0.06)' },
    microsoft: { border: 'rgba(0,164,239,0.25)', bg: 'rgba(0,164,239,0.06)' },
    certiport: { border: 'rgba(232,83,10,0.25)', bg: 'rgba(232,83,10,0.06)' },
    depi: { border: 'rgba(201,209,226,0.25)', bg: 'rgba(199,207,225,0.06)' },
};

/* ── Icons ────────────────────────────────────────────────── */
const ExternalIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const EyeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

/* ── PDF Viewer Modal ─────────────────────────────────────── */
const PdfModal = ({ cert, onClose }) => {
    const [pdfSupported, setPdfSupported] = useState(true);
    const filePath = cert.credentialFile;
    const fileName = cert.name + '.pdf';

    /* Close on Escape key */
    const handleKey = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        /* Prevent body scroll while modal is open */
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [handleKey]);

    /* Click on backdrop → close */
    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="pdf-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing credential: ${cert.name}`}
            onClick={handleBackdrop}
        >
            <div className="pdf-modal-panel">

                {/* Header */}
                <div className="pdf-modal-header">
                    <div className="pdf-modal-title-wrap">
                        <span className="pdf-modal-label">{cert._viewLabel ?? 'Credential'}</span>
                        <h3 className="pdf-modal-title">{cert.name}</h3>
                        <span className="pdf-modal-issuer">{cert.issuerFull}</span>
                    </div>
                    <div className="pdf-modal-actions">
                        <a
                            href={filePath}
                            download={fileName}
                            className="pdf-modal-download"
                            aria-label={`Download ${cert.name}`}
                        >
                            <DownloadIcon />
                            Download
                        </a>
                        <button
                            className="pdf-modal-close"
                            onClick={onClose}
                            aria-label="Close credential viewer"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                {/* PDF viewer */}
                <div className="pdf-modal-body">
                    {pdfSupported ? (
                        <object
                            data={filePath}
                            type="application/pdf"
                            className="pdf-embed"
                            aria-label={`PDF: ${cert.name}`}
                            onError={() => setPdfSupported(false)}
                        >
                            {/* Inner fallback — shown when <object> cannot render PDF */}
                            <div className="pdf-fallback">
                                <p className="pdf-fallback-msg">
                                    Your browser cannot display this PDF inline.
                                </p>
                                <a
                                    href={filePath}
                                    download={fileName}
                                    className="cert-action-btn pdf-fallback-btn"
                                >
                                    <DownloadIcon />
                                    Download Certificate
                                </a>
                                <a
                                    href={filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-action-btn"
                                >
                                    <ExternalIcon />
                                    Open in New Tab
                                </a>
                            </div>
                        </object>
                    ) : (
                        /* JS-triggered fallback (onError fired) */
                        <div className="pdf-fallback">
                            <p className="pdf-fallback-msg">
                                Your browser cannot display this PDF inline.
                            </p>
                            <a
                                href={filePath}
                                download={fileName}
                                className="cert-action-btn pdf-fallback-btn"
                            >
                                <DownloadIcon />
                                Download Certificate
                            </a>
                            <a
                                href={filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-action-btn"
                            >
                                <ExternalIcon />
                                Open in New Tab
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

/* ── Logo renderer ────────────────────────────────────────── */
const CertLogo = ({ cert }) => {
    const logoPath = LOGO_PATHS[cert.logo] ?? null;
    if (logoPath) {
        return (
            <img
                src={logoPath}
                alt={`${cert.issuer} logo`}
                className={`cert-logo-img cert-logo-img--${cert.logo}`}
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
const CertCard = memo(({ cert, index, onViewPdf }) => {
    const accent = ACCENT[cert.logo] ?? ACCENT.depi;
    const multiFiles = cert.credentialFiles ?? null;
    const hasCred = !!(cert.credentialFile || cert.credentialUrl);
    const isPdf = isPdfPath(cert.credentialFile);

    const handleView = () => {
        if (isPdf) {
            onViewPdf(cert);
        } else if (cert.credentialUrl) {
            window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
        } else if (cert.credentialFile) {
            window.open(cert.credentialFile, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <article
            className="cert-card animate-on-scroll"
            style={{ transitionDelay: `${index * 0.07}s` }}
            aria-label={`${cert.name} — issued by ${cert.issuerFull}`}
        >
            {/* Logo banner */}
            <div
                className={`cert-logo-wrap cert-logo-wrap--${cert.logo}`}
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

            {/* ── Credential buttons ─────────────────────────────────── */}
            {multiFiles ? (
                /* Multiple files — one button per entry */
                <div className="cert-action-row">
                    {multiFiles.map((file) => {
                        const fileIsPdf = isPdfPath(file.path);
                        const handleMulti = () => {
                            if (fileIsPdf) {
                                onViewPdf({ ...cert, credentialFile: file.path, _viewLabel: file.label });
                            } else {
                                window.open(file.path, '_blank', 'noopener,noreferrer');
                            }
                        };
                        return (
                            <button
                                key={file.label}
                                className="cert-action-btn"
                                onClick={handleMulti}
                                aria-label={`View ${file.label} for ${cert.name}`}
                            >
                                <EyeIcon />
                                {file.label}
                            </button>
                        );
                    })}
                </div>
            ) : hasCred ? (
                /* Single file / URL */
                <button
                    className="cert-action-btn"
                    onClick={handleView}
                    aria-label={`View credential for ${cert.name}`}
                >
                    {isPdf ? <EyeIcon /> : <ExternalIcon />}
                    View Credential
                </button>
            ) : null}
        </article>
    );
});

/* ── Section ──────────────────────────────────────────────── */
const Certifications = () => {
    const ref = useScrollAnimation();
    const [activePdf, setActivePdf] = useState(null);

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
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            index={i}
                            onViewPdf={setActivePdf}
                        />
                    ))}
                </div>
            </div>

            {/* Inline PDF viewer — mounted only when a PDF is selected */}
            {activePdf && (
                <PdfModal
                    cert={activePdf}
                    onClose={() => setActivePdf(null)}
                />
            )}
        </section>
    );
};

export default Certifications;
