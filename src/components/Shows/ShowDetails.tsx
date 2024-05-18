import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Show } from '../../types/Show';
import { apiKey, apiUrl } from '../../appConfig';
import Spinner from '../Spinner/Spinner';



const ShowDetails = () => {
    const [show, setShow] = useState<Show>();
    const [trailerKey, setTrailerKey] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}tv/${id}?api_key=${apiKey}`);
                setShow(response.data);
                fetchTrailer(response.data.id);
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        fetchShowDetails();
    }, [id]);

    const fetchTrailer = async (showId: number) => {
        try {
            const response = await axios.get(`${apiUrl}tv/${showId}/videos?api_key=${apiKey}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const trailer = response.data.results.find((video: any) => video.type === 'Trailer');
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    if (!show) return <div><Spinner /></div>;

    return (
        <div className='wrapper'>
            <div className='container'>
                <div className="back-button">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/">BACK</Link>
                </div>
                <div className="show-details-content">
                    <h1 className="media-details-title">{show.name}</h1>

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
                            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }} /></div>
                    )}
                    <div className="details">
                        <h4>Show Overview</h4>
                        <p>{show.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
