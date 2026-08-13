/**
 * Pictogramme "échange de courrier" — composition géométrique originale,
 * pas une photo. Utilisé sur la page d'accueil et la page Services, section
 * dépôt de courrier.
 */
export function ExchangeIllustration({ className = 'h-full w-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="200" height="160" rx="16" className="fill-ont-blue-50" />

      {/* Enveloppe */}
      <rect x="42" y="48" width="116" height="76" rx="8" className="fill-white" />
      <path
        d="M46 54 L100 92 L154 54"
        fill="none"
        className="stroke-ont-blue-400"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flèches d'échange */}
      <path
        d="M28 30 h30 M50 22 l8 8 -8 8"
        fill="none"
        className="stroke-ont-blue-600"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M172 130 h-30 M150 138 l-8 -8 8 -8"
        fill="none"
        className="stroke-ont-gold-500"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
