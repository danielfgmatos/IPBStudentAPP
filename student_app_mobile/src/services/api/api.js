import axios from 'axios';






const api = axios.create({


    baseURL: 'https://ipbstudentmobileapp.azurewebsites.net/api-v1/',
    headers: { 'Content-Type': 'application/json; charset=UTF-8'}

})

export default api;