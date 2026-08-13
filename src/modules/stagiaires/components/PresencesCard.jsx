import { useEffect, useState } from 'react';
import { listPresences } from '../api/stagiairesApi';
import { CalendrierPresences } from './CalendrierPresences';
import { Card, CardBody, CardHeader } from '../../../shared/components/ui/Card';
import { LoadingBlock } from '../../../shared/components/ui/Spinner';

export function PresencesCard({ stagiaire }) {
  const [presences, setPresences] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    listPresences(stagiaire.id)
      .then(setPresences)
      .finally(() => setChargement(false));
  }, [stagiaire.id]);

  function appliquerChangement(presence, dateSupprimee) {
    setPresences((liste) => {
      if (dateSupprimee) return liste.filter((p) => p.date !== dateSupprimee);
      const sansCeJour = liste.filter((p) => p.date !== presence.date);
      return [...sansCeJour, presence];
    });
  }

  return (
    <Card>
      <CardHeader
        title="Présences"
        description="Calendrier de présence (jours ouvrés), saisi par la DFP — cliquez un jour pour le marquer présent, ou l'ajuster s'il l'est déjà."
      />
      <CardBody>
        {chargement ? (
          <LoadingBlock />
        ) : (
          <CalendrierPresences stagiaire={stagiaire} presences={presences} onChange={appliquerChangement} />
        )}
      </CardBody>
    </Card>
  );
}
