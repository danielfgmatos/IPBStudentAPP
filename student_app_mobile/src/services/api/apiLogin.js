import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";




let userToken = AsyncStorage.getItem('userToken');
const apiLogin = axios.create({


    baseURL: 'https://ipbstudentmobileapp.azurewebsites.net/api-v1/',
    headers: { 'Content-Type': 'application/json; charset=UTF-8'}

})

export default apiLogin;