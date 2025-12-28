import Api from "../../../core/services/api";

export const getPublishers = () => {
  return Api.get("/api/publishers");
};
