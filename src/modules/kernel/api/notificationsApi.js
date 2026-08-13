import { apiClient } from '../../../shared/api/client';

export async function listNotifications() {
  const { data } = await apiClient.get('/notifications');
  return data;
}

export async function markNotificationRead(id) {
  await apiClient.post(`/notifications/${id}/marquer-lu`);
}

export async function markAllNotificationsRead() {
  await apiClient.post('/notifications/marquer-toutes-lues');
}

export async function getCompteurs() {
  const { data } = await apiClient.get('/notifications/compteurs');
  return data;
}

export async function marquerConsulte(cle) {
  await apiClient.post('/notifications/marquer-consulte', { cle });
}
