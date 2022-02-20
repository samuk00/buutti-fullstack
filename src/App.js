import React, { useState, useEffect } from "react"
import bookService from "./services/books"
import BookForm from "./components/BookForm"
import BookList from "./components/BookList"

const App = () => {
  const [selectedBook, setSelectedBook] = useState("")
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [validMsg, setValidMsg] = useState({})

  useEffect(() => {
    bookService
      .getBooks()
      .then((res) => {
        setBooks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const createBook = (content) => {
    bookService
      .postBook(content)
      .then((res) => {
        setBooks(books.concat(res.data))
        setTitle("")
        setAuthor("")
        setDescription("")
        setSelectedBook("")
        setValidMsg({
          msg: `Book "${content.title}" is succefully added to the collection`,
          color: "green",
        })
        setTimeout(() => {
          setValidMsg("")
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeBook = (bookID) => {
    bookService
      .deleteBook(bookID)
      .then(() => {
        const updatedBooks = books.filter((b) => b.id !== bookID)
        setBooks(updatedBooks)
        setTitle("")
        setAuthor("")
        setDescription("")
        setSelectedBook("")
        setValidMsg({
          msg: `Book is succefully removed from the collection`,
          color: "green",
        })
        setTimeout(() => {
          setValidMsg("")
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateBook = (updated) => {
    bookService
      .putBook(selectedBook, updated)
      .then((res) => {
        const updatedBooks = books.map((b) =>
          b.id === selectedBook ? res.data : b
        )
        setBooks(updatedBooks)
        setValidMsg({
          msg: `Book information is successfully updated`,
          color: "green",
        })
        setTimeout(() => {
          setValidMsg("")
        }, 5000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <BookForm
        selectedBook={selectedBook}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        description={description}
        setDescription={setDescription}
        createBook={createBook}
        removeBook={removeBook}
        updateBook={updateBook}
        validMsg={validMsg}
        setValidMsg={setValidMsg}
      />
      <BookList
        books={books}
        setSelectedBook={setSelectedBook}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setDescription={setDescription}
      />
    </div>
  )
}

export default App
