import { Button } from './Button';

export function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
      <p>
        {meta.total} résultat{meta.total > 1 ? 's' : ''} — page {meta.current_page} / {meta.last_page}
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >
          Précédent
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
