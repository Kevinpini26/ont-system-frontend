import { PageHeader } from '../../../shared/components/ui/PageHeader';
import { RapportPeriodiqueForm } from '../components/RapportPeriodiqueForm';

export function AdminRapportsPage() {
  return (
    <div>
      <PageHeader
        title="Rapport périodique pour la tutelle"
        description="Synthèse des courriers traités et des stagiaires accueillis par direction, sur la période choisie."
      />
      <RapportPeriodiqueForm />
    </div>
  );
}
