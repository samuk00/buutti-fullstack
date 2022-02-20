const router = require("express").Router()
let books = require("../books")
const { v4: uuidv4 } = require("uuid")

router.get("/api/books", (req, res) => {
  return res.json(books)
})

router.get("/api/books/:id", (req, res) => {
  const id = req.params.id

  try {
    const book = books.find((b) => b.id === id)
    if (!book) {
      return res.json("Cannot find book").status(400)
    }
    return res.json(book)
  } catch (err) {
    res.status(500).json("request caused error")
  }
})

router.post("/api/books", (req, res) => {
  const body = req.body
  const newBook = { id: uuidv4(), ...body }

  try {
    books = books.concat(newBook)
    return res.json(newBook)
  } catch (err) {
    res.status(500).json("request caused error")
  }
})

router.delete("/api/books/:id", (req, res) => {
  const id = req.params.id

  try {
    books = books.filter((b) => b.id !== id)
    return res.status(200).end()
  } catch (err) {
    res.status(500).json("request caused error")
  }
})

router.put("/api/books/:id", (req, res) => {
  const id = req.params.id
  const newBook = { id: id, ...req.body }

  try {
    books = books.map((b) => (b.id === id ? newBook : b))
    return res.json(newBook)
  } catch (err) {
    res.status(500).json("request caused error")
  }
})

module.exports = router
