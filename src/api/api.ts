import axios, { AxiosResponse } from 'axios';
interface DayLengthResponse {
    dayLength: string;
}

const apiClient = axios.create({
    baseURL: 'https://us-central1-sunlight-backend-gcp.cloudfunctions.net/api/', //backend url
   // baseURL: 'http://localhost:8080', //backend url
});

export const getDayLength = async (
    lat: number,
    lng: number,
    date: string
): Promise<string> => {
    try {
        const response: AxiosResponse<DayLengthResponse> = await apiClient.get(
            '/daylight',
            {
                params: { lat, lng, date },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.dayLength;
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
        throw error;
    }
};
