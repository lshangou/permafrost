import { Document, Schema, model } from 'mongoose'

export class User {
  name: string // "Lucas"
  email: string // "lucas@email.com"

  constructor(name: string, email: string) {
    this.email = email
    this.name = name
  }
}

var schema = new Schema({
  name: { required: false, type: String },
  email: { required: true, type: String }
})

export interface UserDocument extends User, Document { }
export const Users = model<UserDocument>('User', schema)
