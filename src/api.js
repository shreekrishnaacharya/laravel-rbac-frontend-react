import axios from 'axios'

const api = axios.create({
    // baseURL: "http://localhost:8000/skrbac"
    baseURL: "/skrbac"
});

export { api }