import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
import { useSelector } from 'react-redux'


const AnalizeColorgram = ({ navigation }) => {

    let listOfDiagrams = useSelector(state => state.listOfDiagrams)
    console.log(listOfDiagrams)

    // Тут чистая вёрстка, без особого функционала
    return (
      <View style={styles.container}>
        <StatusBar />
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Ваши диаграммы</Text>
        <View  style={{marginTop: 20, height: 500, width: "90%"}}>
           <ScrollView>
            {listOfDiagrams ? (
              listOfDiagrams.length !== 0 ? (
                listOfDiagrams.map((item, index) => {
                  return (
                    <View key={index} style={styles.item}>
                      <View
                        style={[
                          styles.itemColor,
                          { backgroundColor: item.mainSegment.color },
                        ]}
                      />
                      <View style={styles.itemTextBox}>
                        <Text style={styles.itemTitle}>
                        Цветограмм "
                          {item.mainSegment.problem
                            ? item.mainSegment.problem
                            : null}
                          "
                        </Text>
                        <TouchableOpacity
                          style={{}}
                          onPress={() =>{
                            console.log(item)
                            navigation.navigate("CologGramInfo", {
                              detailOfDeagrams: item,
                            })
                          }
                        }
                        >
                          <Text style={styles.itemText}>
                            Посмотреть детальную информацию
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={require("../assets/illustration.png")} />
                  <Text style={styles.centeredView}>
                    Не создано ни одной цветограмы
                  </Text>
                  <TouchableOpacity
                      style={styles.button}
                    onPress={() => navigation.navigate('Цветограм')}
                  >
                    <Text style={styles.buttonText}>Создать цветограмму</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : null}
          </ScrollView>
 
        </View>
          
          <View
            style={{
              flexDirection: "column",
              marginTop: "auto",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
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
        </Animatable.View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        width: 232,
        height: 33,
        fontStyle: 'normal',
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
        textAlign: "center"
    },
    centeredView: {
        textAlign:"center",
        fontSize: 26
    },
    accordion: {
        width: '100%'
    },
    loadAnim: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10
    },
    textLoad: {
        fontSize: 18,
        fontWeight: "bold"
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
    collapseHeader: {
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center'
    },
    listItem: {
        margin: 5,
        width: "80%",
        fontFamily: "Roboto",
        borderWidth: 0.5,
        borderRadius: 5
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
    item: {
        width: 290,
        height: 92,
        borderRadius: 10,
        flexDirection: "row",
    },
    itemTextBox: {
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    itemTitle: {
        width: "100%",
        marginTop: 15,
        textAlign: "center",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 17
    },
    itemColor: {
        width: 61,
        height: 73,
        marginLeft: 13,
        marginTop: 8,
        borderRadius: 14
    },
    itemText: {
        width: 159,
        marginBottom: 15
    },
    button: {
      width: "100%",
      marginTop: 10,
      height: 50,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10
    },
    buttonText: {
      width: 278,
      height: "100%",
      fontSize: 16,
      lineHeight: 19,
      textAlign: "center",
      textAlignVertical: "center",
      color: "white"
    }
})

export default AnalizeColorgram