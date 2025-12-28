import Api from "../../../core/services/api";

export const getBooks = () => {
  return Api.get("/api/books");
};
