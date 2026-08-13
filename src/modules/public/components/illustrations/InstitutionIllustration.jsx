/**
 * Pictogramme "bâtiment institutionnel" — composition géométrique
 * originale, pas une photo. Utilisé sur la page À propos et la bannière
 * d'accueil.
 */
export function InstitutionIllustration({ className = 'h-full w-full' }) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="200" height="160" rx="16" className="fill-ont-blue-50" />

      {/* Fronton */}
      <path d="M40 62 L100 30 L160 62 Z" className="fill-ont-blue-700" />

      {/* Corps du bâtiment */}
      <rect x="44" y="62" width="112" height="70" className="fill-white" />

      {/* Colonnes */}
      {[54, 74, 94, 114, 134].map((x) => (
        <rect key={x} x={x} y="70" width="8" height="54" className="fill-ont-blue-200" />
      ))}

      {/* Marches */}
      <rect x="34" y="132" width="132" height="8" className="fill-ont-blue-300" />
      <rect x="26" y="140" width="148" height="8" className="fill-ont-blue-400" />

      {/* Soleil (clin d'œil au logo) */}
      <circle cx="164" cy="34" r="10" className="fill-ont-gold-400" />
    </svg>
  );
}
