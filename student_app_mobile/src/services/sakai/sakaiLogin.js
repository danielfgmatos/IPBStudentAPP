import axios from 'axios';

const sakaiLogin = axios.create({
    baseURL: 'https://testing.estig.ipb.pt/sakai-ws/rest/',
    headers: { 'Content-Type': 'application/json' }

})

export default sakaiLogin;