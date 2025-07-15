export interface IUser {
  userId: string
  username: string
  email?: string
  name: string
  role: string
}

declare module 'next-auth' {
  interface Session {
    user: IUser
    accessToken: string
    refreshToken: string
    accessExpire?: number
    error?: string
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser
    accessToken: string
    refreshToken: string
    accessExpire?: number
    error?: string
  }
}
