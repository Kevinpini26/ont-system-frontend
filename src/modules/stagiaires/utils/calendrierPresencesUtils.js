export const JOURS_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export const MOIS_LABELS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export function pad(n) {
  return String(n).padStart(2, '0');
}

export function dateStr(annee, mois, jour) {
  return `${annee}-${pad(mois)}-${pad(jour)}`;
}

export function todayStr() {
  const d = new Date();
  return dateStr(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

export function ymKey(str) {
  return str.slice(0, 7);
}

export function ajouterMois(ym, delta) {
  const [y, m] = ym.split('-').map(Number);
  const total = y * 12 + (m - 1) + delta;
  const nouvelleAnnee = Math.floor(total / 12);
  const nouveauMois = (total % 12) + 1;
  return `${nouvelleAnnee}-${pad(nouveauMois)}`;
}

export function libelleMois(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MOIS_LABELS[m - 1]} ${y}`;
}

/**
 * @returns {{dateStr: string, jourSemaine: number}[]} un élément par jour du
 *          mois ('YYYY-MM'), jourSemaine au format JS natif (0=dimanche..6=samedi).
 */
export function joursDuMois(ym) {
  const [y, m] = ym.split('-').map(Number);
  const nbJours = new Date(y, m, 0).getDate();
  const jours = [];
  for (let j = 1; j <= nbJours; j++) {
    const date = new Date(y, m - 1, j);
    jours.push({ dateStr: dateStr(y, m, j), jourSemaine: date.getDay() });
  }
  return jours;
}
