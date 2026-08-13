import { useEffect, useState } from 'react';
import { listAuditLogs } from '../api/auditLogsApi';
import { PageHeader } from '../../../shared/components/ui/PageHeader';
import { Card, CardBody } from '../../../shared/components/ui/Card';
import { LoadingBlock } from '../../../shared/components/ui/Spinner';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { Badge } from '../../../shared/components/ui/Badge';
import { TableWrap, tableClass, theadClass, thClass, tbodyClass, tdClass, trHoverClass } from '../../../shared/components/ui/Table';
import { ScrollText } from 'lucide-react';

const TONE_PAR_ACTION = {
  'auth.connexion': 'success',
  'auth.deconnexion': 'neutral',
  'auth.echec_connexion': 'danger',
  'courrier.signature': 'info',
  'stagiaire.affectation': 'info',
  'stagiaire.evaluation_direction': 'warning',
  'stagiaire.evaluation_dfp': 'warning',
};

export function AdminAuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    listAuditLogs()
      .then((data) => setLogs(data.data))
      .finally(() => setChargement(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Journal d'audit"
        description="Traçabilité des actions sensibles (connexions, signatures, affectations, notations) à des fins de litige."
      />

      <Card>
        <CardBody className="p-0">
          {chargement ? (
            <LoadingBlock />
          ) : logs.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={<ScrollText size={32} />} title="Aucune action journalisée pour le moment" />
            </div>
          ) : (
            <TableWrap>
              <table className={tableClass}>
                <thead className={theadClass}>
                  <tr>
                    <th className={thClass}>Date</th>
                    <th className={thClass}>Action</th>
                    <th className={thClass}>Auteur</th>
                    <th className={thClass}>Détails</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  {logs.map((log) => (
                    <tr key={log.id} className={trHoverClass}>
                      <td className={`${tdClass} whitespace-nowrap`}>{new Date(log.created_at).toLocaleString('fr-FR')}</td>
                      <td className={tdClass}>
                        <Badge tone={TONE_PAR_ACTION[log.action] ?? 'neutral'}>{log.action}</Badge>
                      </td>
                      <td className={tdClass}>{log.auteur?.name ?? '—'}</td>
                      <td className={`${tdClass} max-w-md truncate`} title={log.description ?? JSON.stringify(log.meta ?? {})}>
                        {log.description ?? (log.meta ? JSON.stringify(log.meta) : '—')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
