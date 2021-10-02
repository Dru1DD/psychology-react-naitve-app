import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, AsyncStorage, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from 'react-native-paper'
import { FontAwesome, Feather } from '@expo/vector-icons'
import * as Fonts from 'expo-font'

import axios from 'axios'

const PasswordChanger = ({ navigation }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        second_password: "",
        isValidEmail: true,
        isValidPassword: true,
        isValidSecondPassword: true,
        check_textInputChange: false,
        secureTextEntry: true,
        secureTextEntryPasswordHandler: true
    })

    const { colors } = useTheme()
    const loadFontsAsync = async () => {
        await Fonts.loadAsync({
            "Gordita-Regular": require("../assets/fonts/Gordita-Regular.ttf")
        })
    }

    // Проблема со шрифтами
    useEffect(() => {
        loadFontsAsync()
    }, [])

// Стандартные функции для проверки инпутов
    const textInputChange = (e) => { 
        const re = /\S+@\S+\.\S+/
        if (re.test(e)) {
            setData({
                ...data,
                email: e,
                check_textInputChange: true,
                isValidEmail: true
            })
        } else {
            setData({
                ...data,
                email: e,
                check_textInputChange: false,
                isValidEmail: false
            })
        }
    }

    const handleValidUser = (e) => {
        if(e.trim().length >= 4) setData({ ...data, isValidEmail: true})
        else setData({ ...data, isValidEmail: false})
    }

    const handlePasswordChange = (e) => {
        if (e.trim().length < 8 ) setData({ ...data, password: e, isValidPassword: false})
        else setData({ ...data, password: e, isValidPassword: true})
    }
    const handleCheckPasswordChange = (e) => {
        if(e.trim() !== data.password) setData({...data, second_password: e, isValidSecondPassword: false})
        else setData({ ...data, second_password: e, isValidSecondPassword: true})
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data, secureTextEntry: !data.secureTextEntry
        })
    }
    const updateSecureTextEntrySecond = () => {
        setData({
            ...data, secureTextEntryPasswordHandler: !data.secureTextEntryPasswordHandler
        })
    }

    // Уже идёт запрос на сервер
    const passwordRecovery = async () => {
        try {
            const passStatus = await axios.post("https://agile-thicket-06723.herokuapp.com/password", {
                email: data.email,
                password: data.password
            })
            await AsyncStorage.setItem("USER_INFO",
                JSON.stringify({
                    email:  data.email,
                    password: data.password
                })
            )
            navigation.navigate("SplashScreen")
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={[styles.header, {
                flexDirection: "row",
                backgroundColor: colors.background
            }]}>
                  <Image 
                    source={require("../assets/favicon_1.png")}
                />
                <Text style={styles.headerTitle}>Фёдор Милых</Text>  
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background
                    }
                ]}
            >
                <Text style={[
                    styles.title, {
                        fontFamily: "Gordita-Regular"
                    }]}
                >Восстановление пароля</Text>
                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 20,
                    fontFamily: 'Gordita-Regular'
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Ваш email"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text
                            }]
                        }
                        autoCapitalize="none"
                        onChangeText={val => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                        {
                            data.check_textInputChange ?
                            (
                                <Animatable.View animation="bounceIn">
                                    <Feather name="check-circle" color="green" size={20} />
                                </Animatable.View>
                            ) : null
                        }
                </View>
                {
                    data.isValidEmail ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Введите email верного формата
                            </Text>
                        </Animatable.View>
                    )
                }
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                            marginTop: 35,
                            fontFamily: 'Gordita-Regular'
                        }
                    ]}
                >
                    Введите новый пароль
                </Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Пароль"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text
                            }
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        { data.secureTextEntry ? 
                            (
                                <Feather name="eye-off" color="grey" size={20} />
                            )
                            :
                            (
                                <Feather name="eye" color="grey" size={20} />
                            )
                        }
                    </TouchableOpacity>
                </View>
                {
                    data.isValidPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Пароль должен иметь не менее 8 символов
                            </Text>
                        </Animatable.View>
                    )
                }
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                            marginTop: 35,
                            fontFamily: 'Gordita-Regular'
                        }
                    ]}
                >
                    Повторите новый пароль
                </Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Повторите пароль"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntryPasswordHandler ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text
                            }
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handleCheckPasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntrySecond}>
                        { data.secureTextEntryPasswordHandler ? 
                            (
                                <Feather name="eye-off" color="grey" size={20} />
                            )
                            :
                            (
                                <Feather name="eye" color="grey" size={20} />
                            )
                        }
                    </TouchableOpacity>
                </View>
                {
                    data.isValidSecondPassword ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                               Пароли не совпадают
                            </Text>
                        </Animatable.View>
                    )
                }
                <View style={[styles.styledButton, {alignSelf: "center"}]}>
                    <TouchableOpacity
                    onPress={() => passwordRecovery()}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Восстановить пароль
                    </Text>
                </TouchableOpacity>
                </View>
                
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom:  5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a"
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14
    },
    button: {
        alignItems: "center",
        marginTop: 50
    },
    rewritePas: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold"
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
        color: "#000000",
      },
    title: {
        width: "100%",
        height: 33,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
        color: "#000000",
        textAlign: "center"
      },
      styledButton: {
        width: "80%",
        height: 59,
        marginTop: 20,
        backgroundColor: "red",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      buttonText: {
        width: "100%",
        height: 23,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 23,
        textAlign: "center",
        color: "#ffffff",
      },
})

export default PasswordChanger