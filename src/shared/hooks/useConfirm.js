import { useCallback, useRef, useState } from 'react';

const ETAT_INITIAL = { open: false, title: '', description: '', confirmLabel: undefined, cancelLabel: undefined, tone: 'primary' };

/**
 * `const ok = await confirm({ title, description, tone });` — remplace
 * `window.confirm()` par une boîte de dialogue stylée (voir ConfirmDialog),
 * sans changer la forme du code appelant (toujours un booléen attendu de
 * façon asynchrone). Rendre <ConfirmDialog {...dialogProps} /> une seule
 * fois dans la page qui utilise ce hook.
 */
export function useConfirm() {
  const [etat, setEtat] = useState(ETAT_INITIAL);
  const resolveRef = useRef(null);

  const confirm = useCallback((options) => {
    setEtat({ ...ETAT_INITIAL, ...options, open: true });
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const onConfirm = useCallback(() => {
    setEtat((e) => ({ ...e, open: false }));
    resolveRef.current?.(true);
  }, []);

  const onCancel = useCallback(() => {
    setEtat((e) => ({ ...e, open: false }));
    resolveRef.current?.(false);
  }, []);

  return { confirm, dialogProps: { ...etat, onConfirm, onCancel } };
}
