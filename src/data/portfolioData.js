// Portfolio Data — Single Source of Truth

// ─────────────────────────────────────────────────────────────────────────────
// SKILL CLASSIFICATION SYSTEM
// Every skill string maps to one of three categories:
//   'cyber'   — Cybersecurity (cyan accent)
//   'network' — Networking    (purple accent)
//   'infra'   — IT Infrastructure / Systems (green accent)
//
// Matching is case-insensitive substring — so "SIEM & Log Analysis" matches
// the "siem" key automatically. Add new entries here to extend the system.
// ─────────────────────────────────────────────────────────────────────────────

const SKILL_MAP = {
    // ── Cybersecurity ──────────────────────────────────────────────────────
    'soc': 'cyber',
    'siem': 'cyber',
    'log analysis': 'cyber',
    'log': 'cyber',
    'incident': 'cyber',
    'threat': 'cyber',
    'security monitor': 'cyber',
    'security analysis': 'cyber',
    'security operat': 'cyber',
    'security layer': 'cyber',
    'vulnerability': 'cyber',
    'forensic': 'cyber',
    'firewall': 'cyber',
    'acl': 'cyber',
    'intrusion': 'cyber',
    'malware': 'cyber',
    'penetration': 'cyber',
    'pen test': 'cyber',
    'rbac': 'cyber',
    'authentication': 'cyber',
    'cybersecurity': 'cyber',
    'splunk': 'cyber',
    'wireshark': 'cyber',
    'nmap': 'cyber',
    'microsoft defender': 'cyber',
    'audit': 'cyber',
    'automation': 'cyber',
    'detection': 'cyber',
    'mitigation': 'cyber',
    'investigation': 'cyber',
    'response': 'cyber',

    // ── Networking ────────────────────────────────────────────────────────
    'tcp/ip': 'network',
    'tcp': 'network',
    'ip': 'network',
    'vlan': 'network',
    'routing': 'network',
    'switching': 'network',
    'dhcp': 'network',
    'dns': 'network',
    'vpn': 'network',
    'cisco': 'network',
    'wireless': 'network',
    'stp': 'network',
    'ospf': 'network',
    'bgp': 'network',
    'network troubl': 'network',
    'network infra': 'network',
    'network operat': 'network',
    'networking': 'network',
    'wan': 'network',
    'lan': 'network',
    'rest api': 'network',
    'api': 'network',
    'postman': 'network',

    // ── IT Infrastructure ─────────────────────────────────────────────────
    'windows': 'infra',
    'linux': 'infra',
    'ubuntu': 'infra',
    'kali': 'infra',
    'active directory': 'infra',
    'virtuali': 'infra',
    'vmware': 'infra',
    'virtualbox': 'infra',
    'server': 'infra',
    'infrastructure': 'infra',
    'it troubl': 'infra',
    'it support': 'infra',
    'device config': 'infra',
    'hardware': 'infra',
    'system admin': 'infra',
    'systems manage': 'infra',
    'git': 'infra',
    'python': 'infra',
    'c#': 'infra',
    'java': 'infra',
    'c++': 'infra',
    'sql': 'infra',
    'documenta': 'infra',
};

/**
 * getSkillCategory(skill) → 'cyber' | 'network' | 'infra'
 *
 * Lowercases the input and checks it against every key in SKILL_MAP.
 * Returns 'infra' as a safe default when no key matches.
 */
export function getSkillCategory(skill) {
    const lower = skill.toLowerCase();
    for (const [key, cat] of Object.entries(SKILL_MAP)) {
        if (lower.includes(key)) return cat;
    }
    return 'infra'; // safe default
}

export const personalInfo = {
    name: 'Mohamed Mousa',
    title: 'Cybersecurity & Network Infrastructure Engineer',
    titles: [
        'Cybersecurity & IT Infrastructure Engineer',
        'SOC Analyst',
        'Network Engineer',
        'Security Operations Specialist',
    ],
    summary:
        'Cybersecurity Engineer with a robust background in IT operations and advanced networking, specializing in SOC-driven log analysis and threat detection.',
    resumePath: '/Mohamed_Mousa CV.pdf',
    about: {
        paragraphs: [
            "I am a Computer Science & IT graduate with a deep passion for securing digital ecosystems and architecting resilient network foundations. My technical journey bridges the gap between proactive system administration and defensive cybersecurity.",

            "Through academic projects and hands-on labs, I have focused heavily on mastering SOC operations, SIEM deployment, and robust infrastructure monitoring. I leverage my understanding of TCP/IP, routing, and system environments to analyze infrastructure behavior and investigate how threats move through a network.",

            "Beyond engineering, my experience mentoring tech students has honed my communication, collaboration, and quick problem-solving skills under dynamic environments. I am eager to bring this blend of infrastructure knowledge and threat-hunting mindset to a forward-thinking security team."
        ],
        highlights: [
            { label: 'Focus Area', value: 'SOC / Cybersecurity' },
            { label: 'Networking', value: 'CCNA Certified' },
            { label: 'Location', value: 'Giza, Egypt' },
        ],
    },
    contact: {
        email: 'mohamed.adel.mousa.2004@gmail.com',
        phone: ['01122905730', '01092535407'],
        linkedin: 'https://www.linkedin.com/in/mohamed-mousa-bb903126a/',
        github: 'https://github.com/M-Mousa366',
        location: 'Giza, Egypt',
    },
};

