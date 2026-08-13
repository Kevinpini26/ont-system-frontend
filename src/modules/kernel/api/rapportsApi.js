import { apiClient } from '../../../shared/api/client';

export async function telechargerRapportPeriodique({ type, annee, mois }) {
  const response = await apiClient.get('/rapports/periodique', {
    params: { type, annee, mois },
    responseType: 'blob',
  });

  const nomFichier = `rapport-ont-${annee}${type === 'mois' ? `-${String(mois).padStart(2, '0')}` : ''}.pdf`;
  const url = URL.createObjectURL(response.data);
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = nomFichier;
  lien.click();
  URL.revokeObjectURL(url);
}
