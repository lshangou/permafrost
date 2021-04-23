import { Document, Schema, model } from 'mongoose'
import { sha1 } from '../helpers/sha1'

export class User {
  name: string // "Lucas"
  email: string // "lucas@email.com"
  password: string // encrypted
  permission: number //2: Superadmin, 1: Admin, 0: Normal User

  constructor(name: string, email: string, password: string, permission: number) {
    this.email = email
    this.name = name
    this.password = sha1(password)
    this.permission = permission
  }
}

var schema = new Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String},
  permission: { required: true, type: Number}
}, {versionKey: false})

export interface UserDocument extends User, Document { }
export const Users = model<UserDocument>('User', schema)

export interface updatableUserProprieties {
  name?: string
  email?: string
  password?: string
}