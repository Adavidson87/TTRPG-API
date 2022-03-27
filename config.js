const config = {
  CONNECTION_URI: process.env.CONNECTION_URI || 'mongodb://localhost:27017/TTRPG-API',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret'
}
module.exports = config