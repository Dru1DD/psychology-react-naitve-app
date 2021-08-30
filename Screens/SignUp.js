import React, { useState } from 'react'
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
    ScrollView,
    StatusBar
} from 'react-native'
import * as Animatable from 'react-native-animatable'

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

    const dispatch = useDispatch()

    //Change Local State
    const textInputChangeUsername = (val) => {
            if(val.trim().length < 3) {
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

    const register = ( email, username, password ) => {
           const result = axios.post('https://agile-thicket-06723.herokuapp.com/registration', {
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
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Регистрация</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>ФИО</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="ФИО"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeUsername(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            {
                data.isValidUsername ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Имя должно быть длинее 3 символов
                        </Text>
                    </Animatable.View>
                )
            }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={val => textInputChangeEmail(val)}
                    />
                    {data.check_textInputChangeEmail ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
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
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Пароль</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Ваш пароль"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
                
            </View>
                {data.isValidPassword ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Пароль должен быть больше 8 символов
                        </Text>
                    </Animatable.View>
                )}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Подтвердите пароль</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Подтвердите пароль"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {
                data.isValidConfirm ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Пароли не совпадают
                        </Text>
                    </Animatable.View>
                )
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                   onPress={() => register(data.email, data.username, data.password)}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUp

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    }
  });
