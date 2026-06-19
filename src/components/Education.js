import { education } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GraduationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const BookIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const Education = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="education"
            className="education section"
            aria-labelledby="education-heading"
            ref={ref}
        >
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Academic Background</span>
                    <h2 className="section-title" id="education-heading">Education</h2>
                </div>

                <div className="edu-list">
                    {education.map((edu) => (
                        <div key={edu.id} className="edu-card animate-on-scroll">

                            {/* ── Card Header ─────────────────────── */}
                            <div className="edu-card-header">
                                <div className="edu-icon-wrap" aria-hidden="true">
                                    <GraduationIcon />
                                </div>

                                <div className="edu-header-text">
                                    <div className="edu-meta-row">
                                        <span className="edu-period">
                                            <CalendarIcon />
                                            {edu.period}
                                        </span>
                                        <span className={`edu-status ${edu.status}`}>
                                            {edu.status === 'completed' ? '✓ Graduated' : 'In Progress'}
                                        </span>
                                    </div>

                                    <h3 className="edu-degree">{edu.degree}</h3>
                                    <p className="edu-field">{edu.field}</p>

                                    <div className="edu-institution">
                                        <span className="edu-inst-name">{edu.institution}</span>
                                        <span className="edu-inst-faculty">{edu.faculty}</span>
                                        <span className="edu-inst-affiliation">{edu.affiliation}</span>
                                    </div>

                                    <span className="edu-location">
                                        <MapPinIcon />
                                        {edu.location}
                                    </span>
                                </div>
                            </div>

                            {/* ── Divider ─────────────────────────── */}
                            <div className="edu-divider" aria-hidden="true" />

                            {/* ── Card Body ─────────────────────────*/}
                            <div className="edu-card-body">

                                {/* Relevant Coursework */}
                                {edu.focus?.length > 0 && (
                                    <div className="edu-focus">
                                        <h4 className="edu-section-title">
                                            <BookIcon />
                                            Relevant Coursework
                                        </h4>
                                        <ul className="edu-focus-list">
                                            {edu.focus.map((item, i) => (
                                                <li key={i} className="edu-focus-tag">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Graduation Project */}
                                {edu.project && (
                                    <div className="edu-project">
                                        <h4 className="edu-section-title">
                                            <span aria-hidden="true">◈</span>
                                            Graduation Project
                                        </h4>
                                        <div className="edu-project-card">
                                            <p className="edu-project-title">{edu.project.title}</p>
                                            <p className="edu-project-desc">{edu.project.description}</p>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
