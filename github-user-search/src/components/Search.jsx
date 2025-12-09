import React from 'react';
import fetchUserData from '../services/githubService';

export default function Search() {
    const [username, setUsername] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [minRepos, setMinRepos] = React.useState('');

    const [users, setUsers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!username && !location && !minRepos) return;
        try {
            setIsLoading(true);
            setUsers([]);
            let query = '';
            if (username) {
                query += `${username} `;
            }
            if (location) {
                query += ` location:${location}`;
            }
            if (minRepos) {
                query += ` repos:>=${minRepos}`;
            }
            const userData = await fetchUserData(query);
            setUsers(userData.items);
            setIsLoading(false);
            setError(false);
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            setUsers([]);
            setIsLoading(false);
            setError(true);
        }
    };
    return( <div className='flex flex-col items-center m-4'>
        <form onSubmit={handleFormSubmit} className='flex flex-col md:flex-row gap-4 bg-gray-100 p-6 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label className='text-sm font-semibold mb-1'>Username</label>
                <input className=' rounded-sm p-1 border border-gray-300' type="text" placeholder="GitHub Username" value={username} onChange={(e) => setUsername(e.target.value)} />

            </div>
                <div className='flex flex-col'>
                <label className='text-sm font-semibold mb-1'>Location</label>
                <input className=' rounded-sm p-1 border border-gray-300' type="text" placeholder="GitHub Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                
            </div>
                <div className='flex flex-col'>
                <label className='text-sm font-semibold mb-1'>Minimum Repositories</label>
                <input className=' rounded-sm p-1 border border-gray-300' type="text" placeholder="Minimum Repositories" value={minRepos} onChange={(e) => setMinRepos(e.target.value)} />
                
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors' type="submit">Search</button>
        </form>
                {isLoading && <p className='mt-4 text-blue-500'>Loading...</p>}
                {error && <p className='mt-4 text-red-600'>Looks like we cant find the user</p>}


            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl'>
            {users.map(userData => (
                <div key={userData.id} className=' bg-white p-4 rounded-xl shadow-lg flex flex-col items-center border border-gray-200'> 
                    <img className='w-24 h-24 rounded-full mb-4 border-2 border-green-500' src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
                    <h2 className='text-xl font-bold mb-2'>{userData.login}</h2>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline mb-2'>View Profile</a>
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                    <p>profile <a href={userData.html_url} target="_blank" rel="noopener noreferrer">link</a></p>
                    <p className='font-sans mt-4'>ID: {userData.id}</p>
                </div>
            )
            )}
            </div>
            {users.length === 0 && !isLoading && !error && <p className='mt-4 text-gray-600'>No users found. Try adjusting your search criteria.</p>}
        </div>
        )
}

