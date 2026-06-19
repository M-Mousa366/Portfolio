import { skillCategories } from '../data/portfolioData';
import { Icon } from './Icons';
import SkillTag from './SkillTag';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Map data category id → skill-category visual accent modifier
const CARD_ACCENT = {
    security: 'cyber',
    networking: 'network',
    tools: 'cyber',
    systems: 'infra',
    programming: 'infra',
    other: 'infra',
};

const Skills = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="skills"
            className="skills section"
            aria-labelledby="skills-heading"
            ref={ref}
        >
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Expertise</span>
                    <h2 className="section-title" id="skills-heading">Technical Skills</h2>
                </div>
                <div className="skills-grid">
                    {skillCategories.map((category, i) => {
                        const accent = CARD_ACCENT[category.id] ?? 'infra';
                        return (
                            <div
                                key={category.id}
                                className={`skill-category skill-category--${accent} animate-on-scroll`}
                                style={{ transitionDelay: `${i * 0.06}s` }}
                            >
                                <h3 className="category-title">
                                    <span className={`category-icon category-icon--${accent}`}>
                                        <Icon type={category.icon} />
                                    </span>
                                    {category.title}
                                </h3>
                                <ul className="skill-list" role="list">
                                    {category.skills.map((skill, j) => (
                                        <li key={j}>
                                            <SkillTag skill={skill} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
