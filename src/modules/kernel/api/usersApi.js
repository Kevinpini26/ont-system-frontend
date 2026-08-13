import { apiClient } from '../../../shared/api/client';

export async function listUsers(page = 1) {
  const { data } = await apiClient.get('/users', { params: { page } });
  return data;
}

export async function createUser(payload) {
  const { data } = await apiClient.post('/users', payload);
  return data.data;
}

export async function updateUser(id, payload) {
  const { data } = await apiClient.put(`/users/${id}`, payload);
  return data.data;
}

export async function deleteUser(id) {
  await apiClient.delete(`/users/${id}`);
}

export async function revokeUserTokens(id) {
  const { data } = await apiClient.delete(`/users/${id}/tokens`);
  return data;
}
