import { Request, Response, NextFunction } from 'express'

export interface MyContext {
  res: Response
  req: Request
  next: NextFunction
  payload?: { id: string }
}
