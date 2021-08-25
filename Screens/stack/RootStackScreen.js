import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../SignIn'
import SignUp from '../SignUp'
import SplashScreen from '../SplashScreen'
import Profile from '../Profile'

const RootStack = createStackNavigator()

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator screenOptions={{headerMode: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="Profile" component={Profile} />
    </RootStack.Navigator>
)

export default RootStackScreen