import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { style } from './style/global';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const { GlobalStyle } = style();
root.render(
  <>
    <Provider store={store}>
      <App />
      <GlobalStyle />
    </Provider>
  </>
);
