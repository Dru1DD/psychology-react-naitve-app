import React, { useState } from "react";
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
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
  Alert
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";


//icons
import { FontAwesome, Feather } from "react-native-vector-icons";

//Axios
import axios from "axios";

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

    setData({ ...data, userData: result.data})
    

    Alert.alert(
      "Вход",
      "Добро пожаловать",
      [
        {
          text: "Ok",
          onPress: async () => {
            dispatch({
              type: LOGIN_USER,
              payload: {
                email,
                username: result.data.username,
                countOfDiagrams: 0
              }
            })
            await AsyncStorage.setItem("USER_INFO",
            JSON.stringify({
              email: email,
              password: password
            }))
            navigation.navigate("RootTabScreen")},
        },
      ],
    )
    
  };

  return (
    <View style={styles.container}>
      <StatusBar/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Добро пожаловать!</Text>
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
            <Text style={styles.errorMsg}>
              Введите email верного формата
            </Text>
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
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Забыли пароль?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "black",
                  },
                ]}
              >
                Войти
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
});

export default SignIn;
