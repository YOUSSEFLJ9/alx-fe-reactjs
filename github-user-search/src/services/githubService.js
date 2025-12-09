import axios from 'axios';


export default async function fetchUserData(username, query) {
    const response = await axios.get(`https://api.github.com/search/${username}?q=${query} `, {
    });
    return response.data;
}