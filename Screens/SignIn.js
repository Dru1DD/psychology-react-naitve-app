import React, { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native'
import { useDispatch } from "react-redux";
import { LOGIN_USER } from '../components/redux/action/types'
//style
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  Modal
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";
import * as Fonts from 'expo-font'


//icons
import { FontAwesome, Feather } from "react-native-vector-icons";

//Axios
import axios from "axios";

// Redux 
import { ADD_COLORGRAM } from "../components/redux/action/types"

function SignIn({ navigation }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    userData: []
  });

  const { colors } = useTheme();
  const dispatch = useDispatch()

  let userData = {
    email: "",
    username: "",
    listOfDiagrams: [],
  };

  // Проблема с загрузкой шрифтов
  const loadFontsAsync = async () => {
    await Fonts.loadAsync({
        "Gordita-Regular": require("../assets/fonts/Gordita-Regular.ttf")
    })
}

useEffect(() => {
    loadFontsAsync()
}, [])

//  Стандартные функции для проверки инпутов и того, что ввёл пользователь
  const textInputChange = (e) => {
    const re = /\S+@\S+\.\S+/
    if (re.test(e)) {
      setData({
        ...data,
        email: e,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: e,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = (e) => {
    if (e.trim().length >= 4) {
      setData({ ...data, isValidUser: true });
    } else {
      setData({ ...data, isValidUser: false });
    }
  };

  const handlePasswordChange = (e) => {
    if (e.trim().length < 8) {
      setData({ ...data, password: e, isValidPassword: false });
    } else {
      setData({ ...data, password: e, isValidPassword: true });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
// Тут проверка данных, отработка ошибок и диспатчи в локальный редакс стейт
  const loginHandle = async (email, password) => {
    const result = await axios.post("https://agile-thicket-06723.herokuapp.com/login", {
      email,
      password,
    })
    .catch(e => {
      Alert.alert(
        "Ошибка",
        "Проверьте правильность ввода данных",
        [
          {
            text: "Хорошо",
            onPress: () => navigation.navigate("SignIn")
          }
        ]
      )
    })
  
      Alert.alert(
        "Вход",
        "Добро пожаловать",
        [
          {
            text: "Ok",
            onPress: async () => {
              await AsyncStorage.setItem(
                "USER_INFO",
                JSON.stringify({
                  email: email,
                  password: password,
                })
              );
              const userListOfDiagrams = await axios
                .get("https://agile-thicket-06723.herokuapp.com/diagrams")
                .catch((e) => console.log(e));
                if(userListOfDiagrams.length !== 0) {
                  userListOfDiagrams.data.map((item) => {
                if (item.email === email) {
                  userData.listOfDiagrams = item;
                }
              });
              if (userData.listOfDiagrams.length !== 0) {
                userData.listOfDiagrams.diagrams.map((item) => {
                  dispatch({
                    type: ADD_COLORGRAM,
                    payload: {
                      mainSegment: item.mainSegment,
                      anotherSegments: item.anotherSegments,
                    },
                  });
                });
              }
                }
              
              dispatch({
                type: LOGIN_USER,
                payload: {
                  email,
                  username: result.data.username,
                  countOfDiagrams: 0,
                },
              });
          
              navigation.navigate("RootTabScreen")},
          },
        ],
      )
    };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            backgroundColor: colors.background,
          },
        ]}
      >
        <Image source={require("../assets/favicon_1.png")} />
        <Text style={styles.headerTitle}>Фёдор Милых</Text>
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
          Вход в аккаунт
        </Text>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Ваш Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Введите email верного формата</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Пароль
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
                color: colors.text,
              },
            ]}
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
              Пароль должен иметь не менее 8 символов
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordChanger")}
        >
          <Text style={styles.forgotPassword}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            loginHandle(data.email, data.password);
          }}
        >
<View style={[styles.styledButton, { alignSelf: "center" }]}>
          <View
            style={styles.signIn}
          >
            <Text
              style={styles.buttonText}
            >
              Войти
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        
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
              Нет учётной записи?{" "}
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ fontWeight: "bold" }}
              >
                Зарегистрироваться
              </Text>
            </Text>
          </View>
      </Animatable.View>
    </View>
  );
}

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
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#000000",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
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
    width: 173,
    height: 33,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 33,
    color: "#000000",
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
  },
  buttonText: {
    width: 99,
    height: 23,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "center",
    color: "#ffffff",
  },
  forgotPassword: {
    color: "#009387",
    marginTop: 15,
    alignSelf: "flex-end",
    fontSize: 14,
    fontStyle: "normal",
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

export default SignIn;
