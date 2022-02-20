import React from "react"

const Book = ({ book, setFormValues }) => {
  return (
    <li onClick={() => setFormValues(book)}>
      Title: {book.title} <br />
      Author: {book.author}
    </li>
  )
}

export default Book
