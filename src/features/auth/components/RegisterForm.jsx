import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import "../auth.scss"

const RegisterForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        name: '',
        surname: '',
    });

    const [pwError, setPwError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (pwError) setPwError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPwError("Passwords do not match!");
            return;
        }

        try {
            const { confirmPassword, ...dataToSend } = formData;
            await register(dataToSend);
            alert('Registration successful!')
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-hero">
                <h2>Register</h2>
            </div>
            <div className="auth-form-register">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                    <label>
                        Email
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <label>
                        Username
                    </label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <label>
                        Password
                    </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <label>
                        Confirm Password
                    </label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <label>
                        Name
                    </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="input-field">
                    <label>
                        Surname
                    </label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                    </div>

                    {pwError && <p className="error-message">{pwError}</p>}

                    <button className="btn" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;