import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

//Style
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from "react-native-paper";
import * as Fonts from 'expo-font'


//icons
import { FontAwesome, Feather } from 'react-native-vector-icons'

//Axios
import axios from 'axios'

//Redux action types
import { REGISTER_USER } from '../components/redux/action/types'

function SignUp({ navigation }) {

    //Local State
    const [data, setData] = useState({
        username: '',
        isValidUsername: true,
        email: '',
        isValidEmail: true,
        password: '',
        confirm_password: '',
        isValidPassword: true,
        isValidConfirm: true,
        check_textInputChange: false,
        check_textInputChangeEmail: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });


    const { colors } = useTheme();
    const dispatch = useDispatch()
    const loadFontsAsync = async () => {
        await Fonts.loadAsync({
            "Gordita-Regular": require("../assets/fonts/Gordita-Regular.ttf")
        })
    }

    // Проблема со шрифтами
    useEffect(() => {
        loadFontsAsync()
    }, [])


    //Стандартные функции для проверки инпутов
    const textInputChangeUsername = (val) => {
            if(val.trim().length < 2) {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: true,
                    isValidUsername: false
                })
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUsername: true
            });
        }
    }

    const textInputChangeEmail = (val) => {
        const re = /\S+@\S+\.\S+/
        if (re.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChangeEmail: true,
                isValidEmail: true
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChangeEmail: false,
                isValidEmail: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        if(val.trim().length < 8) {
           setData({
                ...data,
                password: val,
                isValidPassword: false
            }); 
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword:  true
            })
        }
        
    }

    const handleConfirmPasswordChange = (val) => {
      if (val.trim() !== data.password) {
        setData({
          ...data,
          confirm_password: val,
          isValidConfirm: false,
        });
      } else {
          setData({
              ...data,
              confirm_password: val,
              isValidConfirm: true
          })
      }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    // Регистрация, получение данных от сервера и диспатчи в локальный редакс-стейт
    const register = async ( email, username, password ) => {
        const result = await axios.post('https://agile-thicket-06723.herokuapp.com/registration', {
        email,
        username,
        password
        })
        .catch(e => {
            Alert.alert(
                "Ошибка",
                "Проверьте правильность введёных данных",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("RootTabScreen")
                    }
                ]
            )
        })
        dispatch(
            {
                type: REGISTER_USER,
                payload: {
                    username: username,
                    email: email
                }
            }
        )
        Alert.alert(
            "Регистрация",
            "Пользователь успешно создан",
            [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("RootTabScreen"),
                  style: "cancel",
                },
              ],
        )
 }


    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={[
            styles.header,
            {
              flexDirection: "row",
              top: 40,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Image source={require("../assets/favicon_1.png")} />
          <Text style={[styles.headerTitle]}>Фёдор Милых</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              { fontFamily: "Gordita-Regular", alignSelf: "center" },
            ]}
          >
            Добро пожаловать!!!
          </Text>
          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Имя пользователя
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Имя пользователя"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChangeUsername(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUsername ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Имя должно быть длинее 2 символов
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChangeEmail(val)}
            />
            {data.check_textInputChangeEmail ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Введите email верного формата</Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Пароль
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Ваш пароль"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Пароль должен быть больше 8 символов
              </Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Подтвердите пароль
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Подтвердите пароль"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidConfirm ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Пароли не совпадают</Text>
            </Animatable.View>
          )}

          <View style={styles.styledButton}>
            <TouchableOpacity
              onPress={() => register(data.email, data.username, data.password)}
            >
              <Text style={styles.buttonText}>Регистрация</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.logoText,
              {
                flexDirection: "column",
                justifyContent: "flex-end",
                marginTop: "auto",
              },
            ]}
          >
            <Text
              style={[
                styles.logoSubtitle,
                {
                  fontFamily: "Gordita-Regular",
                  flexDirection: "row",
                  alignSelf: "center",
                },
              ]}
            >
              Уже есть аккаунт?{" "}
              <Text
                onPress={() => navigation.navigate("SignIn")}
                style={{ fontWeight: "bold" }}
              >
                Авторизоваться
              </Text>
            </Text>
          </View>
        </Animatable.View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 50,
      },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14
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
        borderBottomRightRadius: 20,
        alignSelf: "center"
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
      logoText: {
        height: 30,
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: 15,
        lineHeight: 15,
        color: "#000000",
      },
      logoSubtitle: {
        fontWeight: "normal",
        fontSize: 16,
        lineHeight: 17
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
      },
      modalView: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        width: '100%',
        fontSize: 16,
        textAlign: 'center'
      }
  });

export default SignUp