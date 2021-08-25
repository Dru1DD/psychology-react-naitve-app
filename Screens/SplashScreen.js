import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme()

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
            }]}>
                Stay connected with everyone!
            </Text>
            <Text style={styles.text}>Войдите в свой аккаунт</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.testSign}>Начинаем</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        color: '#06375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default SplashScreen