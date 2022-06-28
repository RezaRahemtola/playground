import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/client/react';

import './index.css';
import App from './app/App';

import apolloClient from './api/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
