import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BookList from "../components/BookList"
import BookForm from "../components/BookForm"
import Book from "../components/Book"

//Book list tests

describe("Booklist component tests", () => {
  const testList = [
    {
      id: "1",
      title: "test title1",
      author: "test author1",
      description: "test desc1",
    },
    {
      id: "2",
      title: "test title2",
      author: "test author2",
      description: "test desc3",
    },
    {
      id: "3",
      title: "test title3",
      author: "test author3",
      description: "test desc3",
    },
  ]

  test("renders the list header", () => {
    render(<BookList books={testList} />)
    const headerElem = screen.getByText("Book list")
    expect(headerElem).toBeDefined()
  })

  test("renders the list elements of the component", () => {
    render(<BookList books={testList} />)
    const listElement1 = screen.getByText(
      "Title: test title1 Author: test author1"
    )
    const listElement2 = screen.getByText(
      "Title: test title2 Author: test author2"
    )
    const listElement3 = screen.getByText(
      "Title: test title3 Author: test author3"
    )
    expect(listElement1).toBeDefined()
    expect(listElement2).toBeDefined()
    expect(listElement3).toBeDefined()
  })

  test("single book element renders correctly", () => {
    const book = {
      id: "123",
      title: "test-title200",
      author: "test-author200",
      description: "test-desc200",
    }
    render(<Book book={book} setFormValues={jest.fn()} />)
    expect(
      screen.getByText("Title: test-title200 Author: test-author200")
    ).toBeDefined()
  })
})

// Book form tests

describe("Book form component tests", () => {
  const validMsg = {}
  const setTitle = jest.fn()
  const setAuthor = jest.fn()
  const setDescription = jest.fn()
  const createBook = jest.fn()
  const updateBook = jest.fn()
  const removeBook = jest.fn()

  const renderFunc = (selected) => {
    let selectedBookID = ""

    if (selected) {
      selectedBookID = "12345"
    }

    return render(
      <BookForm
        selectedBook={selectedBookID}
        title="test-title"
        setTitle={setTitle}
        author="test-author"
        setAuthor={setAuthor}
        description="test-desc"
        setDescription={setDescription}
        createBook={createBook}
        removeBook={removeBook}
        updateBook={updateBook}
        validMsg={validMsg}
      />
    )
  }

  test("Save new button calls the createBook function with the correct arguments", () => {
    renderFunc(false)
    render(<BookList />)
    const saveNew = screen.getByText("Save new")
    userEvent.click(saveNew)

    expect(createBook.mock.calls).toHaveLength(1)
    expect(createBook.mock.calls[0][0].title).toBe("test-title")
    expect(createBook.mock.calls[0][0].author).toBe("test-author")
    expect(createBook.mock.calls[0][0].description).toBe("test-desc")
  })

  test("updateBook cannot be called via Save button if book is not selected", () => {
    renderFunc(false)
    const save = screen.getByText("Save")
    userEvent.click(save)
    expect(updateBook.mock.calls).toHaveLength(0)
  })

  test("updateBook function can be called via Save button if book is selected", () => {
    renderFunc(true)
    const save = screen.getByText("Save")
    userEvent.click(save)
    expect(updateBook.mock.calls).toHaveLength(1)
    expect(updateBook.mock.calls[0][0].title).toBe("test-title")
    expect(updateBook.mock.calls[0][0].author).toBe("test-author")
    expect(updateBook.mock.calls[0][0].description).toBe("test-desc")
  })

  test("removeBook function can be called via Delete button if book is selected", () => {
    renderFunc(true)
    const deleteBtn = screen.getByText("Delete")
    userEvent.click(deleteBtn)
    expect(removeBook.mock.calls).toHaveLength(1)
    expect(removeBook.mock.calls[0][0]).toBe("12345")
  })

  test("Delete button does not call removeBook if book is not selected", () => {
    renderFunc(false)
    const deleteBtn = screen.getByText("Delete")
    userEvent.click(deleteBtn)
    expect(removeBook.mock.calls).toHaveLength(0)
  })
})
