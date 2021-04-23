import { Document, Schema, model } from 'mongoose'
import { sha1 } from '../helpers/sha1'

export class User {
  name: string // "Lucas"
  email: string // "lucas@email.com"
  password: string // encrypted

  constructor(name: string, email: string, password: string) {
    this.email = email
    this.name = name
    this.password = sha1(password)
  }
}

var schema = new Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String}
}, {versionKey: false})

export interface UserDocument extends User, Document { }
export const Users = model<UserDocument>('User', schema)
