import Api from "../../../core/services/api";

export async function getBooks() {
  const response = await Api.get("/api/books");
  return response.data;
}

export async function getBookById(id) {
  const response = await Api.get(`/api/books/${id}`);
  return response.data;
}

export async function createBook(bookData) {
  const response = await Api.post(`/api/books`, bookData);
  return response.data;
}

export async function updateBook(id, bookData) {
  const response = await Api.put(`/api/books/${id}`, bookData);
  return response.data;
}

export async function deleteBook(id) {
  const response = await Api.delete(`/api/books/${id}`);
  return response.data;
}
