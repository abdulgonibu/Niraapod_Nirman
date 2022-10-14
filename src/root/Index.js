import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Routes from '../routes/Index';



export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
  }



  render() {

    const { store, persistor } = this.props;

    return (
      <Provider store={store}>

        <PersistGate
          persistor={persistor}
        >
          {Routes}
        </PersistGate>
      </Provider>

    );
  }
}