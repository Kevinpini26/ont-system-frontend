import { Award } from 'lucide-react';

/**
 * Signal visuel de complétion réussie du parcours d'évaluation — affiché
 * uniquement là où le résultat final est déjà visible (DFP), jamais une
 * condition d'affichage propre : voir les appelants dans StagiaireDetailPage.jsx.
 */
export function BadgeReussite({ className = '' }) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ont-gold-300 to-ont-gold-600 text-white shadow-sm ${className}`}
      title="Parcours d'évaluation complété"
    >
      <Award className="h-5 w-5" strokeWidth={2.25} />
    </span>
  );
}
