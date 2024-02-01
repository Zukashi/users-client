import axios from 'axios';
import {toast} from "react-toastify";

const API_BASE_URL = 'http://localhost:3000/v1/auth';



const login = async (email: string, password: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/login`, { email, password }, {
            withCredentials: true
        });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error((error).response.data.message)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(error);
    }
};

const checkAuthStatus = async (): Promise<boolean> => {
    try {
        await axios.get(`${API_BASE_URL}/check`, {
            withCredentials: true
        });
        return true
    } catch (error) {
        return false
    }

};
const logout = async (): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/logout`, {
            withCredentials: true
        });
    } catch (error) {
        throw new Error('Failed to login');
    }
};



export { login, logout, checkAuthStatus };
