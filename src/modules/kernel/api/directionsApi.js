import { apiClient } from '../../../shared/api/client';

export async function listDirections() {
  const { data } = await apiClient.get('/directions');
  return data.data;
}

export async function createDirection(payload) {
  const { data } = await apiClient.post('/directions', payload);
  return data.data;
}

export async function updateDirection(id, payload) {
  const { data } = await apiClient.put(`/directions/${id}`, payload);
  return data.data;
}

export async function deleteDirection(id) {
  await apiClient.delete(`/directions/${id}`);
}
