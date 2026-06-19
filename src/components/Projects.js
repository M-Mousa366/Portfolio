import { useState } from 'react';
import { projects } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GitHubIcon } from './Icons';
import SkillTag from './SkillTag';

const ExternalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/* ── Project Detail Modal ─────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="modal-panel"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <div className="modal-meta">
                            <span className="project-category">{project.category}</span>
                            <span className="project-type-label">{project.typeLabel}</span>
                        </div>
                        <h2 className="modal-title" id="modal-title">{project.title}</h2>
                    </div>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close project details"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <p className="modal-description">{project.description}</p>

                    {project.details?.problem && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">Problem Statement</h3>
                            <p className="modal-section-text">{project.details.problem}</p>
                        </div>
                    )}

                    <div className="modal-section">
                        <h3 className="modal-section-title">Key Features</h3>
                        <ul className="modal-list">
                            {project.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {project.details?.challenges?.length > 0 && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">Challenges Solved</h3>
                            <ul className="modal-list">
                                {project.details.challenges.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.details?.outcome && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">Outcome</h3>
                            <p className="modal-section-text modal-outcome">{project.details.outcome}</p>
                        </div>
                    )}

                    <div className="modal-section">
                        <h3 className="modal-section-title">Technologies Used</h3>
                        <div className="tech-tags">
                            {project.techTags.map((tag, i) => (
                                <SkillTag key={i} skill={tag} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline modal-btn"
                            aria-label="View project on GitHub (opens in new tab)"
                        >
                            <GitHubIcon />
                            View on GitHub
                        </a>
                    )}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary modal-btn"
                            aria-label="View live project (opens in new tab)"
                        >
                            <ExternalIcon />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Project Card ─────────────────────────────────────────── */
const ProjectCard = ({ project, featured, onDetails }) => (
    <article
        className={`project-card animate-on-scroll ${featured ? 'project-card-featured' : ''}`}
        aria-label={`${project.title} project`}
    >
        {featured && (
            <div className="project-featured-label" aria-label="Featured project">
                ◈ Featured Project
            </div>
        )}

        <div className="project-card-top">
            <div className="card-header">
                <span className="project-category">{project.category}</span>
                <span className="project-type-label">{project.typeLabel}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
        </div>

        <div className="project-card-body">
            {/* Skill tags */}
            {project.skillTags?.length > 0 && (
                <div className="project-skill-row">
                    {project.skillTags.map((tag, i) => (
                        <SkillTag key={i} skill={tag} />
                    ))}
                </div>
            )}

            {/* Highlights — show first 3 */}
            <ul className="project-highlights">
                {project.highlights.slice(0, featured ? 4 : 3).map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>

        <div className="project-card-footer">
            <div className="tech-tags" role="list" aria-label="Technologies used">
                {project.techTags.map((tag, i) => (
                    <SkillTag key={i} skill={tag} />
                ))}
            </div>

            <div className="project-actions">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                        aria-label="View on GitHub (opens in new tab)"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>
                )}
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onDetails(project)}
                    aria-label={`View full details for ${project.title}`}
                >
                    View Details
                </button>
            </div>
        </div>
    </article>
);

/* ── Section ──────────────────────────────────────────────── */
const Projects = () => {
    const ref = useScrollAnimation();
    const [activeProject, setActiveProject] = useState(null);
    const isSingle = projects.length === 1;
    const featured = projects.find(p => p.featured) ?? projects[0];

    return (
        <>
            <section
                id="projects"
                className="projects section section-alt"
                aria-labelledby="projects-heading"
                ref={ref}
            >
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <span className="section-label">Portfolio</span>
                        <h2 className="section-title" id="projects-heading">Projects</h2>
                    </div>

                    {/* Single featured project */}
                    {isSingle ? (
                        <div className="projects-featured-wrap">
                            <ProjectCard
                                project={featured}
                                featured
                                onDetails={setActiveProject}
                            />
                        </div>
                    ) : (
                        /* Multiple projects — responsive grid */
                        <div className="projects-grid">
                            {projects.map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    featured={project.featured && i === 0}
                                    onDetails={setActiveProject}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Detail modal — rendered outside section for proper stacking */}
            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </>
    );
};

export default Projects;
