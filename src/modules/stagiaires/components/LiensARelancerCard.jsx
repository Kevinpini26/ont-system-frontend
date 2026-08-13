import { Card, CardBody, CardHeader } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';

const LIEN_TYPE_LABELS = {
  convention: 'Convention de stage',
  retour_experience: "Retour d'expérience",
};

export function LiensARelancerCard({ liens }) {
  const base = `${window.location.origin}/liens`;

  return (
    <Card>
      <CardHeader title="Liens à transmettre au stagiaire" description="À relayer manuellement si l'e-mail du candidat n'a pas pu être utilisé." />
      <CardBody className="space-y-2">
        {liens.map((lien) => (
          <div key={lien.token} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">{LIEN_TYPE_LABELS[lien.type] ?? lien.type}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{`${base}/${lien.token}`}</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => navigator.clipboard.writeText(`${base}/${lien.token}`)}
            >
              Copier
            </Button>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
