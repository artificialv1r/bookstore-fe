import axios from "axios";

let Api = axios.create({
  baseURL: "http://localhost:5234",
});

Api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
)

Api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Logika za automatsku odjavu korisnika
        alert('Not authorized! Please sign in again.')

        setTimeout(() => {
          const logout = getGlobalLogout();
          if (logout) {
            logout(); // Poziva logout iz konteksta
          }
        }, 1000);

      }
      return Promise.reject(error);
    }
);

export default Api;
