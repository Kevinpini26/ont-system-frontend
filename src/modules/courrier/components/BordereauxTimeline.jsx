import { CheckCircle2, Clock } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';
import { EmptyState } from '../../../shared/components/ui/EmptyState';

/**
 * Fil chronologique des bordereaux de transmission : preuve de traçabilité
 * (qui a transmis, à qui, quand, et quand la décharge a été donnée) en cas
 * de contestation sur un délai de traitement. Reçoit `transitions` déjà
 * chargées avec la fiche (voir CourrierResource) — pas de fetch propre,
 * contrairement à AnnotationsPanel.
 */
export function BordereauxTimeline({ transitions }) {
  if (!transitions) return null;

  return (
    <Card>
      <CardHeader title="Bordereaux de transmission" description="Historique complet, opposable en cas de contestation sur un délai." />
      <CardBody>
        {transitions.length === 0 ? (
          <EmptyState title="Aucun bordereau pour le moment" />
        ) : (
          <ol className="space-y-3">
            {transitions.map((t, index) => (
              <li key={index} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-slate-800 dark:text-slate-200">
                    <span className="font-medium">{t.statut_label}</span>
                    {' — transmis par '}
                    <span className="font-medium">{t.emetteur ?? 'Guichet public'}</span>
                    {t.destinataire && (
                      <>
                        {' → à l\'attention de '}
                        <span className="font-medium">{t.destinataire}</span>
                      </>
                    )}
                  </p>
                  <span className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                    {new Date(t.created_at).toLocaleString('fr-FR')}
                  </span>
                </div>

                {t.destinataire && (
                  <div className="mt-2">
                    {t.accuse_reception_at ? (
                      <Badge tone="success" className="inline-flex items-center gap-1">
                        <CheckCircle2 size={12} aria-hidden="true" />
                        Réception accusée par {t.accuse_reception_par} le {new Date(t.accuse_reception_at).toLocaleString('fr-FR')}
                      </Badge>
                    ) : (
                      <Badge tone="warning" className="inline-flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" />
                        En attente de décharge
                      </Badge>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </CardBody>
    </Card>
  );
}
