import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../services/userService';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

const AccountPage = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        homeAddress: {
            country: '',
            municipality: '',
            postalCode: '',
            street: '',
            houseNumber: ''
        }
    });
    const navigate = useNavigate()
    useEffect(() => {

        getUser().then(setUserData as never) ;
    }, []);

    const {logout} = useAuth()
    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser({firstName: userData.firstName,lastName:userData.lastName, phoneNumber: userData.phoneNumber });
            // Show success message
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            logout();
            navigate('login')
            // Show success message
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <>
        <form onSubmit={handleUpdate}>

            {/* First Name */}
            <input
                type="text"
                value={userData.firstName || ''}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                placeholder="First Name"
            />

            {/* Last Name */}
            <input
                type="text"
                value={userData.lastName || ''}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                placeholder="Last Name"
            />

            {/* Phone Number */}
            <input
                type="tel"
                value={userData.phoneNumber || ''}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                placeholder="Phone Number"
            />


            <button type="submit">Save</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default AccountPage;
