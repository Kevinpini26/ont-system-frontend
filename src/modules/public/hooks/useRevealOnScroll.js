import { useEffect, useRef, useState } from 'react';

/**
 * Fondu + légère translation verticale à l'entrée d'une section dans le
 * viewport — une fois déclenché, jamais rejoué (observer déconnecté après
 * la première apparition). Réservé aux pages publiques : discret et non
 * répétitif, jamais utilisé dans l'espace applicatif interne.
 */
export function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
  };
}
