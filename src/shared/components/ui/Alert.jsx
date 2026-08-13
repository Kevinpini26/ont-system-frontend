const TONES = {
  error: 'bg-rose-50 text-rose-800 ring-1 ring-inset ring-rose-200 dark:bg-rose-950/60 dark:text-rose-200 dark:ring-rose-900',
  success:
    'bg-ont-green-50 text-ont-green-800 ring-1 ring-inset ring-ont-green-200 dark:bg-ont-green-900/40 dark:text-ont-green-200 dark:ring-ont-green-800',
  info: 'bg-ont-blue-50 text-ont-blue-800 ring-1 ring-inset ring-ont-blue-200 dark:bg-ont-blue-950/60 dark:text-ont-blue-200 dark:ring-ont-blue-900',
};

export function Alert({ tone = 'info', className = '', children }) {
  return (
    <div role="status" className={`rounded-lg px-4 py-3 text-sm ${TONES[tone]} ${className}`}>
      {children}
    </div>
  );
}
