/**
 * SkillTag
 *
 * Auto-classifies any skill string into one of three visual categories:
 *   cyber   — Cybersecurity  (cyan)
 *   network — Networking     (purple)
 *   infra   — IT Infra       (green)
 *
 * Usage:
 *   <SkillTag skill="SIEM & Log Analysis" />
 *   <SkillTag skill="TCP/IP" />
 *   <SkillTag skill="Windows Server" />
 *
 * The resulting element is a <span> with class:
 *   skill-tag  skill-tag--cyber | skill-tag--network | skill-tag--infra
 *
 * All visual styling lives in styles.css — nothing is inline here.
 */

import { getSkillCategory } from '../data/portfolioData';

const SkillTag = ({ skill, className = '' }) => {
    const cat = getSkillCategory(skill);
    return (
        <span className={`skill-tag skill-tag--${cat} ${className}`.trim()}>
            {skill}
        </span>
    );
};

export default SkillTag;
