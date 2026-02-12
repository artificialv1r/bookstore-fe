import Api from "../../../core/services/api";

export async function getPublishers() {
  const response = await Api.get("/api/publishers");
  return response.data;
}

export async function fetchSortedPublishers(page, sortBy) {
  try{
    const response = await Api.get(`/api/publishers/sorting?page=${page}&sortType=${sortBy}`);
    return response.data;
  } catch (error){
    throw error;
  }
}
