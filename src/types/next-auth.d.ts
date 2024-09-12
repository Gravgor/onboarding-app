// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: string
    companyId: string
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    companyId: string
  }
}