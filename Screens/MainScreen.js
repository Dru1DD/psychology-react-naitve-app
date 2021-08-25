import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {View, Text} from 'react-native'

import RootStackScreen from './stack/RootStackScreen'

function MainScreen () {
    return (
        <RootStackScreen />
    )
}

export default MainScreen