import { apiClient } from '../../../shared/api/client';

export async function listAuditLogs(params = {}) {
  const { data } = await apiClient.get('/audit-logs', { params });
  return data;
}
