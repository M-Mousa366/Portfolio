import { experiences } from '../data/portfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="experience"
            className="experience section section-alt"
            aria-labelledby="experience-heading"
            ref={ref}
        >
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Work History</span>
                    <h2 className="section-title" id="experience-heading">Experience</h2>
                </div>
                <div className="timeline">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="timeline-item animate-on-scroll">
                            <div className="timeline-marker" aria-hidden="true" />
                            <div className="timeline-content">
                                <div className="timeline-meta">
                                    <span className="job-type-badge">{exp.type}</span>
                                    <span className="period">{exp.period}</span>
                                </div>
                                <h3 className="role-title">{exp.role}</h3>
                                <span className="company-name">{exp.company}</span>
                                <ul className="responsibilities">
                                    {exp.responsibilities.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
