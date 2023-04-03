import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import api from './api'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiHookParams {
  key: [string]
  method: Method
  url: string
}

interface ApiHookResult<T> {
  post?: ReturnType<typeof useMutation>
  get?: ReturnType<typeof useQuery>
  update?: ReturnType<typeof useMutation>
  deleteObj?: ReturnType<typeof useMutation>
  data?: T
}

export default function apiHook<T>({
  key,
  method,
  url,
}: ApiHookParams): ApiHookResult<T> {
  const queryClient = new QueryClient()
  switch (method) {
    case 'POST':
      const post: any = useMutation<T>((obj: any) => api(method, url, obj), {
        retry: 0,
        onSuccess: async () => await queryClient.invalidateQueries(key),
      })
      return { post }

    case 'GET':
      const get: any = useQuery<T>(key, () => api(method, url), {
        retry: 0,
      })
      return { get, data: get.data }

    case 'PUT':
      const update: any = useMutation<T>((obj: any) => api(method, url, obj), {
        retry: 0,
        onSuccess: async () => await queryClient.invalidateQueries(key),
      })
      return { update }

    case 'DELETE':
      const deleteObj: any = useMutation<T>(
        (obj: any) => api(method, url, obj),
        {
          retry: 0,
          onSuccess: async () => await queryClient.invalidateQueries(key),
        }
      )
      return { deleteObj }

    default:
      throw new Error(`Invalid method ${method}`)
  }
}
