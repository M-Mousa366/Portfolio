/**
 * MMLogo — MM personal brand mark
 *
 * Design language:
 *   - Hexagonal frame: communicates structure, reliability, technical precision
 *   - Double-M letterform: clean geometric strokes, no serifs
 *   - Cyan → purple gradient: matches the portfolio accent palette exactly
 *   - Dual-ring construction: outer edge + inner surface separation = depth without noise
 *
 * Usage:
 *   <MMLogo size={36} />          — renders as a plain SVG mark
 *   <MMLogo size={36} animated /> — adds subtle hover glow (apply via parent CSS)
 */

const MMLogo = ({ size = 36, className = '', 'aria-hidden': ariaHidden }) => {
    const gradId   = 'mm-grad';
    const glowId   = 'mm-glow';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width={size}
            height={size}
            className={`mm-logo-svg ${className}`}
            aria-hidden={ariaHidden}
            focusable="false"
            role="img"
        >
            <defs>
                {/* Primary brand gradient — cyan to purple, matching --accent & --accent-purple */}
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="var(--accent)"        />
                    <stop offset="100%" stopColor="var(--accent-purple)"  />
                </linearGradient>

                {/* Subtle glow filter for hover state */}
                <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/*
             * Outer hexagon frame
             * flat-top orientation, 2.5px clearance from viewBox edge
             */}
            <polygon
                points="24,3 43,13.5 43,34.5 24,45 5,34.5 5,13.5"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2"
                strokeLinejoin="round"
                className="mm-hex-outer"
            />

            {/*
             * Inner hex ring — slightly inset, fills the face with a dark surface
             * gives the mark a "badge" feel without using a heavy solid background
             */}
            <polygon
                points="24,8.5 39.5,17.25 39.5,30.75 24,39.5 8.5,30.75 8.5,17.25"
                fill="var(--bg-base)"
                stroke={`url(#${gradId})`}
                strokeWidth="0.75"
                strokeOpacity="0.3"
                strokeLinejoin="round"
                className="mm-hex-inner"
            />

            {/*
             * MM letterforms
             * Two M glyphs rendered as geometric open paths.
             * Each M uses three anchor points: bottom-left, apex, bottom-right.
             * Strokes are rounded for warmth; linecap round softens the terminals.
             *
             * Left M:  x range 9.5 – 21.5
             * Right M: x range 26.5 – 38.5
             * Both share the same vertical range 15 – 33
             */}

            {/* Left M */}
            <polyline
                points="9.5,33 9.5,15 15.5,24.5 21.5,15 21.5,33"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mm-letter"
            />

            {/* Right M */}
            <polyline
                points="26.5,33 26.5,15 32.5,24.5 38.5,15 38.5,33"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mm-letter"
            />
        </svg>
    );
};

export default MMLogo;
