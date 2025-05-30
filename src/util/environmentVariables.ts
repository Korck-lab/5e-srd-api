const isTestEnv = process.env.NODE_ENV === 'test'

const redisUrl =
  process.env.HEROKU_REDIS_YELLOW_URL ?? process.env.REDIS_URL ?? 'redis://localhost:6379'
const bugsnagApiKey = process.env.BUGSNAG_API_KEY ?? null
// MongoDB URI should include the database name for proper connection
const mongodbUri = (() => {
  const uri = isTestEnv ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
  const dbName = isTestEnv ? process.env.TEST_MONGO_DB : process.env.MONGO_DB

  if (uri == null || uri === '') {
    console.warn('Missing MongoDB URI, defaulting to localhost database')
    return 'mongodb://localhost/5e-database'
  }
  if (dbName === undefined || dbName === '') {
    throw new Error('Missing MongoDB database name in environment')
  }
  return `${uri}/${dbName}`
})()

const awsConfigEnv = process.env.AWS_CONFIG_ENV || 'prod'
const awsRegion = process.env.AWS_REGION || 'us-west-1'
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''

export {
  redisUrl,
  bugsnagApiKey,
  mongodbUri,
  awsConfigEnv,
  awsRegion,
  awsAccessKeyId,
  awsSecretAccessKey
}
