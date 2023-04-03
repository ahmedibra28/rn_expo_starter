import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

export type UserInfo = {
  readonly _id: string
  name: string
  email: string
  token: null
  role: string
}

type UserInfoStore = {
  userInfo: UserInfo
  isAuth: boolean
  updateUserInfo: (userInfo: UserInfo) => void
  setAuth: (isAuth: boolean) => void
}

const useUserInfoStore = create(
  persist<UserInfoStore>(
    (set) => ({
      userInfo: { _id: '', name: '', email: '', token: null, role: '' },
      isAuth: false,
      updateUserInfo: (userInfo) => {
        return set(() => ({ userInfo }))
      },
      setAuth: (isAuth: boolean) => set(() => ({ isAuth })),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useUserInfoStore
