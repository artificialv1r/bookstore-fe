import Api from "../../../core/services/api";

export async function getAllAuthors() {
  const response = await Api.get("/api/authors");
  return response.data;
}
