import axios from 'axios';

// the query parameter should be constructed in the calling function already have all necessary filters applied : username, location, minRepos
export default async function fetchUserData(query) {
    const response = await axios.get(`https://api.github.com/search/users?q=${query} `, {
    });
    return response.data;
}