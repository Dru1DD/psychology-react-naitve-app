import React, { useEffect} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Fonts from 'expo-font'
import { Asset } from 'expo-asset'

const SplashScreen = ({ navigation }) => {

    const loadFontsAsync = async () => {
        await Fonts.loadAsync({
            "Gordita-Regular": Asset.fromModule(require('../assets/fonts/Gordita-Regular.ttf')).uri
        })
    }

    // Проблема со шрифтами
    useEffect(() => {
        
        loadFontsAsync()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={[styles.header, {
                flexDirection: "row"
            }]}>
                <Image 
                    source={require("../assets/favicon_1.png")}
                />
                <Text style={styles.headerTitle}>Фёдор Милых</Text>
            </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={[ styles.title, {
                fontFamily: 'Gordita-Regular'}]}>
                Экспресс-тест 
                "Краски вашей жизни!"
            </Text>
            <Text style={[styles.subtitle, {
                fontFamily: 'Gordita-Regular',
                marginTop: 20
                }]}>Войдите в свой аккаунт</Text>
            <View style={styles.styledButton}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={[styles.buttonText, {fontFamily: 'Gordita-Regular'}]}>Начинаем</Text>
                </TouchableOpacity>
            </View> 
            <View
                style={{
                    flexDirection: "column",
                    marginTop: "auto",
                    justifyContent: "flex-end"
                }}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-end"
                }}>
                  <Image
                    source={require("../assets/favicon_1_mini.png")}
                    /> 
                    <Text style={[styles.logoText, {fontFamily: "Gordita-Regular", marginBottom: 1}]}>vipdoctor.life</Text>
                </View>
                 <View style={styles.line} />
            </View>       
        </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 30,
        alignItems: "center",
        padding: 20
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
    }, 
    subtitle: {
        width: 231,
        height: 23,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "center"
    },
    title: {
        width: 275,
        height: 66,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
        textAlign: "center",
        color: "#000000"
    },
    headerTitle: {
        width: 150,
        height: 75,
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 40,
        lineHeight: 38,
        textAlign: "center",
        color: "#000000"
    }, 
    styledButton: {
        width: 220,
        height: 59,
        marginTop: 20,
        backgroundColor: "red",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    buttonText: {
        width: 99,
        height: 23,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "center",
        color: "#ffffff"
    },
    logoText: {
        width: 100,
        height: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: 15,
        lineHeight: 15,
        color: "#000000"
    },
    line: {
        width: 105,
        borderWidth: 0.25,
        borderColor: "#000000"
    }
})

export default SplashScreen