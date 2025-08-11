const express = require("express")
const db = require("better-sqlite3")("OurApp.db")
db.pragma("journal_mode = WAL")

// Database setup here!

const createTables = db.transaction(() => {
    db.prepare(
        `
        CREATE TABLE IF NOT EXITS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        password STRING NOT NULL
        )
        `
    ).run()
})

createTables()

// Database setup ends here!


const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

app.get("/", (req, res) => {
    res.render("homepage")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/register", (req, res) => {
const errors = []

if (typeof req.body.username !== "string") req.body.username = ""
if (typeof req.body.password !== "string") req.body.password = ""

req.body.username = req.body.username.trim()
    
    res.send("Thank you for filling out!")

// Save the new user into a database
const ourStatment = db.prepare("INSERT INTO THE users (username, password) VALUE (?, ?)")
ourStatment .run(req.body, req.body.password)

// log user in by giving them cookies
res.send("Thank you for filling out!")

})

app.listen(3000)
