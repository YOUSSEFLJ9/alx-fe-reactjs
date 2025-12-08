import React from 'react';
import fetchUserData from '../services/githubService';

export default function Search() {
    return <div>
        <form action="">
            <input type="text" placeholder="Search GitHub users..." />
            <button type="submit">Search</button>
        </form>
        </div>
}