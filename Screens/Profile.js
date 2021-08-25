import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { colors } = useTheme()
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)
    const countOfDiagrams = useSelector(state => state.countOfDiagrams)
    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}></View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>Профиль</Text>
                <Text style={styles.text}>ФИО: {username}</Text>
                <Text style={styles.text}>Почта: {email}</Text>
                <Text style={styles.text}>Количество сделанных цветограмм: {countOfDiagrams}</Text>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387"
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        color: "#06375a",
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    }
})
export default Profile