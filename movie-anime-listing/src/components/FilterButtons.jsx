const FilterButtons = ({ selectedFilter, onFilterChange }) => {
  const filters = ['all', 'movie', 'anime'];

  return (
    <div className="mb-8 flex gap-4 justify-center flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
            selectedFilter === filter
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1) + 's'}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
