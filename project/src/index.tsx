import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Setting = {
  filmCardTitle: 'The Grand Budapest Hotel',
  filmCardGenre: 'Drama',
  filmCardYear: 2014,
} as const;

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App
        filmCardTitle={Setting.filmCardTitle}
        filmCardGenre={Setting.filmCardGenre}
        filmCardYear={Setting.filmCardYear}
      />
    </Provider>
  </React.StrictMode>,
);
