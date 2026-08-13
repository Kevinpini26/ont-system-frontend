const OPTIONS = [
  { value: '7j', label: '7 derniers jours' },
  { value: '30j', label: '30 derniers jours' },
  { value: 'annee', label: 'Cette année' },
];

export function PeriodSelector({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-ont-blue-700 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
