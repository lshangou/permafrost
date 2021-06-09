import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'

export const authCheckMiddleware = (req: any, res: Response, next: NextFunction) => {

  // TODO: Check auth function
  // let user: User = {
  //   name: "Lucas",
  //   email: "lucas@email.com",
  //   password: "123",
  //   permission: 1
  // }
  let user = null

  if(user) {
    req.user = user
    // console.log("Usuário " + req.user.name +" acessando a rota /" + req.baseUrl)
  } else {
    req.user = {}
    // console.log("Usuário desconhecido acessando a rota /" + req.baseUrl)
  }


  next()
}