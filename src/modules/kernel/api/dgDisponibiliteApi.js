import { apiClient } from '../../../shared/api/client';

export async function getDgDisponibilite() {
  const { data } = await apiClient.get('/dg-disponibilite');
  return data.disponible;
}

export async function updateDgDisponibilite(disponible) {
  const { data } = await apiClient.post('/dg-disponibilite', { disponible });
  return data.disponible;
}
