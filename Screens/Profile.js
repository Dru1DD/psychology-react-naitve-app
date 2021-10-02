import React, { useEffect, useState} from 'react'
import * as Updates from 'expo-updates'
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Modal, AsyncStorage, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import * as Fonts from 'expo-font'

const Profile = ({ navigation }) => {
    const { colors } = useTheme()

    //Локальная дата
    const username = useSelector(state => state.username)
    const email = useSelector(state => state.email)
    const listOfDiagrams = useSelector(state => state.listOfDiagrams)
    const [isExitModalOpen, setIsExitModalOpen] = useState(false)
    const loadFontsAsync = async () => {
      await Fonts.loadAsync({
          "Gordita-Regular": require("../assets/fonts/Gordita-Regular.ttf")
      })
  }

  // Проблема со шрифтами
  useEffect(() => {
      loadFontsAsync()
  }, [])


    function exitHandler () {
      setIsExitModalOpen(!isExitModalOpen)
    }
    return (
      <View style={styles.container}>
        <StatusBar />
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
          animation="fadeInUpBig"
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontFamily: "Gordita-Regular",
              },
            ]}
          >
            Профиль
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                marginTop: 20,
                fontFamily: "Gordita-Regular",
              },
            ]}
          >
            Персональная информация
          </Text>
          <View style={styles.textBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={[styles.text, { fontFamily: "Gordita-Regular" }]}>
                ФИО:
              </Text>
              <Text style={styles.textValue}>{username}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={[styles.text, { fontFamily: "Gordita-Regular" }]}>
                Почта:
              </Text>
              <Text style={styles.textValue}>{email}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    width: 182,
                    height: 40,
                    fontFamily: "Gordita-Regular",
                  },
                ]}
              >
                Количество сделанных цветограмм:
              </Text>
              <Text
                style={[styles.textValue, { fontFamily: "Gordita-Regular" }]}
              >
                {listOfDiagrams ? listOfDiagrams.length : 0}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.styledButton}
            onPress={exitHandler}
            fill="url(#1)"
          >
            <Text style={{ color: "white", fontSize: 20 }}>Выход</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              marginTop: "auto",
              justifyContent: "flex-end",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Image source={require("../assets/favicon_1_mini.png")} />
              <Text
                style={[styles.logoText, { fontFamily: "Gordita-Regular" }]}
              >
                vipdoctor.life
              </Text>
            </View>
            <View style={styles.line} />
          </View>
          <Modal
            style={styles.centeredView}
            animationType="fade"
            transparent={true}
            visible={isExitModalOpen}
            onRequestClose={() => setIsExitModalOpen(!isExitModalOpen)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.title, { width: "100%" }]}>Выход</Text>
                <Text style={styles.modalText}>Вы точно хотите выйти</Text>
                <TouchableOpacity
                  style={styles.styledButton}
                  onPress={async () => {
                    setIsExitModalOpen(!isExitModalOpen);
                    try {
                      await AsyncStorage.removeItem("USER_INFO");
                      await Updates.reloadAsync();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Text style={styles.styledText}>Выйти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.styledButton, { marginTop: 10 }]}
                  onPress={() => {
                    setIsExitModalOpen(!isExitModalOpen);
                    navigation.navigate("Профиль");
                  }}
                >
                  <Text style={styles.styledText}>Нет</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Animatable.View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: "100%",
        height: 33,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
        textAlign: "center"
      },
    textBox: {
        width: "100%",
        height: 200,
    },
    text: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 20,
        color: "#616465"
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
    },
    subtitle: {
        width: 300,
        height: 20,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 20,
        color: "#231F20"
    },
    textValue: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 14,
        lineHeight: 20,
        color: "#231F20"
    },
    styledButton: {
        width: 220,
        height: 59,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
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
},
styledText: {
  width: 99,
    height: 23,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "center",
    color: "#ffffff",
}
})
export default Profile