import React from 'react';
import 'components/styles/SearchField.css';
import PropTypes from 'prop-types';

export default function DropElement(props) {
  const { data, setPressedMovie } = props;

  function ListItems() {
    if (typeof data !== 'undefined')
      return data.map(item => (
        <div
          className="movieItem"
          key={item.id}
          role="button"
          onClick={() => setPressedMovie(item)}
          onKeyPress={() => setPressedMovie(item)}
          tabIndex="0"
        >
          <h5>{item.title}</h5>
          <p>
            {item.vote_average !== undefined ? item.vote_average : 0} Rating,{' '}
            {item.release_date !== undefined
              ? item.release_date.substr(0, 4)
              : ''}
          </p>
        </div>
      ));
  }

  return <div className="list">{ListItems()}</div>;
}

DropElement.propTypes = {
  data: PropTypes.array,
  setPressedMovie: PropTypes.func,
};
