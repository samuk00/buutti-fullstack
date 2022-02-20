const express = require("express")
const cors = require("cors")
const app = express()
const router = require("./routes/controllers")

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(router)

const port = 3001

app.listen(port, () => {
  console.log(`Listening ${port}`)
})
