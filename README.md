# ONT — Frontend

Interface web du Système d'information de l'Office National du Tourisme de la
RDC : SPA React 19 + Vite, consommant l'API REST du dossier `backend/`.

## Stack

- **React 19 + Vite**, JavaScript (pas TypeScript).
- **Tailwind CSS v4** (`@tailwindcss/vite`) pour l'intégralité du style —
  aucune feuille de style écrite à la main en dehors de `src/index.css`
  (import Tailwind + palette de couleurs institutionnelle + quelques réglages
  globaux non exprimables en classes utilitaires, ex. `accent-color`).
- **Zustand** (+ middleware `persist`) pour l'état d'authentification global.
- **react-router-dom v7** pour le routage, avec gardes par rôle/poste
  (`ProtectedRoute`).
- **@tiptap/react** pour l'édition de texte riche (projet de réponse d'un
  courrier) — le contenu est stocké/rechargé comme document JSON structuré,
  jamais comme HTML injecté.
- **recharts** pour les graphiques des tableaux de bord.
- **axios** avec intercepteurs (attache le jeton Sanctum, gère les 401).

## Structure

```
src/
  modules/
    kernel/       # auth, directions, utilisateurs, journal d'audit
    courrier/     # circuit courrier, files d'attente, éditeur TipTap
    stagiaires/   # cycle de vie stagiaire, dashboard DFP
    public/       # vérification de dossier (sans authentification)
  shared/
    api/          # client axios, notifications
    components/   # AppLayout, Sidebar, ProtectedRoute...
    components/ui/  # design system Tailwind réutilisable (Button, Card,
                     # Badge, Alert, EmptyState, StatCard, Table, Field...)
    navigation.js  # source unique de la sidebar par rôle/poste
```

Chaque module frontend miroir son homologue backend, plus `shared/` pour le
transverse (mêmes conventions que le backend modulaire).

## Installation

```bash
npm install
npm run dev       # http://localhost:5173, attend le backend sur :8000
npm run build      # build de production dans dist/
```

Le client API (`src/shared/api/client.js`) pointe vers `http://localhost:8000/api/v1`
en développement — adapter `VITE_API_BASE_URL` (ou équivalent) pour un autre
environnement.

## Design system

Palette définie dans `src/index.css` via `@theme` (Tailwind v4) :
- `primary-*` : bleu institutionnel (identité ONT/administration).
- `accent-*` : or/ocre, utilisé avec parcimonie (identité tourisme).
- Le reste (gris, sémantique succès/alerte/erreur) vient de la palette Tailwind
  standard (`slate`, `emerald`, `amber`/`accent`, `rose`).

Composants réutilisables dans `shared/components/ui/` : privilégier leur usage
à toute classe Tailwind ad hoc répétée sur plusieurs pages.

## Navigation par rôle

`shared/navigation.js` est la source unique de vérité de la sidebar : chaque
rôle (administrateur, agent DFP, responsable de direction, agent de circuit
courrier) n'y voit que ses propres sections. Le routage (`App.jsx`) applique
séparément les gardes d'accès (`ProtectedRoute`) — les deux doivent rester
cohérents si un nouveau rôle ou une nouvelle page est ajoutée.

## Sécurité

Voir `SECURITY.md` à la racine du dépôt. Points spécifiques au frontend :
aucun usage de `dangerouslySetInnerHTML`, échappement systématique du contenu
utilisateur dans l'export PDF de listes (`ExportButtons.jsx`), jeton Sanctum
transmis uniquement via l'en-tête `Authorization` (jamais en query string ni en
cookie).
