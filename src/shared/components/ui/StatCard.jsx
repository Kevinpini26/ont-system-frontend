import { TrendingDown, TrendingUp } from 'lucide-react';

const TONES = {
  primary: 'bg-ont-blue-700 text-white',
  accent: 'bg-ont-gold-500 text-white',
  neutral: 'bg-slate-800 text-white dark:bg-slate-700',
  success: 'bg-ont-green-600 text-white',
  danger: 'bg-rose-600 text-white',
};

/**
 * `variation` : pourcentage par rapport à la période précédente (null/undefined
 * = non applicable, ex. une jauge à l'instant présent sans équivalent
 * historique fiable — voir StagiaireStatistiqueController). `variationSens`
 * indique si une hausse est un signal positif (par défaut) ou négatif (ex.
 * "en attente depuis longtemps", où une hausse est un mauvais signe).
 */
export function StatCard({ label, value, hint, icon, tone = 'primary', variation, variationSens = 'hausse-positive' }) {
  const variationVisible = variation !== null && variation !== undefined;
  const variationEstPositive = variationVisible && (variationSens === 'hausse-positive' ? variation >= 0 : variation <= 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        {icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}>{icon}</div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
            {variationVisible && (
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  variationEstPositive ? 'text-ont-green-600 dark:text-ont-green-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {variation >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(variation)}%
              </span>
            )}
          </div>
          {hint && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
