import { useEffect } from 'react';

/**
 * Chemins du portail public : charte graphique = fond clair obligatoire,
 * jamais de thème sombre, même si le système est en dark mode. Garder cette
 * liste synchronisée avec le script inline de index.html et les routes
 * enfants de <PublicLayout> dans App.jsx.
 */
const PUBLIC_LIGHT_PATHS = ['/', '/a-propos', '/services', '/demande-de-stage', '/depot-courrier-externe', '/suivi-dossier'];

/**
 * Synchronise la classe .dark sur <html> avec les préférences système,
 * partout dans l'application — sauf sur le portail public, verrouillé en
 * thème clair. dark: est configuré en mode class-based dans index.css
 * précisément pour permettre cette exception.
 */
export function useThemeSync(pathname) {
  useEffect(() => {
    const root = document.documentElement;

    if (PUBLIC_LIGHT_PATHS.includes(pathname)) {
      root.classList.remove('dark');
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function appliquer() {
      root.classList.toggle('dark', media.matches);
    }
    appliquer();
    media.addEventListener('change', appliquer);
    return () => media.removeEventListener('change', appliquer);
  }, [pathname]);
}
