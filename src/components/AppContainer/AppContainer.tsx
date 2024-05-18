import React, { } from 'react';
import './AppContainer.css';
import { useNavigate } from 'react-router-dom';
import ShowList from '../Shows/ShowList';
import MovieList from '../Movies/MovieList';
import { useSearchContext } from '../../context/SearchContext';
import Tabs from '../Tabs/Tabs';
import SearchBar from '../SearchBar/SearchBar';

const AppContainer = () => {
  const navigate = useNavigate();
  const { searchQuery, activeTab, setSearchQuery } = useSearchContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleClick = (id: number) => {
    navigate(`/${activeTab}/${id}`);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="toolbar">
          <Tabs />
          <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        </div>
        {activeTab === 'movie' ? (
          <MovieList handleClick={handleClick} searchQuery={searchQuery} />
        ) : (
          <ShowList searchQuery={searchQuery} handleClick={handleClick} />
        )}
      </div>
    </div>
  );
}

export default AppContainer;
