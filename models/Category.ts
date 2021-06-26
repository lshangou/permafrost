import { Document, Schema, model } from 'mongoose'

export class Category {
  name: string // "Magic: The Gathering"
  color: string // "#333333"

  constructor(name: string, color: string = "") {
    this.name = name
    this.color = color
  }
}

var schema = new Schema({
  name: { required: true, type: String },
  color: { required: false, type: String }
}, {versionKey: false})

export interface CategoryDocument extends Category, Document { }
export const Categories = model<CategoryDocument>('Category', schema)

export interface updatableCategoryProprieties {
  name?: string
  color?: string
}