import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

let baseUrl: string

if (!__DEV__) {
  baseUrl =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/api'
      : 'http://localhost:3000/api'
} else {
  baseUrl = 'https://wadaag.app/api'
}

const storage = async (): Promise<string | null> => {
  try {
    const res: any = await SecureStore.getItemAsync('userInfo')
    const parsed = JSON.parse(res)
    return parsed?.token ?? null
  } catch (error) {
    console.log(error)
    return null
  }
}

const api = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  obj: object = {}
): Promise<any> => {
  try {
    const token = await storage()
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    switch (method) {
      case 'GET':
        return await axios
          .get(`${baseUrl}/${url}`, config)
          .then((res) => res.data)

      case 'POST':
        return await axios
          .post(`${baseUrl}/${url}`, obj, config)
          .then((res) => res.data)

      case 'PUT':
        return await axios
          .put(`${baseUrl}/${url}`, obj, config)
          .then((res) => res.data)

      case 'DELETE':
        return await axios
          .delete(`${baseUrl}/${url}`, config)
          .then((res) => res.data)

      default:
        throw new Error(`Invalid method ${method}`)
    }
  } catch (error: any) {
    throw error?.response?.data?.error ?? error?.message
  }
}

export default api
