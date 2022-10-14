import React from 'react';
import Root from './root/Index'
import configureStore from './store/Index';




const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
