import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Movie } from '../../types/Movie';
import { apiKey, apiUrl } from '../../appConfig';
import Spinner from '../Spinner/Spinner';

const MovieDetails = () => {
    const [movie, setMovie] = useState<Movie>();
    const [trailerKey, setTrailerKey] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}movie/${id}?api_key=${apiKey}`);
                setMovie(response.data);
                fetchTrailer(response.data.id);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const fetchTrailer = async (movieId: number) => {
        try {
            const response = await axios.get(`${apiUrl}movie/${movieId}/videos?api_key=${apiKey}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const trailer = response.data.results.find((video: any) => video.type === 'Trailer');
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    if (!movie) return <div><Spinner /></div>;

    return (
        <div className='wrapper'>
            <div className='container'>
                <div className="back-button">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/">BACK</Link>
                </div>
                <div className="show-details-content">
                    <h1>{movie.title}</h1>

                    {trailerKey ? (
                        <div className="trailer-container">
                            <iframe
                                title="trailer"
                                width="800"
                                height="450"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ marginBottom: '10px' }}
                            />
                        </div>
                    ) : (
                        <div className="image-container">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }} /></div>
                    )}
                    <div className="details">
                        <h4>Movie Overview</h4>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
