import { PageHeader } from '../../../shared/components/ui/PageHeader';
import { DirectionCourrierWorkspace } from '../../courrier/components/DirectionCourrierWorkspace';

export function DfpCourrierPage() {
  return (
    <div>
      <PageHeader title="Courrier" description="Courriers émis et reçus par la DFP en tant que direction, et envoi d'un nouveau courrier." />
      <DirectionCourrierWorkspace />
    </div>
  );
}
