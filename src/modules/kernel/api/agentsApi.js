import { apiClient } from '../../../shared/api/client';

export async function listAgentsCircuitCourrier() {
  const { data } = await apiClient.get('/agents-circuit-courrier');
  return data.data;
}
