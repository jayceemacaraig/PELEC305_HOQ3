import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const TaskApi = {
    list: () => api.get('/tasks/'),
    create: (data) => api.post('/tasks/', data),
    update: (id, data) => api.patch(`/tasks/${id}/`, data),
    delete: (id) => api.delete(`/tasks/${id}/`)
}