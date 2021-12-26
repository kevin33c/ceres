import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import Game from './components/games/Game';
import GamesList from './components/games/GamesList';
import Page404 from './components/Page404';

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/game/:gameId' element={<Game />} />
        <Route path='/browse' element={<GamesList />} />
        <Route path='/notfound' element={<Page404 />} />
        {/*redicting to the main page, to be changed to a 404 page*/}
        <Route path="*" element={<Navigate replace to="/notfound" />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
