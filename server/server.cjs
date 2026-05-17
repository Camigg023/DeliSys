require('dotenv').config()

const path = require('node:path')
const fs = require('node:fs')
const express = require('express')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const frontendDistPath = path.resolve(__dirname, '../dist')

app.use(cors({ origin: FRONTEND_URL }))
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({ message: 'Backend de DeliSys funcionando' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'DeliSys' })
})

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath))

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Backend de DeliSys funcionando. Para ver el frontend en este mismo puerto ejecuta: npm run build && npm run serve')
  })
}

app.listen(PORT, () => {
  console.log(`DeliSys corriendo en http://localhost:${PORT}`)
})
