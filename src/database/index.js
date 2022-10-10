const mysql = require("mysql2")
const fs = require("fs")
const bcrypt = require("bcryptjs")

// Load .env variables
require("dotenv").config()

// Read SQL seed query
const seedQuery = fs.readFileSync("src/database/seed.sql", {
  encoding: "utf-8",
})

// Connect to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASEDB,
  dialect: "mysql",
  host: process.env.HOST,
  timezone: "-04:00",
  logging: false,
  port: 3306,
  multipleStatements: true, // IMPORTANT
})

connection.connect()

// Generate random password for initial admin user
const psw = Math.random()
  .toString(36)
  .substring(2)
const hash = bcrypt.hashSync(psw, 10)

console.log("Running SQL seed...")

// Run seed query
connection.query(seedQuery, [hash], err => {
  if (err) {
    throw err
  }

  console.log("SQL seed completed! Password for initial admin account: " + psw)
  connection.end()
})