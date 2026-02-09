import Api from "../../../core/services/api";

export async function getAllAuthors() {
  const response = await Api.get("/api/authors");
  return response.data;
}

export async function fetchAuthorPage(page) {
    try {
        const response = await Api.get('/api/Authors/paging?page=' + page); // Dodato /api/
        return response.data;
    } catch (error) {
        throw error;
    }
}
