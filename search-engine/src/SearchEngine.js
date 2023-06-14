import React, { useState, useEffect } from 'react';
import { Search, Clear, Keyboard, Mic } from '@material-ui/icons';


const database = [
  {
    id: 1,
    title: 'React Hooks Tutorial',
    url: 'https://example.com/react-hooks-tutorial',
    description: 'Learn how to use React Hooks to manage state and side effects in your components.',
    isHistory: true,
  },
  {
    id: 2,
    title: 'JavaScript ES6 Features',
    url: 'https://example.com/javascript-es6-features',
    description: 'Discover the new features introduced in ECMAScript 6 (ES6) for writing modern JavaScript code.',
    isHistory: false,
  },
  {
    id: 3,
    title: 'CSS Grid Layout Guide',
    url: 'https://example.com/css-grid-layout-guide',
    description: 'A comprehensive guide to understanding and using CSS Grid Layout for advanced page layouts.',
    isHistory: true,
  },
  {
    id: 4,
    title: 'Node.js Express Crash Course',
    url: 'https://example.com/nodejs-express-crash-course',
    description: 'Get up to speed with building web applications using Node.js and Express framework.',
    isHistory: false,
  },
  {
    id: 5,
    title: 'Python Machine Learning Libraries',
    url: 'https://example.com/python-machine-learning-libraries',
    description: 'Explore the most popular Python libraries for machine learning and artificial intelligence.',
    isHistory: false,
  },
];

const SearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    if (searchTerm.length !== 0) {
      const filteredData = database.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAutocompleteData(filteredData);
    } else {
      setAutocompleteData([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleAutocompleteSelection = (selectedItem) => {
    setSearchTerm(selectedItem.title);
    setAutocompleteData([]);
    performSearch(selectedItem.title);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    performSearch(searchTerm);
  };

  const performSearch = (query) => {
    const results = database.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClear = () => {
    setSearchTerm('');
    setAutocompleteData([]);
    setSearchResults([]);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <div className="search-input">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search"
              autoFocus
            />
            {searchTerm && (
              <button type="button" className="clear-button" onClick={handleClear}>
                <Clear className="clear-icon" />
              </button>
            )}
          </div>
          <div className="icons-container">
            <Keyboard className="keyboard-icon" />
            <Mic className="microphone-icon" />
          </div>
        </div>
      </form>

      {autocompleteData.length > 0 && (
        <div className="autocomplete">
          {autocompleteData.map((item) => (
            <div
              key={item.id}
              className={`autocomplete-item ${item.isHistory ? 'history-item' : ''}`}
              onClick={() => handleAutocompleteSelection(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
