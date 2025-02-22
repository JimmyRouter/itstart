import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/api/seminars/';

export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
}

export const getSeminars = async (): Promise<Seminar[]> => {
    const response = await axios.get<Seminar[]>(API_URL);
    return response.data;
};

export const deleteSeminar = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};

export const updateSeminar = async (id: number, data: Partial<Seminar>): Promise<void> => {
    await axios.put(`${API_URL}${id}/`, data);
};