import axios from 'axios';

// Set base URL for all Axios requests
axios.defaults.baseURL = 'https://notes.devlop.tech/api';

// Request Interceptor:
axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  console.log("Token found:", token); 
  if (token) {
    request.headers.Authorization = `Bearer ${token}`; 
  } else {
    console.error("No token found in localStorage");
  }
  return request;
});

// Response Interceptor:
axios.interceptors.response.use(
  // Success Handler
  (response) => response.data,
  // Error Handler
  (error) => {
    if (error.response) {
      // Missing or Invalid Token, Authentication Failure:
      if (error.response.status === 401) {
        console.error('Unauthorized access - maybe token expired.');
        localStorage.removeItem('token');
        localStorage.removeItem('data'); 
        window.location.href = '/login'; 
      }
      //other status 
      console.error(`Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    // rejects the promise and passes the error along to be handled elsewhere
    return Promise.reject(error); 
  }
);

export default axios;
