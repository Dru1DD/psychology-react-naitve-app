import React from 'react'
import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MainScreen from '../MainScreen'
import Colorgram from '../Colorgram'
import AnalizeColorgram from '../AnalizeCologram'
import Profile from '../Profile'

import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function RootTabScreen () {
    return (
        <>
             <StatusBar style="auto" />
             <Tab.Navigator 
                 screenOptions={({ route }) => ({
                     headerShown: false,
                     
                     tabBarIcon: ({ focused, color, size }) => {
                         let iconName
                         if (route.name === "Главная") {
                             iconName = focused 
                                         ? 'home'
                                         : 'home-outline'
                         } else if ( route.name === "Цветограм") {
                             iconName = focused 
                                         ? 'apps'
                                         : 'apps-outline'
                         } else if ( route.name === "Аналитика") {
                             iconName = focused 
                                         ? 'analytics'
                                         : 'analytics-outline'
                         } else if ( route.name === "Профиль") {
                             iconName  = focused 
                                         ? 'person'
                                         : 'person-outline'
                         }
                         return <Ionicons name={iconName} siez={size} color={color} />
                     }
                 })} 
                 >
                     <Tab.Screen name="Главная"  component={MainScreen} />
                     <Tab.Screen name="Цветограм" component={Colorgram} />
                     <Tab.Screen name="Аналитика" component={AnalizeColorgram} />
                     <Tab.Screen name="Профиль" component={Profile} />
                 </Tab.Navigator>
        </>
     )
}

export default RootTabScreen