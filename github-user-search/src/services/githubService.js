import axios from 'axios';


export default async function fetchUserData(username) {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
        // headers: {
        //     Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
        // }
    });
    return response.data;
}