import Api from '../../../core/services/api';

export const signIn = async (data) => {
    try {
        const response = await Api.post('/api/Auth/login', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to sign in');
    }
};

export const register = async (data) => {
    try {
        const response = await Api.post('/api/Auth/register', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response.data.error);
    }
};

export const logout = () => {
    localStorage.removeItem("token")
    location.replace("http://localhost:5173")
}