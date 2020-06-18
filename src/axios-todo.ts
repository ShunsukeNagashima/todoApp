import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todoapp-eb111.firebaseio.com/'
});

export default instance;