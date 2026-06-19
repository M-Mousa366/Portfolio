import { contactItems } from '../data/portfolioData';
import { Icon } from './Icons';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ContactItem = ({ item }) => {
    const content = (
        <>
            <span className="contact-icon"><Icon type={item.iconType} /></span>
            <span className="contact-text">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
            </span>
            {item.external && <span className="contact-external" aria-hidden="true">↗</span>}
        </>
    );

    if (item.href) {
        return (
            <a
                href={item.href}
                className="contact-item"
                aria-label={item.ariaLabel}
                {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
                {content}
            </a>
        );
    }

    return (
        <div className="contact-item no-link" aria-label={item.ariaLabel}>
            {content}
        </div>
    );
};

const Contact = () => {
    const ref = useScrollAnimation();

    return (
        <section
            id="contact"
            className="contact section"
            aria-labelledby="contact-heading"
            ref={ref}
        >
            <div className="container">
                <div className="section-header animate-on-scroll">
                    <span className="section-label">Let's Talk</span>
                    <h2 className="section-title" id="contact-heading">Get In Touch</h2>
                </div>
                <p className="contact-intro animate-on-scroll">
                    Open to entry-level opportunities in SOC Analysis, Network Operations,
                    or IT Infrastructure. Feel free to reach out.
                </p>
                <div className="contact-grid animate-on-scroll">
                    {contactItems.map((item) => (
                        <ContactItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
