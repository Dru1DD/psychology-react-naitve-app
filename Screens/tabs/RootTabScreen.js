import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MainScreenStack from '../stack/MainScreenRoot'
import Colorgram from '../Colorgram'
import Profile from '../Profile'
import AnalizeCologramsStack from '../stack/AnalizeCologramsStack'

import { Ionicons } from '@expo/vector-icons'
import MainScreen from '../MainScreen'
// Обычный таб навигатор 

const Tab = createBottomTabNavigator()

function RootTabScreen () {
    return (
        <>
             <StatusBar style="auto" />
             <Tab.Navigator 
                 screenOptions={({ route }) => ({
                     headerShown: false,
                     tabBarActiveTintColor: "red",
                     tabBarIcon: ({ focused, size }) => {
                         let iconName
                         if (route.name === "Главная") {
                             iconName = focused 
                                         ? 'home'
                                         : 'home-outline'
                         } else if ( route.name === "Цветограм") {
                             iconName = focused 
                                         ? 'apps'
                                         : 'apps-outline'
                         } else if ( route.name === "Коррекция") {
                             iconName = focused 
                                         ? 'analytics'
                                         : 'analytics-outline'
                         } else if ( route.name === "Профиль") {
                             iconName  = focused 
                                         ? 'person'
                                         : 'person-outline'
                         }
                         return <Ionicons name={iconName} size={size} color={"red"} />
                     }
                 })} 
                 >
                     <Tab.Screen name="Главная"  component={MainScreenStack} />
                     <Tab.Screen name="Цветограм" component={Colorgram} />
                     <Tab.Screen name="Коррекция" component={AnalizeCologramsStack} />
                     <Tab.Screen name="Профиль" component={Profile} />
                 </Tab.Navigator>
        </>
     )
}

export default RootTabScreen