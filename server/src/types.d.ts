export interface User {
    _id: number,
    username: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

declare namespace Express {
    export interface Request {
      user: any
    }
  }