import React from 'react';
import fetchUserData from '../services/githubService';

export default function Search() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [userData, setUserData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (searchTerm.trim() === '') return;

        try {
            setIsLoading(true);
            const userData = await fetchUserData(searchTerm);
            setIsLoading(false);
            setError(false);
            setUserData(userData);
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
            setError(true);
            setUserData(null);
        }
    };
    return <div>
        <form action="" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Search GitHub users..." value={searchTerm} onChange={handleInputChange} />
            <button type="submit">Search</button>
            {userData && (
                <div>
                    <h2>{userData.login}</h2>
                    <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} width="100" />
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                    <p>profile <a href={userData.html_url} target="_blank" rel="noopener noreferrer">link</a></p>
                </div>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>Looks like we cant find the user</p>}
        </form>
        </div>
}