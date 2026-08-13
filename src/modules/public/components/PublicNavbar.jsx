import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { OntLogo } from '../../../shared/components/ui/OntLogo';
import { useScrolled } from '../hooks/useScrolled';

const LIENS = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Services', to: '/services' },
  { label: 'Suivre mon dossier', to: '/suivi-dossier' },
];

const lienClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'text-ont-blue-700' : 'text-slate-600 hover:text-ont-blue-700'
  }`;

/**
 * Navbar du site public : fixe au scroll, se compacte légèrement (hauteur
 * réduite, fond plus opaque) après un petit défilement — voir useScrolled.
 * Le portail public reste toujours en thème clair (charte graphique) : ce
 * composant n'utilise donc volontairement aucune variante dark:.
 * Le bouton "Espace personnel" est le seul lien vers /connexion : réservé
 * au personnel, jamais un point d'entrée principal du site.
 */
export function PublicNavbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'h-14' : 'h-20'
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <OntLogo className="h-9 w-9 shrink-0" />
          <span className="font-heading text-sm leading-tight font-semibold text-slate-900">
            Office National
            <br />
            du Tourisme
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LIENS.map((lien) => (
            <NavLink key={lien.to} to={lien.to} end={lien.to === '/'} className={lienClass}>
              {lien.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/connexion"
            className="hidden rounded-md bg-ont-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-ont-blue-800 sm:inline-flex"
          >
            Espace personnel
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {LIENS.map((lien) => (
              <NavLink key={lien.to} to={lien.to} end={lien.to === '/'} onClick={() => setMobileOpen(false)} className={lienClass}>
                {lien.label}
              </NavLink>
            ))}
            <Link
              to="/connexion"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md bg-ont-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white"
            >
              Espace personnel
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
