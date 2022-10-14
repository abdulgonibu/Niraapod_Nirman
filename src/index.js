import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from './store/Index';
import * as serviceWorker from './serviceWorker';
import Routes from './routes/Index';
// import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-tabs/style/react-tabs.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './index.css';


const { persistor, store } = configureStore();


const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();