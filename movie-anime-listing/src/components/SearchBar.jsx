const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search movies or anime..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
};

export default SearchBar;
