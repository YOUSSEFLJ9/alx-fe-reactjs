import { useParams, Link, useNavigate } from 'react-router-dom';
import { moviesAnimeData } from '../data/mockData';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = moviesAnimeData.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Movie/Anime Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline text-lg">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-200 flex items-center gap-2 mb-4 text-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm uppercase font-semibold">
                  {movie.type}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">⭐</span>
                  <span className="text-2xl font-bold text-gray-800">{movie.rating}</span>
                  <span className="text-gray-600">/ 10</span>
                </div>
                <div className="text-xl text-gray-600">{movie.year}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{movie.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
