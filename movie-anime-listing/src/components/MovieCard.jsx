import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/details/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
        <div className="relative h-96">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm">
            ⭐ {movie.rating}
          </div>
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs uppercase font-semibold">
            {movie.type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{movie.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{movie.year}</p>
          <div className="flex flex-wrap gap-2">
            {movie.genre.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
