import React, { useEffect, useMemo, useState } from 'react';
import { Show } from '../../types/Show';
import axios from 'axios';
import { debounce } from '../../utils/helpers';
import { apiKey, apiUrl } from '../../appConfig';
import Spinner from '../Spinner/Spinner';

interface ShowListProps {
  searchQuery: string;

  handleClick: (id: number) => void;
}

const ShowList: React.FC<ShowListProps> = ({ searchQuery, handleClick }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchUrl = `${apiUrl}search/tv?api_key=${apiKey}`;

  const fetchTopRatedShows = () => {
    setIsLoading(true);
    const topRatedUrl = `${apiUrl}tv/top_rated?api_key=${apiKey}&include_adult=false`;
    axios.get(topRatedUrl)
      .then(res => {
        setShows(res.data.results.slice(0, 10));
      })
      .catch(error => {
        console.error('Error fetching top-rated shows:', error);
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
            setShows(res.data.results);
          })
          .catch(error => {
            console.error('Error searching shows:', error);
          }).finally(() => {
            setIsLoading(false);
          });
      }
    }, 1000);
  }, [searchQuery, searchUrl]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchTopRatedShows();
    } else {
      searchMedia();
    }
  }, [searchQuery, searchMedia]);

  return (<div>
    {isLoading ? (
      <Spinner />
    ) : (
      <div className="media-container">
        {shows.map(show => (
          <div key={show.id} onClick={() => handleClick(show.id)} className="media-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="media-image"
            />
            <h3 className="media-title">{show.name}</h3>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}

export default ShowList;