export const skillCategories = [
    {
        id: 'security',
        icon: 'shield',
        title: 'Security',
        skills: [
            'SOC Operations',
            'SIEM & Log Analysis',
            'Incident Detection & Response',
            'Firewall & ACL Concepts',
            'Threat Intelligence',
        ],
    },
    {
        id: 'networking',
        icon: 'network',
        title: 'Networking',
        skills: ['TCP/IP', 'VLANs', 'DHCP / DNS', 'Cisco Routing & Switching', 'Network Troubleshooting'],
    },
    {
        id: 'tools',
        icon: 'tool',
        title: 'Tools & Platforms',
        skills: ['Wireshark', 'Nmap', 'Splunk', 'Microsoft Defender', 'VMware / VirtualBox', 'Git / GitHub', 'Postman'],
    },
    {
        id: 'systems',
        icon: 'server',
        title: 'Systems',
        skills: ['Windows Server', 'Linux (Ubuntu / Kali)', 'Active Directory Concepts', 'Virtualization'],
    },
    {
        id: 'programming',
        icon: 'code',
        title: 'Programming',
        skills: ['Python', 'C#', 'Java', 'C++', 'SQL'],
    },
    {
        id: 'other',
        icon: 'layers',
        title: 'Infrastructure',
        skills: ['IT Troubleshooting', 'Device Configuration', 'API Testing', 'Documentation'],
    },
];

export const experiences = [
    {
        id: 'tasabuq',
        role: 'Part-Time Programming Mentor',
        company: 'Tasabuq – تسابق',
        type: 'Onsite',
        period: 'Jun 2024 – Nov 2024',
        responsibilities: [
            'Delivered technical instruction and simplified complex concepts into structured, easy-to-understand solutions for students with different learning levels.',
            'Strengthened analytical thinking, problem-solving, and logical reasoning through interactive programming activities and practical exercises.',
            'Developed strong communication, presentation, and user-support skills by mentoring students and providing continuous technical guidance and feedback.',
            'Managed classroom operations, adapted teaching approaches based on student performance and maintained an engaging and organized learning environment.'
        ],
    },
];

export const certifications = [
    {
        id: 'ccna-intro',
        name: 'CCNA: Introduction to Networks',
        issuer: 'Cisco',
        issuerFull: 'Cisco Systems',
        logo: 'cisco',
        date: 'May 2024',
        skills: ['TCP/IP', 'Networking', 'Routing', 'Switching'],
        credentialFile: '/Certificates/CCNA-_Introduction_to_Networks_certificate_2200787-student-eelu-edu-eg_5670e569-bad2-4432-a8b8-2d7312ed655c.pdf.pdf',
        credentialUrl: null,
    },
    {
        id: 'ccna-switching',
        name: 'CCNA: Switching, Routing & Wireless Essentials',
        issuer: 'Cisco',
        issuerFull: 'Cisco Systems',
        logo: 'cisco',
        date: 'Jan 2025',
        skills: ['VLANs', 'STP', 'Wireless', 'Routing Protocols'],
        credentialFile: '/Certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_2200787-student-eelu-edu-eg_f366f557-a4a7-48af-9a16-e73e03a9b7f6.pdf.pdf',
        credentialUrl: null,
    },
    {
        id: 'mcsa',
        name: 'MCSA: Microsoft Certified Solutions Associate',
        issuer: 'Microsoft',
        issuerFull: 'Microsoft',
        logo: 'microsoft',
        date: null,
        skills: ['Windows Server', 'Active Directory', 'System Administration'],
        credentialFile: null,
        credentialUrl: null,
    },
    {
        id: 'it-specialist',
        name: 'IT Specialist: Device Configuration & Management',
        issuer: 'Certiport',
        issuerFull: 'Certiport — A Pearson VUE Business',
        logo: 'certiport',
        date: 'Sep 2024',
        skills: ['Device Configuration', 'IT Infrastructure', 'Systems Management'],
        credentialFile: '/Certificates/it-specialist-credential.html',
        credentialUrl: null,
    },
    {
        id: 'depi',
        name: 'Information Security Analyst',
        issuer: 'DEPI',
        issuerFull: 'Digital Egypt Pioneers Initiative',
        logo: 'depi',
        date: 'Jul 2026',
        skills: ['Security Analysis', 'Threat Detection', 'SOC Operations'],
        credentialFile: null,
        credentialUrl: null,
    },
];

