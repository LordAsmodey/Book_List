import React from 'react';
import './App.scss';
import {
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { AddBookForm } from './Components/AddBookForm/AddBookForm';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app">
      <div className="tabs">
        <ul>
          <li className={cn({ 'is-active': location.pathname === '/' })}>
            <Link
              to="/"
            >
              Dashboard
            </Link>
          </li>
          <li className={cn({ 'is-active': location.pathname === '/add' })}>
            <Link
              to="add"
            >
              Add new book
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="add" element={<AddBookForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
