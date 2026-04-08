const BASE_URL = import.meta.env.VITE_API_URL

export interface HttpClientConfig extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  headers?: Record<string, string>
}

export async function httpClient<T = unknown>(
  endpoint: string,
  { method = 'GET', body, headers = {}, ...customConfig }: HttpClientConfig = {}
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
    ...customConfig
  }

  if (body) config.body = JSON.stringify(body)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message = (errorData as { message?: string }).message
      throw new Error(
        message || `Error ${response.status}: ${response.statusText}`
      )
    }

    const data = (await response.json().catch(() => null)) as T
    return data
  } catch (error) {
    console.error('Error en la API:', error)
    throw error
  }
}

export default httpClient
