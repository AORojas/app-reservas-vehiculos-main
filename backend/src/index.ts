import { createServer } from 'node:http'
import { app } from './app.js'
import {
  closeDatabaseConnection,
  openDatabaseConnection
} from './models/mongodb/database.js'

const port = process.env.PORT ?? 3000
const server = createServer(app)

const startServer = async (): Promise<void> => {
  try {
    await openDatabaseConnection()

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await closeDatabaseConnection()
  process.exit(0)
})
