import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films} from './mocks/films';
import { reviews } from './mocks/reviews';

const Setting = {
  filmCardTitle: 'The Grand Budapest Hotel',
  filmCardGenre: 'Drama',
  filmCardYear: 2014,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      filmCardTitle={Setting.filmCardTitle}
      filmCardGenre={Setting.filmCardGenre}
      filmCardYear={Setting.filmCardYear}
      films={films}
      reviews={reviews}
    />
  </React.StrictMode>,
);
