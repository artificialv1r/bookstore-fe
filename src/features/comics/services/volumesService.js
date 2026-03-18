import Api from "../../../core/services/api";

export async function getVolumes(query) {
    const response = await Api.get(`/api/Comics/volumes?query=${query}`);
    return response.data;
}

export async function getIssuesByVolumeId(volumeId) {
    const response = await Api.get(`/api/Comics/issues?volumeId=${volumeId}`);
    return response.data;
}

export async function saveIssue(data) {
    const response = await Api.post("/api/Comics/issue", data);
    return response.data;
}