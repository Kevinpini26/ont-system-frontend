const TONES = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  info: 'bg-ont-blue-50 text-ont-blue-700 dark:bg-ont-blue-950 dark:text-ont-blue-300',
  success: 'bg-ont-green-50 text-ont-green-700 dark:bg-ont-green-900/40 dark:text-ont-green-300',
  warning: 'bg-ont-gold-100 text-ont-gold-800 dark:bg-ont-gold-900/40 dark:text-ont-gold-300',
  danger: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
};

export function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
