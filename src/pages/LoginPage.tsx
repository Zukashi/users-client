import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext.tsx";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/account');
        } catch (error) {
            // Handle error (e.g., show error message)
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </form>
            </>
    );
};

export default LoginPage;
