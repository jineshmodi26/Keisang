const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config()
const PORT = process.env.PORT || 8000
const inventoryRouter = require("./routes/inventory.route")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api", inventoryRouter)

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})