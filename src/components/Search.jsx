import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ setSearchQuery }) => {
  return (
    <div className="mx-3 d-flex align-items-center search-container">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search for title"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon" />
            </div>
  );
};

export default Search;
