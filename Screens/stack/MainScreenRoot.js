import React from 'react'
import { StatusBar } from 'expo-status-bar'

import MainScreen from '../MainScreen'
import FilePdfReader from '../pdf/FilePdfReader'

import { createStackNavigator } from '@react-navigation/stack'

const ScreenStack = createStackNavigator() 

//  Навигация главной странички, для открытия PDF файлов
const MainScreenStack = ({ navigation }) => {
    return (
        <>
            <StatusBar />
            <ScreenStack.Navigator screenOptions={{headerMode: false}}>
                <ScreenStack.Screen name="MainScreen" component={MainScreen} />
                <ScreenStack.Screen name="FilePdfReader" component={FilePdfReader} />
            </ScreenStack.Navigator>
        </>
    )
}

export default MainScreenStack