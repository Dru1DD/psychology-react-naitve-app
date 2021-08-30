import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import RNRestart from 'react-native-restart'
import { useSelector } from 'react-redux'

const Profile = ({ navigation }) => {
    const { colors } = useTheme()

    //Get data  from store
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)
    const listOfDiagrams = useSelector(state => state.listOfDiagrams)

    async function exitHandler () {
        try {
            // await AsyncStorage.removeItem('USER_INFO')
            Alert.alert(
                "Выход",
                "Вы точно хотите выйти из приложения",
                [
                    {
                        text: "Да",
                        onPress: async () => {
                            await AsyncStorage.removeItem('USER_INFO')
                            DevSettings.reload()
                        }
                    },
                    {
                        text: "Нет",
                        onPress: () => RNRestart.Restart()
                    }
                ]
            )
        } catch (e) {
            console.log(e)
        }
    }
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
                <Text style={styles.text}>Количество сделанных цветограмм: {listOfDiagrams ? listOfDiagrams.length : 0}</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={exitHandler}
                        style={[styles.exit, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.exitText, {
                            color: "#009387"
                        }]}>Выход</Text>
                    </TouchableOpacity>
                </View>
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
    }, 
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    exit: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    exitText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
export default Profile