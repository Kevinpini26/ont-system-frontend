import { useEffect, useState } from 'react';

/**
 * Détecte un léger défilement de page (au-delà de `threshold`) : pilote la
 * compaction progressive de la navbar publique — jamais un effet brusque,
 * juste un état binaire combiné à des classes `transition-all` côté appelant.
 */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
