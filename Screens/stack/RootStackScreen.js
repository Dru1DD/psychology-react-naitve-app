import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar'
import { AsyncStorage } from 'react-native'
import LottieView from "lottie-react-native";

//navigation
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SplashScreen from "../SplashScreen";
import PasswordChanger from "../PasswordChanger";
import RootTabScreen from "../tabs/RootTabScreen";

//ASYNC REQUEST
import axios from 'axios'

// Redux
import { useDispatch } from "react-redux";
import { ADD_COLORGRAM, USER_INFO_FROM_ASYNC_STORAGE } from "../../components/redux/action/types";


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    //Local State
    const [isLogined, setIsLogined] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Dispatch
    const dispatch = useDispatch()

    useEffect(() => {
      const _storeData = async () => {
        setTimeout(async () => {
          try {
            const result = await AsyncStorage.getItem("USER_INFO");
            if (result) {
              const userInfo = await axios
                .get("https://agile-thicket-06723.herokuapp.com/users")
                .catch((e) => console.log(e));
              let userData = {
                email: "",
                username: "",
                listOfDiagrams: [],
              };
              userInfo.data.map((item) => {
                if (JSON.parse(result).email === item.email) {
                  userData.email = item.email;
                  userData.username = item.username;
                }
              });

              const userListOfDiagrams = await axios
                .get("https://agile-thicket-06723.herokuapp.com/diagrams")
                .catch((e) => console.log(e));

              userListOfDiagrams.data.map((item) => {
                if (item.email === JSON.parse(result).email) {
                  userData.listOfDiagrams = item;
                }
              });

              if (userListOfDiagrams.data !== []) {
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

              dispatch({
                type: USER_INFO_FROM_ASYNC_STORAGE,
                payload: {
                  email: userData.email,
                  username: userData.username,
                },
              });
              setIsLogined(true);
            }
          } catch (e) {
            console.log(e);
          }
          setIsLoading(!isLoading);
        }, 5000);
      };
      _storeData();
    }, []); 


    return (
        <>
        <StatusBar />
    {
        isLoading ?
        <LottieView
          source={require("../../assets/73806-preloader-animation.json")}
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
          }}
          autoPlay
        />
        :
         <RootStack.Navigator screenOptions={{headerMode: false}}>
            {
                isLogined ? 
                           <RootStack.Screen name="RootTabScreen" component={RootTabScreen} /> 
                    :
                    <>
                        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
                        <RootStack.Screen name="SignIn" component={SignIn} />
                        <RootStack.Screen name="PasswordChanger" component={PasswordChanger} />
                        <RootStack.Screen name="SignUp" component={SignUp} />
                        <RootStack.Screen name="RootTabScreen" component={RootTabScreen} />
                    </>
            }
        </RootStack.Navigator>

    }
        </>
    );
};

export default RootStackScreen;
