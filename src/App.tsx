import React, { useState } from 'react';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import cn from 'classnames';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { AddBookForm } from './Components/AddBookForm/AddBookForm';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="app">
      <div className="tabs">
        <ul>
          <li className={cn({ 'is-active': activeTab === 'Dashboard' })}>
            <Link
              to="/"
              onClick={() => setActiveTab('Dashboard')}
            >
              Dashboard
            </Link>
          </li>
          <li className={cn({ 'is-active': activeTab === 'AddBook' })}>
            <Link
              to="add"
              onClick={() => setActiveTab('AddBook')}
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
