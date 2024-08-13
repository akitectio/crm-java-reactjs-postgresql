import axios from 'axios';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/login', {
      email,
      password,
    });

    // Assuming the backend returns a token upon successful login
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw error;
  }
};
