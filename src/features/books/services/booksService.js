import Api from "../../../core/services/api";

export async function getBooks() {
  const response = await Api.get("/api/books");
  return response.data;
}

export async function deleteBook(id) {
  const response = await Api.delete(`/api/books/${id}`);
  return response.data;
}
