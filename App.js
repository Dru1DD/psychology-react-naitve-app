import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import RootStackScreen from './Screens/stack/RootStackScreen';

//Redux
import { Provider } from 'react-redux';
import { store } from './components/redux/store'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar  />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});