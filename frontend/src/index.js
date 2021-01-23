import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import dotenv from 'dotenv'
import ContentProvider from './components/ContentProvider';
dotenv.config()
console.log(process.env)
ReactDOM.render(
  <Provider store={store}>
    <ContentProvider>
      <App />
    </ContentProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister()

