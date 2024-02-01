import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userService';

const RegistrationPage = () => {
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
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await register(userData);
            navigate('/account');
        } catch (error) {
            console.log('Registration has failed')
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name in userData.homeAddress) {
            setUserData({
                ...userData,
                homeAddress: {
                    ...userData.homeAddress,
                    [name]: value
                }
            });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Email and Password */}
            <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" value={userData.password}
                   onChange={handleChange}/>

            {/* Personal Information */}
            <input type="text" name="firstName" placeholder="First Name" value={userData.firstName}
                   onChange={handleChange}/>
            <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName}
                   onChange={handleChange}/>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={userData.phoneNumber}
                   onChange={handleChange}/>

            {/* Address Fields */}
            <input type="text" name="country" placeholder="Country" value={userData.homeAddress.country}
                   onChange={handleChange}/>
            <input type="text" name="municipality" placeholder="Municipality" value={userData.homeAddress.municipality}
                   onChange={handleChange}/>
            <input type="text" name="postalCode" placeholder="Postal Code" value={userData.homeAddress.postalCode}
                   onChange={handleChange}/>
            <input type="text" name="street" placeholder="Street" value={userData.homeAddress.street}
                   onChange={handleChange}/>
            <input type="text" name="houseNumber" placeholder="House Number" value={userData.homeAddress.houseNumber}
                   onChange={handleChange}/>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationPage;
