import axios, {AxiosResponse} from 'axios';

interface DayLengthResponse {
    dayLength: string;
}

const baseURL = process.env.VUE_APP_API_URL


const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
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
                params: {lat, lng, date},
            }
        );

        return response.data.dayLength;
    } catch (error) {
        console.error('Errore durante la richiesta API:', error);
        throw error;
    }
};
