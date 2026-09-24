const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

async function main() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  }

  const connection = await mysql.createConnection(config)
  const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql')
  const schemaSql = fs.readFileSync(schemaPath, 'utf8')

  await connection.query(schemaSql)
  console.log('Database initialized successfully.')
  await connection.end()
}

main().catch((error) => {
  console.error('Failed to initialize database:', error.message)
  process.exit(1)
})
