import mongoose from 'mongoose'

export const openDatabaseConnection = async (): Promise<void> => {
  const {
    MONGO_URL,
    MONGODB_URI,
    MONGODB_HOST,
    MONGODB_DATABASE_NAME
  } = process.env

  const databaseUri =
    MONGO_URL ??
    MONGODB_URI ??
    (MONGODB_HOST && MONGODB_DATABASE_NAME
      ? `${MONGODB_HOST}${MONGODB_DATABASE_NAME}`
      : null)

  if (!databaseUri)
    throw new Error(
      'Missing MongoDB configuration in environment variables. Set MONGO_URL or MONGODB_URI.'
    )

  try {
    await mongoose.connect(databaseUri)
    console.log('DB is connected')
  } catch (err) {
    console.error('Error connecting to the database: ', err)
    throw err
  }
}

export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    console.log('DB connection closed')
  } catch (err) {
    console.log('Error closing the database: ', err)
  }
}
