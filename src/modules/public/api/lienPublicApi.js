import { apiClient } from '../../../shared/api/client';

export async function getLienPublic(token) {
  const { data } = await apiClient.get(`/public/liens/${encodeURIComponent(token)}`);
  return data.data;
}

export async function telechargerConventionPublique(token) {
  window.open(`${apiClient.defaults.baseURL}/public/liens/${encodeURIComponent(token)}/convention.pdf`, '_blank');
}

export async function signerConventionPublique(token) {
  const { data } = await apiClient.post(`/public/liens/${encodeURIComponent(token)}/signer-convention`);
  return data;
}

export async function soumettreRetourPublic(token, payload) {
  const { data } = await apiClient.post(`/public/liens/${encodeURIComponent(token)}/retour`, payload);
  return data;
}