export const projects = [
    {
        id: 'soc-ragmind',
        featured: true,
        category: 'Cybersecurity · AI/ML',
        typeLabel: 'Graduation Project',
        title: 'SOC Security Layer — Answerly AI Platform',
        description:
            'Designed and implemented a SOC-style security layer for an AI web platform, enabling real-time threat detection, structured incident response, and automated mitigation workflows.',
        highlights: [
            'Real-time detection of brute-force attacks, suspicious uploads, and abnormal API behavior',
            'Ticket-based incident workflow: detection → investigation → mitigation → resolution',
            'Mitigation actions: request blocking, user suspension, and attack containment',
            'Secure RBAC authentication with centralized audit logging',
        ],
        details: {
            problem: 'The Answerly AI platform lacked any security monitoring or incident response capability, leaving it vulnerable to brute-force attacks, unauthorized access, and malicious file uploads.',
            outcome: 'Delivered a fully operational SOC layer with automated threat detection, structured ticket-based incident workflows, and centralized audit logging — reducing mean time to detect (MTTD) to near real-time.',
            challenges: [
                'Designing a scalable incident ticket system that integrates with real-time monitoring',
                'Implementing asynchronous background processing without impacting platform performance',
                'Building an isolated attack simulation environment for testing without touching production data',
            ],
        },
        skillTags: ['Cybersecurity', 'Threat Detection', 'Security Monitoring', 'Automation'],
        techTags: ['SOC', 'SIEM', 'RBAC', 'Threat Detection', 'Incident Response', 'Python', 'REST API'],
        github: 'https://github.com/M-Mousa366',
        link: null,
        image: null,
    },
];

export const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
];

export const education = [
    {
        id: 'eelu',
        degree: "Bachelor's Degree",
        field: 'Computer Science & Information Technology',
        institution: 'Egyptian E-Learning University (EELU)',
        faculty: 'Faculty of Computers and Information Technology',
        affiliation: 'In affiliation with Ain Shams University',
        location: 'Cairo, Egypt',
        period: '2022 – 2026',
        status: 'completed',
        expectedGraduation: null,
        gpa: null,
        focus: [
            'Cybersecurity Fundamentals',
            'Network Administration',
            'Operating Systems',
            'Database Systems',
            'Software Engineering',
            'Data Structures & Algorithms',
            'Computer Networks',
            'Information Security',
        ],
        project: {
            title: 'SOC Security Layer — Answerly AI Platform',
            description: 'Designed and implemented a SOC-style security layer for an AI web platform with real-time threat detection and automated incident response.',
        },
    },
];

export const contactItems = [
    {
        id: 'email',
        iconType: 'email',
        label: 'Email',
        value: personalInfo.contact.email,
        href: `mailto:${personalInfo.contact.email}`,
        ariaLabel: 'Send email to Mohamed',
        external: false,
    },
    {
        id: 'phone',
        iconType: 'phone',
        label: 'Phone',
        value: personalInfo.contact.phone[0],
        href: `tel:+2${personalInfo.contact.phone[0]}`,
        ariaLabel: `Call Mohamed at ${personalInfo.contact.phone[0]}`,
        external: false,
    },
    {
        id: 'linkedin',
        iconType: 'linkedin',
        label: 'LinkedIn',
        value: 'www.linkedin.com/in/mohamed-mousa-bb903126a',
        href: personalInfo.contact.linkedin,
        ariaLabel: "Visit Mohamed's LinkedIn profile",
        external: true,
    },
    {
        id: 'github',
        iconType: 'github',
        label: 'GitHub',
        value: 'github.com/M-Mousa366',
        href: personalInfo.contact.github,
        ariaLabel: "Visit Mohamed's GitHub profile",
        external: true,
    },
    {
        id: 'location',
        iconType: 'location',
        label: 'Location',
        value: personalInfo.contact.location,
        href: null,
        ariaLabel: `Location: ${personalInfo.contact.location}`,
        external: false,
    },
];
