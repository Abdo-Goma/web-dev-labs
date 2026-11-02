function MovieApp() {
    const [movies, setMovies] = React.useState([]);

    const [title, setTitle] = React.useState('');
    const [rating, setRating] = React.useState('1');
    const [review, setReview] = React.useState('');
    const renderStars = (num) => {
        return '⭐'.repeat(Number(num));
    };

    const handleAddMovie = (e) => {
        e.preventDefault(); 

        if (!title.trim()) return;

        const newMovie = {
            id: Date.now(),
            title: title,
            rating: rating,
            review: review
        };

    setMovies([...movies, newMovie]);

    setTitle('');
    setRating('1');
    setReview('');
    };

    const handleDeleteMovie = (idToDelete) => {
    const updatedMovies = movies.filter(movie => movie.id !== idToDelete);
    setMovies(updatedMovies);
    };

    return (
    <div>
    <h1>Movie Watchlist</h1>

    {}
    <form onSubmit={handleAddMovie} className="card">
        <h2>Add a Movie</h2>
        
        <div className="form-group">
        <label>Movie Title:</label>
        <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
        />
        </div>

        <div className="form-group">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
        </select>
        </div>

        <div className="form-group">
        <label>Comment / Review:</label>
        <textarea 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
        />
        </div>

        <button type="submit">Add Movie</button>
    </form>

      {/* Movie List Display */}
    <h2>My Saved Movies</h2>
    {movies.length === 0 ? (
        <p>No movies added yet!</p>
    ) : (
        movies.map((movie) => (
        <div key={movie.id} className="card">
            <h3>{movie.title}</h3>
            <p><strong>Rating:</strong> {renderStars(movie.rating)} ({movie.rating}/5)</p>
            <p><strong>Review:</strong> {movie.review || 'No review added.'}</p>
            <button 
            className="delete-btn" 
            onClick={() => handleDeleteMovie(movie.id)}
            >
            Remove
            </button>
        </div>
        ))
    )}
    </div>
    );
}

// Render the MovieApp component into the HTML root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MovieApp />);