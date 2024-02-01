import axios from 'axios';
import {toast} from "react-toastify";

const API_BASE_URL = 'http://localhost:3000/v1/user'; // Replace with your actual API URL

interface User {
    // Define the user properties according to your backend
    id?:string;
    email: string;
    password: string
    // other properties
}
const register = async (userData: User): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}`, userData);
        toast.error('Registered successfully')
        // Handle the response as needed, e.g., showing a success message
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(error.response.data.message)
        throw new Error('Failed to register');
        // You can also handle specific error responses here
    }
};

const getUser = async (): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data');
        // Handle errors, e.g., user not found
    }
};

const updateUser = async (userData: { phoneNumber: string, lastName:string, firstName:string }): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}`, userData, {
            withCredentials: true
        }
    );

    } catch (error) {
        console.log(error)
        throw new Error('Failed to update user data');
        // Handle errors, e.g., validation errors
    }
};

export { register, getUser, updateUser };
