/**
 * @param {{academique: boolean, professionnel: boolean}|null} disponibilite
 * @param {string} type 'academique' | 'professionnel' | '' (aucune sélection)
 */
export function estTypeFerme(disponibilite, type) {
  if (!type || !disponibilite) return false;
  return !disponibilite[type];
}

/**
 * Le bouton générique de la page d'accueil (aucune sélection de type à ce
 * niveau) ne devient inactif que si les deux types sont fermés — la
 * fermeture d'un seul type se manifeste une fois sur /demande-de-stage, où
 * le candidat choisit effectivement un type (voir estTypeFerme).
 */
export function sontTousLesTypesFermes(disponibilite) {
  if (!disponibilite) return false;
  return !disponibilite.academique && !disponibilite.professionnel;
}
