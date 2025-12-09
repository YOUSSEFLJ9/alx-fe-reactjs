import axios from 'axios';


export default async function fetchUserData(query) {
    const response = await axios.get(`https://api.github.com/search/users?q=${query} `, {
    });
    return response.data;
}