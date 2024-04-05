import api from "@/services/api";

export async function getLastUpdateTime(): Promise<Date> {
    const response = await api.get("/dashboard/last-update-time");

    return response.data as Date;
}
