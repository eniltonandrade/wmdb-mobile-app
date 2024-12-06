import { api } from '.'

export async function healthCheck() {
  const { data } = await api.get('health')
  return data
}
