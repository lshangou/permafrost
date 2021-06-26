import { Document, Schema, model } from 'mongoose'

export class Post {
  title: string // "How to Play Magic: The Gathering"
  author: string // "21894178273821"
  date: string // "new Date()"
  content: string // "WYSIWYG content"
  categories: string[] // [237892329, 3289382932, 3289328932]
  thumbnail: string
  views: number

  constructor(title: string, author: string, date: string, content: string, categories: string[], thumbnail: string, views: number = 0) {
    this.title = title
    this.author = author
    this.date = date
    this.content = content
    this.categories = categories
    this.thumbnail = thumbnail
    this.views = views
  }
}

var schema = new Schema({
  title: { required: true, type: String },
  author: { required: true, type: String },
  date: { required: true, type: String },
  content: { required: true, type: String },
  categories: { required: true, type: Array },
  thumbnail: { required: true, type: String },
  views: { required: true, type: Number }
}, {versionKey: false})

export interface PostDocument extends Post, Document { }
export const Posts = model<PostDocument>('Post', schema)

export interface updatablePostProprieties {
  title?: string
  date?: string
  content?: string
  categories?: string[]
  thumbnail?: string
  views?: number
}