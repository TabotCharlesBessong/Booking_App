import React, { useState } from 'react';

const ProfilePage: React.FC<{ user?: any }> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    if (user) {
      setEditMode(!editMode);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      {user ? (
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-sky-100 dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-sky-500 dark:text-white">My Profile</h2>

          {/* Profile picture */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={user.picture}
              alt={user.name}
              className="object-cover w-32 h-32 border-2 rounded-full border-sky-500 dark:border-gray-400"
            />
            {editMode && (
              <label className="ml-4">
                <input type="file" hidden />
                <button className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                  Change Picture
                </button>
              </label>
            )}
          </div>

          {/* User information */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Name:</label>
            <span className="text-gray-700">
              {editMode ? (
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              ) : (
                user.name
              )}
            </span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Email:</label>
            <span className="text-gray-700">{user.email}</span>
          </div>

          {/* Edit button */}
          {!editMode && (
            <button
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              onClick={toggleEditMode}
            >
              Edit Profile
            </button>
          )}

          {/* Save button (when in edit mode) */}
          {editMode && (
            <button
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              onClick={toggleEditMode}
            >
              Save Changes
            </button>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-700">
          {/* Display a message or loader while user data is loading or unavailable */}
          {user === undefined ? 'Loading profile...' : 'Please provide user data!'}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

