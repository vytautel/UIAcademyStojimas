/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import SearchField from 'components/SearchField';

export default function HomePage() {
  return (
    <div>
      <SearchField />
    </div>
  );
}
