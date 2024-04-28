export interface IUser {
  id: string
  email: string
  createdAt: string
  updatedAt: string
  roles: Role[]
}

export interface Role {
  id: string
  value: string
  description: string
  createdAt: string
  updatedAt: string
}

