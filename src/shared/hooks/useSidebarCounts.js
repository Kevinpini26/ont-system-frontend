import { useEffect, useState } from 'react';
import { getCompteurs } from '../../modules/kernel/api/notificationsApi';

const INTERVALLE_MS = 45_000;

/**
 * Compteurs des badges de sidebar (Courriers, Demandes de stage) —
 * rafraîchis par polling léger plutôt que recalculés à l'ouverture de page,
 * pour rester à jour pendant une session de travail sans rechargement.
 * Aucune infrastructure de websocket n'est configurée sur ce projet.
 */
export function useSidebarCounts(user) {
  const [compteurs, setCompteurs] = useState({});

  useEffect(() => {
    if (!user) return;

    let annule = false;

    function rafraichir() {
      getCompteurs()
        .then((data) => {
          if (!annule) setCompteurs(data);
        })
        .catch(() => {});
    }

    rafraichir();
    const intervalle = setInterval(rafraichir, INTERVALLE_MS);

    return () => {
      annule = true;
      clearInterval(intervalle);
    };
  }, [user]);

  return compteurs;
}
