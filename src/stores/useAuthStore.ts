import { create } from 'zustand'

interface User {
    userId: string
    username: string
    email?: string
    name: string
    role: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoggedIn: boolean
  login: (user: User, accessToken: string, refreshToken: string) => void
  logout: () => void
  restore: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  login: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken, isLoggedIn: true })
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('accessToken', accessToken)
    window.localStorage.setItem('refreshToken', refreshToken)
  },
  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null, isLoggedIn: false })
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
  },
  restore: () => {
    const user = window.localStorage.getItem('user')
    const accessToken = window.localStorage.getItem('accessToken')
    const refreshToken = window.localStorage.getItem('refreshToken')
    if (user && accessToken && refreshToken) {
      set({
        user: JSON.parse(user),
        accessToken,
        refreshToken,
        isLoggedIn: true,
      })
    }
  }
}))

export default useAuthStore 