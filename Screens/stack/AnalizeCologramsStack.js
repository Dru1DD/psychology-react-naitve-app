import React from 'react'
import { StatusBar } from 'expo-status-bar'

import AnalizeColorgram from '../AnalizeCologram'
import ColorGramInfo from '../ColorGramInfo'

import { createStackNavigator } from '@react-navigation/stack'

const CologramStack = createStackNavigator()
// Навигация для странички анализа
const AnalizeCologramsStack = ({ navigation }) => {
    return (
        <>
            <StatusBar />
            <CologramStack.Navigator screenOptions={{headerMode: false}}>
                <CologramStack.Screen name="AnalizeColorgram" component={AnalizeColorgram} />
                <CologramStack.Screen name="CologGramInfo" component={ColorGramInfo} />
            </CologramStack.Navigator>
        </>
    )
}

export default AnalizeCologramsStack