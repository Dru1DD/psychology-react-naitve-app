import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

//navigations
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import MainScreen from './Screens/MainScreen'
import Colorgram from './Screens/Colorgram'
import AnalizeColorgram from './Screens/AnalizeCologram';
import Profile from './Screens/Profile'

//icons
import { Ionicons } from '@expo/vector-icons'; 

//Redux
import { Provider } from 'react-redux';
import { store } from './components/redux/store'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <StatusBar style="auto"/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName ;
            if(route.name === "Главная") {
              iconName = focused
                        ? 'home'
                        : 'home-outline'
            } else if ( route.name === "Цветограмм") {
              iconName = focused 
                        ? 'apps'
                        : 'apps-outline'
            }  else if (route.name === "Аналитика") {
              iconName = focused
                        ? 'analytics'
                        : 'analytics-outline'
            } else if ( route.name === "Профиль") {
              iconName = focused 
                        ? 'person'
                        : 'person-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          }
        })}
      >
        <Tab.Screen name="Главная" component={MainScreen} />
        <Tab.Screen name="Цветограмм" component={Colorgram} />
        <Tab.Screen name="Аналитика" component={AnalizeColorgram} />
        <Tab.Screen name="Профиль" component={Profile} />
      </Tab.Navigator>
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
// <Ionicons name="person" size={24} color="black" />