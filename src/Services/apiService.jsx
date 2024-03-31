import axios from 'axios';

const BASE_URL = 'http://localhost:4000/'
const token = localStorage.getItem('authToken')

const apiService = {
    get: async (endpoint) => {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response ;
    },
    post: async (endpoint, body) => {

        const response = await axios.post(`${BASE_URL}${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    },
    put: async (endpoint, body) => {
        const response = await axios.put(`${BASE_URL}${endpoint}`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        response
    },
    delete: async (endpoint) => {
        const response = await axios.delete(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    }
}

export default apiService;
