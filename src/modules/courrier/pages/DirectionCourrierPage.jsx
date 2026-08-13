import { PageHeader } from '../../../shared/components/ui/PageHeader';
import { DirectionCourrierWorkspace } from '../components/DirectionCourrierWorkspace';

export function DirectionCourrierPage() {
  return (
    <div>
      <PageHeader title="Courrier" description="Courriers émis et reçus par votre direction, et envoi d'un nouveau courrier." />
      <DirectionCourrierWorkspace />
    </div>
  );
}
