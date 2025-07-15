import { sendRequest } from '@/utils/api'

const login = async (username: string, password: string) => {
  return await sendRequest<IBackendResponse<any>>({
    endpoint: '/auth/login',
    method: 'POST',
    body: {
      emailOrUserName: username,
      password: password
    }
  })
}

const oauth2 = async (idToken: string) => {
  return await sendRequest<IBackendResponse<any>>({
    endpoint: '/auth/oauth2',
    method: 'POST',
    body: { token: idToken }
  })
}

const refreshToken = async (refreshToken: string, userId: string, role: string) => {
  return await sendRequest<IBackendResponse<any>>({
    endpoint: '/auth/refresh-token',
    method: 'POST',
    body: { refreshToken: refreshToken, userId: userId, role: role }
  })
}

export const authService = {
  login,
  oauth2,
  refreshToken
}
