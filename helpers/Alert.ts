export interface Alert {
  status: number //404
  type: string //notFound
  message: string //Client Error
  description: string //The requested resource was not found.
  object?: object
}

export const DefaultDatabaseAlert = {
  status: 500,
  type: "databaseError",
  message: "Server Error",
  description: "The server could not resolve the request in the database."
}