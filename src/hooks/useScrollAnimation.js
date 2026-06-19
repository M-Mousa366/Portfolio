import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all `.animate-on-scroll` elements
 * inside the returned ref, adding the `visible` class when they enter view.
 */
const OBSERVER_OPTIONS = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

export function useScrollAnimation() {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || !('IntersectionObserver' in window)) {
            // No IO support — make everything visible immediately
            node?.querySelectorAll('.animate-on-scroll').forEach((el) => {
                el.classList.add('visible');
            });
            return;
        }

        const elements = node.querySelectorAll('.animate-on-scroll');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // unobserve once visible
                }
            });
        }, OBSERVER_OPTIONS);

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return ref;
}
