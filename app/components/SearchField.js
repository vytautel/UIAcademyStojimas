import React, { useState, useEffect } from 'react';
import 'components/styles/SearchField.css';
import DropElement from 'components/DropElement';
import searchIcon from '../../images/search.png';

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export default function SearchField() {
  const [searchResult, setSearchResult] = useState([]);
  const [pressedMovie, setPressedMovie] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [inputIsEmpty, setInputIsEmpty] = useState(true);

  const elementsFound = val => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=36155099ee0dfee4c1e0d95e58f2e8a5&language=en-US&query=${val}`;

    fetch(url)
      .then(res => res.json())
      .then(post => setSearchResult(post.results.slice(0, 8)))
      .catch(error => {
        console.log('Duomenys negauti: ', error);
      });
  };

  const handleSearch = e => {
    const inputVal = e.target.value;
    if (inputVal.length >= 3) elementsFound(inputVal);
    else {
      setSearchResult([]);
    }
  };

  const handleInput = e => {
    if (e.target.value.length > 0) {
      setInputIsEmpty(false);
    } else {
      setInputIsEmpty(true);
    }

    if (pressedMovie.title === undefined || pressedMovie.title === inputValue) {
      setInputValue(e.target.value);
      setPressedMovie({});
    }
    debounce(handleSearch(e), 250);
  };

  const renderInput = () => (
    <div>
      <input
        className="searchInput"
        placeholder="Enter movie name"
        onChange={handleInput}
        value={inputValue}
      />
      <span className="moviePlaceholder">Enter a movie name</span>
    </div>
  );

  useEffect(() => {
    if (pressedMovie.title !== undefined && pressedMovie.title !== inputValue) {
      setInputValue(pressedMovie.title);
      setInputIsEmpty(true);
      setSearchResult([]);
    }
  }, [pressedMovie]);

  return (
    <div>
      <div className="center">
        <div className="searchTop">
          <div
            className={`inputBack ${
              inputIsEmpty === true ? 'empty' : 'filled'
            }`}
          >
            {renderInput()}
          </div>
          <button className="searchBtn" type="button">
            <img alt="search" height="40" width="39" src={searchIcon} />
          </button>
        </div>

        <div
          className={`results ${inputIsEmpty === true ? 'empty' : 'filled'}`}
        >
          <DropElement data={searchResult} setPressedMovie={setPressedMovie} />
        </div>
        <div className="whiteBlank" />
      </div>
    </div>
  );
}
