import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, VirtualizedList } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";

function MainScreen() {
  const { colors } = useTheme();

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar />
        </View>
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
              },
            ]}
          >
            "Краски вашей жизни"
            </Text>
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.text}>  У каждого из нас хватает
                        проблем в жизни. Их создаем мы сами, или нам их создают другие люди(
                        хотя, справедливости ради, следует сказать, что мы для них - тоже
                        проблема). Единственная цель, которая всех нас объединяет, - это
                        желание избавиться от всех проблем и зажить счастливо. Именно это
                        каждый из нас пытается делать на протяжении всей жизни. Но
                        получается далеко не у всех...</Text> 
                    <Text style={styles.text}>  Думали ли вы что, работая с
                        цветом и его оттенками, вы сможете найти решение любой жизненной
                        проблемы? Наверное, нет! Но факт остаётся фактом. Цвет - это
                        протоязык подсознания, и каждый, кто научится говорить на нем,
                        сможет получить подсознания в решении любой проблемы
                    </Text>
                    <Text style={styles.text}>    Ключевая функция подсознания - это охрана человека, следующего вектору своего жизненного 
                        предназначения. Подсознание знает все о вас и ваших проблемах, более того, никакая проблема 
                        не может возникуть в жизни человека без "согласия" подсознания
                    </Text>
                    <Text style={styles.text}>  Поверьте, если что-то или кто-то отравляет вам жизнь, то ваше подсознание точно знает, 
                        почему и для чего это нужжно, хотя ваш ум не может найти логического объяснения происходящему 
                    </Text>
                    <Text style={[styles.text, {
                        color: 'red',
                        fontSize: 18,
                        borderWidth: 1,
                        textAlign: "center"
                    }]}>
                        При помощи "Красок моей жизни" каждый человек без труда сможет научиться контактировать
                        со своим подсознанием и узнать, почему та или иная проблема появилась в его жизни, а
                        также получить от подсознания подсказки по ее решению, даже если проблема относится 
                        к категории "неразрешимых"
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
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: "#06375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    fontSize: 15,
    marginTop: 5,
  },
  paragraph: {
    marginLeft: 15
  }
});
export default MainScreen;
