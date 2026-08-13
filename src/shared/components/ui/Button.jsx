const VARIANTS = {
  primary:
    'bg-ont-blue-700 text-white hover:bg-ont-blue-800 focus-visible:outline-ont-blue-700 disabled:bg-ont-blue-300 dark:bg-ont-blue-600 dark:hover:bg-ont-blue-500',
  // Réservée aux actions les plus engageantes de l'application (ex. signature
  // définitive d'un courrier) : l'or du logo attire l'œil sur ce qui ne se
  // refait pas, sans être la couleur par défaut de tous les boutons primaires.
  gold: 'bg-ont-gold-500 text-white hover:bg-ont-gold-600 focus-visible:outline-ont-gold-600 disabled:bg-ont-gold-200 dark:bg-ont-gold-500 dark:hover:bg-ont-gold-600',
  secondary:
    'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline-ont-blue-700 disabled:text-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700',
  outline:
    'border border-ont-blue-700 bg-transparent text-ont-blue-700 hover:bg-ont-blue-50 focus-visible:outline-ont-blue-700 disabled:border-slate-300 disabled:text-slate-400 dark:border-ont-blue-400 dark:text-ont-blue-300 dark:hover:bg-ont-blue-950',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600 disabled:bg-rose-300 dark:bg-rose-600 dark:hover:bg-rose-500',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus-visible:outline-ont-blue-700 dark:text-slate-300 dark:hover:bg-slate-800',
};

const SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:shadow-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    />
  );
}
