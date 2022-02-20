import React from "react"
import Book from "./Book"

const BookList = ({
  books,
  setSelectedBook,
  setTitle,
  setAuthor,
  setDescription,
}) => {
  if (!books) {
    return <div>loading books...</div>
  }

  const setSelected = (bookData) => {
    setSelectedBook(bookData.id)
    setTitle(bookData.title)
    setAuthor(bookData.author)
    setDescription(bookData.description)
  }

  return (
    <div className="list-container">
      <h2>Book list</h2>
      <ul>
        {books.map((b) => {
          return <Book key={b.id} book={b} setFormValues={setSelected} />
        })}
      </ul>
    </div>
  )
}

export default BookList
