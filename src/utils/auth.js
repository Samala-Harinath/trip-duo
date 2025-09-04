import axios from 'axios';

// You would replace this with your actual API endpoint
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// export const signIn = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/signin`, {
//       email,
//       password,
//     });
    
//     if (response.data?.token) {
//       // Store the token in localStorage
//       localStorage.setItem('auth_token', response.data.token);
//       // Store user data
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       return response.data;
//     }
    
//     throw new Error('Invalid credentials');
//   } catch (error) {
//     throw error.response?.data?.message || 'An error occurred during sign in';
//   }
// };
export const signIn = async (email, password) => {
  try {
   
      // Store the token in localStorage
      localStorage.setItem('auth_token', "harish");
      // Store user data
      localStorage.setItem('user', JSON.stringify({email, password}));
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during sign in';
  }
};

export const signOut = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  // Optionally make an API call to invalidate the token on the server
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Axios interceptor to add auth token to requests
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      signOut();
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);