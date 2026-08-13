// "en_circuit_hierarchique" n'est plus une étape du circuit standard (la
// DGA n'intervient plus que via l'intérim, voir DgDisponibilite côté
// backend) — retiré du pipeline actif, mais son libellé reste ci-dessous
// pour l'affichage défensif d'un historique déjà existant.
export const STATUTS = [
  'recu',
  'au_protocole',
  'en_attente_avis_dg',
  'projet_reponse_en_cours',
  'en_relecture',
  'signe',
  'enregistre',
];

/**
 * Circuit court (direction vers direction, necessite_avis_dg = false) :
 * enregistrement direct depuis "recu", sans passer par les étapes
 * intermédiaires du circuit complet.
 */
export const STATUTS_CIRCUIT_COURT = ['recu', 'enregistre'];

/**
 * Circuit "courrier initié par la DG" (initie_par_dg = true) : ni
 * Protocole ni avis DG (il part déjà de la DG), mais relecture et
 * signature restent obligatoires — deux variantes selon que le rédacteur a
 * coché "Nécessite la validation de la DG avant envoi" ou non (voir
 * CircuitQueuePage.jsx).
 */
export const STATUTS_INITIE_PAR_DG_AVEC_VALIDATION = ['en_attente_validation_dg', 'en_relecture', 'signe', 'enregistre'];
export const STATUTS_INITIE_PAR_DG_SANS_VALIDATION = ['en_relecture', 'signe', 'enregistre'];

export const STATUT_LABELS = {
  recu: 'Reçu',
  au_protocole: 'Au protocole',
  en_circuit_hierarchique: 'En circuit hiérarchique',
  en_attente_avis_dg: "En attente d'avis DG",
  projet_reponse_en_cours: 'Projet de réponse en cours',
  en_attente_validation_dg: 'En attente de validation DG',
  en_relecture: 'En relecture',
  signe: 'Signé',
  enregistre: 'Enregistré',
};

export const TYPE_LABELS = {
  demande_stage: 'Demande de stage',
  correspondance_generale: 'Correspondance générale',
};

export const CLASSIFICATION_LABELS = {
  interne: 'Interne',
  externe: 'Externe',
};

/**
 * Poste du circuit central habilité à faire avancer un courrier depuis
 * chaque statut, et action correspondante — miroir de
 * config('courrier.circuit_transitions') côté backend, pour piloter
 * l'affichage des files d'attente et actions autorisées par poste.
 *
 * `necessiteAvisDg` distingue les deux circuits quand un même statut
 * ("recu") existe dans les deux : omis quand l'entrée s'applique aux deux
 * circuits indifféremment (ex. "au_protocole" n'existe que dans le circuit
 * complet, pas besoin de le préciser).
 */
export const ACTION_PAR_POSTE = {
  reception: { statutDepart: null, action: null }, // la réception crée le courrier (statut initial "recu")
  protocole: [
    { statutDepart: 'recu', necessiteAvisDg: true, endpoint: 'transmettre-protocole', libelle: 'Transmettre au protocole' },
    { statutDepart: 'au_protocole', endpoint: 'transmettre-avis-dg', libelle: 'Transmettre à la DG pour avis' },
  ],
  // La DGA n'agit réellement que lorsque la DG est marquée indisponible
  // (intérim) — garde dynamique appliquée côté backend
  // (CourrierCircuitService::rendreAvisDg()), pas ici.
  dga: [
    { statutDepart: 'en_attente_avis_dg', endpoint: 'rendre-avis', libelle: "Rendre un avis (intérim de la DG)" },
  ],
  dg: [
    { statutDepart: 'en_attente_avis_dg', endpoint: 'rendre-avis', libelle: 'Rendre un avis' },
    { statutDepart: 'en_attente_validation_dg', endpoint: 'valider-avant-diffusion', libelle: 'Valider avant diffusion' },
    { statutDepart: 'en_relecture', endpoint: 'signer', libelle: 'Signer' },
  ],
  secretariat_1: [
    { statutDepart: 'projet_reponse_en_cours', endpoint: 'soumettre-projet-reponse', libelle: 'Soumettre le projet de réponse' },
  ],
  secretariat_2: [
    { statutDepart: 'signe', endpoint: 'enregistrer', libelle: 'Enregistrer' },
    { statutDepart: 'recu', necessiteAvisDg: false, endpoint: 'enregistrer', libelle: 'Enregistrer (circuit court)' },
  ],
};
