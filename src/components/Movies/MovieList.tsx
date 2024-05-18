import { useEffect, useMemo, useState } from 'react';
import { Movie } from '../../types/Movie';
import axios from 'axios';
import { debounce } from '../../utils/helpers';
import { apiKey, apiUrl } from '../../appConfig';
import Spinner from '../Spinner/Spinner';

interface MovieListProps {
    searchQuery: string;
    handleClick: (id: number) => void;
}

const MovieList = ({ searchQuery, handleClick, }: MovieListProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchUrl = `${apiUrl}search/movie?api_key=${apiKey}`;

    const fetchTopRatedMovies = () => {
        setIsLoading(true);
        const topRatedUrl = `${apiUrl}movie/top_rated?api_key=${apiKey}&include_adult=false`;
        axios.get(topRatedUrl)
            .then(res => {
                setMovies(res.data.results.slice(0, 10));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const searchMedia = useMemo(() => {
        return debounce(() => {
            if (searchQuery.length >= 3) {
                setIsLoading(true);
                axios.get(`${searchUrl}&query=${encodeURIComponent(searchQuery)}&include_adult=false`)
                    .then(res => {
                        setMovies(res.data.results);
                    })
                    .catch(error => {
                        console.error('Error searching movies:', error);
                    }).finally(() => {
                        setIsLoading(false);
                    });
            }
        }, 1000);
    }, [searchQuery, searchUrl]);

    useEffect(() => {
        if (searchQuery === "") {
            fetchTopRatedMovies();
        } else {
            searchMedia();

        }
    }, [searchQuery, searchMedia]);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="media-container">
                    {movies.map(movie => (
                        <div key={movie.id} onClick={() => handleClick(movie.id)} className="media-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="media-image"
                            />
                            <h3 className="media-title">{movie.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default MovieList;
