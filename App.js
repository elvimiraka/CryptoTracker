
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import TabNavigate from  './navigation/CryptoNavigation';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import cryptoReducer from './appLogic/reducers/cryptos';


const rootReducer = combineReducers({
  cryptos: cryptoReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <TabNavigate />
    </Provider>
  );
}

