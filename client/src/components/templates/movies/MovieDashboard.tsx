import React, { useState, useEffect } from 'react';

const MovieDashboard = () => {
  const [movies, setMovies] = useState([]); // State for movie data

  useEffect(() => {
    // Replace with your API call or data source
    const sampleMovies = [
      { title: 'Movie 1', poster: 'https://placeimg.com/300/200/movie' },
      { title: 'Movie 2', poster: 'https://placeimg.com/300/200/movie' },
      { title: 'Movie 3', poster: 'https://placeimg.com/300/200/movie' },
      { title: 'Movie 4', poster: 'https://placeimg.com/300/200/movie' },
      { title: 'Movie 5', poster: 'https://placeimg.com/300/200/movie' },
      { title: 'Movie 6', poster: 'https://placeimg.com/300/200/movie' },
    ];
    setMovies(sampleMovies);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container px-4 pt-16 mx-auto">
        {/* Dashboard header */}
        <h1 className="text-3xl font-bold text-sky-500 dark:text-white">Movie Dashboard</h1>

        {/* Grid layout for movie cards */}
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">
          {movies.map((movie) => (
            <div key={movie.title} className="bg-white rounded-lg shadow-md dark:bg-gray-800">
              <img
                src={movie.poster}
                alt={movie.title}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <div className="px-4 py-5">
                <h2 className="text-xl font-bold text-sky-500 dark:text-white">{movie.title}</h2>
                {/* Add star rating or other details here */}
              </div>
            </div>
          ))}
        </div>

        {/* Additional sections, content, or functionalities */}
      </div>
    </div>
  );
};

export default MovieDashboard;



