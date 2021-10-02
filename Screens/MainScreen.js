import React, { useEffect } from "react";
import { Fonts, Asset } from 'expo'
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";
import YoutubeIframe from "react-native-youtube-iframe";
// import LinearGradient from 'react-native-linear-gradient'
// import * as Fonts from 'expo-font'
// import Asset from 'expo-asset'

/*
  Главная страничка, выполняющая роль информативной странички. 
  Тут есть две проблемы:
  1) Шрифты, они не загружаються( Шрифты находяться в ассетах

*/
function MainScreen({ navigation }) {
  const { colors } = useTheme();
  const loadFontsAsync = async () => {
    await Fonts.loadAsync({
        "Gordita-Regular": Asset.fromModule(require('../assets/fonts/Gordita-Regular.ttf')).uri
    })
}

useEffect(() => {
    loadFontsAsync()
}, [])


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
        {/* <LinearGradient
          colors={['#FF166F', '#FF6D2F']}
        > */}
          <Text
            style={[
              styles.title,
              {
                color: "red",
                alignSelf: "center",
                fontFamily: "Gordita-Regular",
              },
            ]}
          >
            "Краски вашей жизни"
          </Text>
        {/* </LinearGradient> */}
        <SafeAreaView>
          <ScrollView>
            <Text style={[styles.text, { fontFamily: "Roboto" }]}>
              {" "}
              Цветовой тест "Краски моей жизни" представляет собой модификацию
              теста Люшера, предположенную доктором психологических наук Иваном
              Анатольевичем Огневым. Работа с тестом начинается с проведением
              психологического аудита вашей проблемы
            </Text>
            <Text style={styles.textParagraph}>
              1. Психологический аудит любой жизненной проблемы
            </Text>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                alignSelf: "center",
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              onPress={() =>
                navigation.navigate("FilePdfReader", {
                  pdfFileName: "Schema",
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                }}
              >
                Посмотреть схему проведения психологического аудита
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                marginTop: 20,
                marginBottom: 10,
                alignSelf: "center",
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              onPress={() =>
                navigation.navigate("FilePdfReader", {
                  pdfFileName: "Audit",
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                }}
              >
                Пример психологического аудита
              </Text>
            </TouchableOpacity>
            <View></View>
            <Text style={styles.textParagraph}>
              2. Перенос данных психологического аудита в нейропсихологическую
              экспертную систему "Краски моей жизни".
            </Text>
            <View>
              <YoutubeIframe height={200} videoId="btS0HDK2fow" />
            </View>
            <Text style={styles.textParagraph}>
              3. Результат расшифровки психологического аудита жизненной
              проблемы
            </Text>
            <View>
              <YoutubeIframe height={200} videoId="IyPf0IVlDM0" />
            </View>
            <Text style={styles.textParagraph}>
              4. Как убрать проблему из головы и снизить уровень стресса?
            </Text>
            <Text style={[styles.text, { fontFamily: "Gordita-Regular" }]}>
              По факту расшифровки психологического аудита экспертная система
              "Краски моей жизни" сразу "видит" набор цветов, который необходим
              вам для избавления от стресса, вызванного проблемой.{" "}
              <Text style={{ fontWeight: "bold" }}>
                Такой набор цветов называется курсом цветовой коррекции и
                представляет собой видеофайл, в котором записан индивидуальный
                комплекс цветовых бликов в определенной последовательности.
                Смотреть курс нужно 15-20 минут 1-2 раза в день
              </Text>
            </Text>
            <Text
              style={[
                styles.styledAlert,
                {
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontFamily: "Gordita-Regular",
                  fontSize: 16,
                },
              ]}
            >
              Это приложение позволяет бесплатно перенести данные
              психологического аудита в нейропсихологическую экспертую систему
              "Краски моей жизни" и купить месячный курс цветовой коррекции для
              его просмотра на мобильном устройстве. Также вы можете вы можете
              оплатить профессиональные психологические консультации и детально
              разобраться с вашей жизненной проблемой
            </Text>

            <Text
              style={[
                styles.styledCongratulation,
                {
                  color: "white",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 16,
                },
              ]}
            >
              С уважением к вам, Тодор Милих Магистр психологических наук,
              Клинический психолог
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  footer: {
    flex: 1.5,
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 30,
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
  text: {
    width: 330,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 22,
    textAlign: "center",
    color: "#616465"
  },
  textParagraph: {
    width: 330,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 22,
    color: "#616465",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  styledAlert: {
    width: "100%",
    height: 200,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  styledCongratulation: {
    width: "100%",
    height: 100,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  }
});
export default MainScreen;
