import { FileText, Image as ImageIcon, Paperclip, X } from 'lucide-react';

function formatTaille(octets) {
  if (octets < 1024) return `${octets} o`;
  if (octets < 1024 * 1024) return `${(octets / 1024).toFixed(0)} Ko`;
  return `${(octets / (1024 * 1024)).toFixed(1)} Mo`;
}

function IconePourFichier({ type }) {
  if (type === 'application/pdf') return <FileText size={20} />;
  if (type.startsWith('image/')) return <ImageIcon size={20} />;
  return <Paperclip size={20} />;
}

/**
 * Sélecteur de fichier avec aperçu (icône selon le type, nom, taille) et
 * possibilité de retirer le fichier choisi avant l'envoi — utilisé partout
 * où une pièce jointe est optionnelle ou requise (courrier interne, dépôt
 * de courrier externe). Le texte d'aide passe par le `hint` du <Field>
 * englobant, pas par ce composant, pour ne jamais l'afficher en double.
 */
export function FileUploadPreview({ id, value, onChange, accept, required }) {
  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-slate-300 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ont-blue-100 text-ont-blue-700 dark:bg-ont-blue-900/40 dark:text-ont-blue-300">
          <IconePourFichier type={value.type} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{value.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{formatTaille(value.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          aria-label="Retirer le fichier"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <input
      id={id}
      type="file"
      accept={accept}
      required={required}
      onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      className="block w-full rounded-md border-0 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 dark:text-slate-100 dark:ring-slate-700 dark:file:bg-slate-800 dark:file:text-slate-200"
    />
  );
}
