import { mongodbUri, prewarmCache, redisClient } from './util'

import createApp from './server'
import mongoose from 'mongoose'

const start = async () => {
  console.log('Setting up Express server')
  const app = await createApp()

  console.log('Starting server...')
  const port = process.env.PORT != null && process.env.PORT.trim() !== '' ? parseInt(process.env.PORT, 10) : 3000
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}! 🚀`)
  })

  // Initialize MongoDB and Redis after server is listening
  initializeServices().catch((err) => {
    console.error('Failed to initialize services:', err)
    // Don't exit - server can still serve basic responses
  })

  return server
}

const initializeServices = async () => {
  try {
    console.log('Setting up MongoDB')


    // Mongoose: the `strictQuery` option will be switched back to `false` by
    // default in Mongoose 7, when we update to Mongoose 7 we can remove this.
    mongoose.set('strictQuery', false)
    console.log('Connecting to MongoDB at', mongodbUri)
    await mongoose.connect(mongodbUri)
    //list all collections to ensure connection is established
    const collections = await mongoose.connection.db!.listCollections().toArray()
    console.log('Connected to MongoDB, collections:', collections.map(c => c.name))
    console.log('Database connection ready')

    redisClient.on('error', (err) => console.log('Redis Client Error', err))

    await redisClient.connect()
    console.log('Redis connection ready')

    console.log('Flushing Redis')
    await redisClient.flushAll()

    console.log('Prewarm Redis')
    await prewarmCache()

    console.log('All services initialized successfully')
  } catch (error) {
    console.error('Service initialization failed:', error)
    throw error
  }
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
