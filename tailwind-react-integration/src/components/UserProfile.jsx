import React from 'react';


function UserProfile() {
  return (
    <div className="bg-gray-100 md:max-w-sm sm:max-w-xs mx-auto my-20 rounded-lg shadow-lg sm:p-4 md:p-8">
      <img className='rounded-full md:w-36 md:h-36 mx-auto sm:w-24 sm:h-24' src="https://via.placeholder.com/150" alt="User" />
      <h1 className='sm:text-lg md:text-xl text-blue-800 my-4'>John Doe</h1>
      <p className='sm:text-sm md:text-base text-gray-600'>Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;