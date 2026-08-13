/**
 * Recharts dessine du SVG et ne peut pas consommer directement les classes
 * Tailwind : ces hex sont la copie fidèle des tokens `ont-*` définis dans
 * `src/index.css` (@theme). Toute nouvelle teinte de graphique doit passer
 * par ce fichier plutôt que par un hex isolé dans une page, pour rester
 * alignée avec la charte graphique ONT en un seul endroit.
 */
export const CHART_COLORS = {
  ontBlue600: '#1e5fa8',
  ontGold500: '#f5a623',
  ontGreen500: '#6fbe44',
  ontPurple500: '#8b5fbf',
  axisTick: '#64748b',
  grid: '#e2e8f0',
};
