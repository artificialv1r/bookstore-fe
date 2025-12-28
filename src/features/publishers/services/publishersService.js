import Api from "../../../core/services/api";

export async function getPublishers() {
  const response = await Api.get("/api/publishers");
  return response.data;
}
