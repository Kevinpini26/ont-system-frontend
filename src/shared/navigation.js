import { BarChart3, Building2, CalendarCheck, FileClock, History, Inbox, LayoutDashboard, Mail, ScrollText, Settings, Users } from 'lucide-react';
import { ROLES } from '../modules/kernel/constants';

/**
 * Sections de la sidebar par rôle : chaque agent ne voit que les entrées
 * pertinentes pour son périmètre (poste du circuit courrier, direction,
 * DFP, administration). Point unique de vérité pour la navigation, gardé
 * volontairement séparé du routing (App.jsx) pour rester lisible.
 */
export function navigationForUser(user) {
  if (!user) return [];

  if (user.role === ROLES.ADMINISTRATEUR) {
    return [
      {
        title: 'Administration',
        items: [
          { label: 'Directions', to: '/admin/directions', icon: Building2 },
          { label: 'Utilisateurs', to: '/admin/utilisateurs', icon: Users },
          { label: "Journal d'audit", to: '/admin/journal-audit', icon: ScrollText },
          { label: 'Rapports', to: '/admin/rapports', icon: LayoutDashboard },
          { label: "Import d'historique", to: '/admin/import-historique', icon: History },
        ],
      },
    ];
  }

  if (user.role === ROLES.AGENT_DFP) {
    return [
      {
        title: 'Aperçu',
        items: [{ label: 'Tableau de bord', to: '/stagiaires/dashboard', icon: LayoutDashboard }],
      },
      {
        title: 'Stagiaires',
        items: [
          { label: 'Stagiaires', to: '/stagiaires/actifs', icon: Users },
          { label: 'Demandes de stage', to: '/stagiaires/demandes', icon: FileClock, countKey: 'demandes_stage' },
          { label: 'Présences', to: '/stagiaires/presences', icon: CalendarCheck },
          { label: 'Historique', to: '/stagiaires/historique', icon: History },
        ],
      },
      {
        title: 'Courrier',
        items: [{ label: 'Courrier', to: '/stagiaires/courrier', icon: Mail, countKey: 'courriers_recus' }],
      },
      {
        title: 'Pilotage',
        items: [
          { label: 'Statistiques', to: '/stagiaires/statistiques', icon: BarChart3 },
          { label: 'Paramètres', to: '/stagiaires/parametres', icon: Settings },
        ],
      },
    ];
  }

  if (user.role === ROLES.RESPONSABLE_DIRECTION) {
    return [
      {
        title: 'Ma direction',
        items: [
          { label: 'Tableau de bord', to: '/direction/tableau-de-bord', icon: LayoutDashboard },
          { label: 'Courrier', to: '/direction/courrier', icon: Mail, countKey: 'courriers_recus' },
          { label: 'Stagiaires', to: '/direction/stagiaires', icon: Users },
        ],
      },
    ];
  }

  if (user.role === ROLES.AGENT_CIRCUIT_COURRIER) {
    const items = [
      { label: 'Ma file de traitement', to: `/circuit/${user.poste}`, icon: Inbox },
      { label: 'Tableau de bord', to: '/circuit/tableau-de-bord', icon: LayoutDashboard },
    ];

    // La DG dispose en plus d'un espace consolidé transverse, distinct de
    // sa simple file de traitement.
    if (user.poste === 'dg') {
      items.push({ label: 'Espace Direction Générale', to: '/circuit/espace-dg', icon: Building2 });
    }

    return [{ title: 'Circuit courrier', items }];
  }

  return [];
}
