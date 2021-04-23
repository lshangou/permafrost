// String encrypter.
import crypto from 'crypto'

export function sha1(data: string) {
  return crypto.createHash("sha1").update(data, "binary").digest("hex")
}