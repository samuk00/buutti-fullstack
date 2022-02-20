import axios from "axios"
const serverURI = "/api/books"

const getBooks = () => {
  return axios.get(serverURI)
}

const postBook = (content) => {
  return axios.post(serverURI, content)
}

const deleteBook = (id) => {
  return axios.delete(`${serverURI}/${id}`)
}

const putBook = (id, updatedBook) => {
  return axios.put(`${serverURI}/${id}`, updatedBook)
}

const requests = {
  getBooks,
  postBook,
  deleteBook,
  putBook,
}

export default requests
