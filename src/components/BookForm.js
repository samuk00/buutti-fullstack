import React from "react"
import "../styles.css"
import ValidationMsg from "./ValidationMsg"

const BookForm = ({
  selectedBook,
  title,
  setTitle,
  author,
  setAuthor,
  description,
  setDescription,
  createBook,
  removeBook,
  updateBook,
  validMsg,
  setValidMsg,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.length < 1 || author.length < 1) {
      setValidMsg({
        msg: "Title and author cannot be empty",
        color: "red",
      })
      setTimeout(() => {
        setValidMsg("")
      }, 5000)
    } else {
      createBook({ title, author, description })
    }
  }

  const btnStatus = selectedBook === "" ? true : false

  return (
    <div className="form-container">
      <h2>Book form</h2>
      <div className="book-form">
        <form id="book-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="form-label">Title</label>
            <input
              data-testid="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="form-label">Author</label>
            <input
              data-testid="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="form-label">Description</label>
            <input
              data-testid="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">Save new</button>
            <button
              type="button"
              disabled={btnStatus}
              onClick={() => updateBook({ title, author, description })}
            >
              Save
            </button>
            <button
              type="button"
              disabled={btnStatus}
              onClick={() => removeBook(selectedBook)}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <ValidationMsg validMsg={validMsg} />
    </div>
  )
}

export default BookForm
