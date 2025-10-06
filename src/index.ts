import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'))
initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const app = new Hono()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
