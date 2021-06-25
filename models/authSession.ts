export class authSession {
  
  cookie: string
  expirationDate: string
  userDevice: string

  constructor(cookie: string, expirationDate: string, userDevice:string) {
    this.cookie = cookie
    this.expirationDate = expirationDate
    this.userDevice = userDevice
  }

}