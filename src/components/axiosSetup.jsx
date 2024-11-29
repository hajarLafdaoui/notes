import axios from 'axios';

// Set base URL for all Axios requests
axios.defaults.baseURL = 'https://notes.devlop.tech/api';

// Request Interceptor: Attach token to every request
axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  console.log("Token found:", token);  // Log token to check its value
  if (token) {
    request.headers.Authorization = `Bearer ${token}`; // Attach token to request
  } else {
    console.error("No token found in localStorage");
  }
  return request;
});

// Response Interceptor: Handle responses
axios.interceptors.response.use(
  (response) => response.data, // If response is OK, return the data
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle Unauthorized (e.g., token expired or invalid)
        console.error('Unauthorized access - maybe token expired.');

        // Clear token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('data'); // Optionally clear other stored data

        // Redirect to the login page (or show the login component)
        window.location.href = '/login'; // Or use React Router's `history.push('/login')`
      }

      // Handle other status codes as needed
      console.error(`Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default axios;
