import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import * as Animatable from 'react-native-animatable' 
import ModalColorCorrectionModule from '../components/ModalColorCorrectionModule'
import { SubTitle } from '../components/styled'

import { useSelector } from 'react-redux'


const ColorGramInfo = ({ route, navigation }) => {


    const { detailOfDeagrams } = route.params
    let mainSegmentColor = (parseInt(detailOfDeagrams.mainSegment.color.slice(1, 7), 16)  ^ 0xFFFFFF | 0x1000000).toString(16).substring(1);
    console.log(detailOfDeagrams)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ animSpeed, setAnimSpeed ] = useState(1000)
    const [oppositeColors, setOppositeColors] = useState([`#${mainSegmentColor}`])
    const [ isInfoModal, setIsInfoModal ] = useState(false)
    const [ activeSector, setActiveSector ] = useState(0)

    // Проверка противоположности цветов
    function isOppositeColor(colorHEX, secondColorHEX) {
        const r1 = parseInt(colorHEX.slice(1, 3), 16)
        const g1 = parseInt(colorHEX.slice(3, 5), 16)
        const b1 = parseInt(colorHEX.slice(5, 7), 16)
        
        const r2 = parseInt(secondColorHEX.slice(1, 3), 16)
        const g2 = parseInt(secondColorHEX.slice(3, 5), 16)
        const b2 = parseInt(secondColorHEX.slice(5, 7), 16)
    
        const r = Math.abs(255 - r1 - r2)
        const g = Math.abs(255 - g1 - g2)
        const b = Math.abs(255 - b1 - b2)
    
        if (r < 128 && g < 128 && b < 128) {
            return true
        } else {
            return false
        }
    }
    // Функция отвечающая за добавление противоположных цветов цветограмма
    function oppositeColorAdd(colors) {
        colors.map((item) => {
            let col = item
            let newColor = (parseInt(col.slice(1, 7), 16) ^ 0xFFFFFF | 0x1000000).toString(16).substring(1);
            setOppositeColors((oppositeColors) => [...oppositeColors, `#${newColor}`])
        })
        
    }

    let arr = [];
    // Проверка на наличие проблемных цветов. Если сектора были найдены, тогда добавляется кнопка просмотра цветокорректирующего модуля
    function renderModalCorrection (item) {
      let lengthOfAnotherSegments = item.anotherSegments.length;
      item.anotherSegments
        .slice(0, lengthOfAnotherSegments / 2)
        .map((elem, i) => {
            let oppositeSector = i + lengthOfAnotherSegments / 2
            if (oppositeSector > lengthOfAnotherSegments) {
                return 
            }
            let colors = isOppositeColor(
                elem.color,
                item.anotherSegments[oppositeSector].color
            )
            if(colors) {
                arr.push(item.anotherSegments[oppositeSector])
            }
        })

        if(!arr.length) {
            return null
        }
        return (
            <TouchableOpacity
                    style={styles.loadAnim}
                    onPress={() => setIsModalSettings(!isModalSettings)}
                  >
                    <Text style={styles.buttonText}>
                      Загрузить цветокоректирующийся модуль
                    </Text>
                  </TouchableOpacity>
        )
    }

    return (
      <View style={styles.container}>
        <StatusBar />
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <View style={{ marginBottom: 10 }}>
                <Text style={{ 
                  justifyContent: "center",
                  marginTop: 20,
                  width: 300,
                  height: 56,
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: 22,
                  lineHeight: 27,
                  textAlign: "center",
                  color: "#000"
                }}>
                  Как вы хотите смотреть смотреть цветовую коррекцию?
                </Text>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 290,
                      height: 47,
                      backgroundColor: "#47B58A",
                      borderRadius: 15
                    }}
                    onPress={() => {
                      setAnimSpeed(1500);
                      Alert.alert(
                        "Предупреждение",
                        "Поверните телефон в горизонтальное положение",
                        [
                          {
                            text: "Да",
                            onPress: () => {
                              let colorArr = [];
                              detailOfDeagrams.anotherSegments.map((item) => {
                                colorArr.push(item.color);
                              });
                              oppositeColorAdd(colorArr);
                              setIsModalOpen(!isModalOpen);
                            },
                          },
                          {
                            text: "Нет",
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={{textAlign:"center", height: "100%", textAlignVertical: "center", color:"white"}}>Медленно</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 290,
                      height: 47,
                      backgroundColor: "#47B58A",
                      borderRadius: 15,
                      marginTop: 15
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Предупреждение",
                        "Поверните телефон в горизонтальное положение",
                        [
                          {
                            text: "Да",
                            onPress: () => {
                              let colorArr = [];
                              detailOfDeagrams.anotherSegments.map((item) => {
                                colorArr.push(item.color);
                              });
                              oppositeColorAdd(colorArr);
                              setIsModalOpen(!isModalOpen);
                            },
                          },
                          {
                            text: "Нет",
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={{textAlign:"center", height: "100%", textAlignVertical: "center", color:"white"}}>Нормально</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 290,
                      height: 47,
                      backgroundColor: "#47B58A",
                      borderRadius: 15,
                      marginTop: 15
                    }}
                    onPress={() => {
                      setAnimSpeed(500);
                      Alert.alert(
                        "Предупреждение",
                        "Поверните телефон в горизонтальное положение",
                        [
                          {
                            text: "Да",
                            onPress: () => {
                              let colorArr = [];
                              detailOfDeagrams.anotherSegments.map((item) => {
                                colorArr.push(item.color);
                              });
                              oppositeColorAdd(colorArr);
                              setIsModalOpen(!isModalOpen);
                            },
                          },
                          {
                            text: "Нет",
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={{textAlign:"center", height: "100%", textAlignVertical: "center", color:"white"}}>Быстро</Text>
                  </TouchableOpacity>
                </View>
              </View>
          {renderModalCorrection(detailOfDeagrams)}
          <TouchableOpacity
            style={styles.loadAnim}
            onPress={() => navigation.navigate("AnalizeColorgram")}
          >
            <Text style={styles.buttonText}>Вернуться</Text>
          </TouchableOpacity>

{/* Модальное окно для выбора скорости показа анимации */}
           
          <Modal
            style={styles.centeredView}
            animationType="fade"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <ModalColorCorrectionModule
              bcolor={detailOfDeagrams.mainSegment.color}
              colorsForFigures={oppositeColors}
              animSpeed={animSpeed}
              setOpenModule={setIsModalOpen}
            />
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  loadAnim: {
    width: "100%",
    marginTop: 10,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  listItem: {
    margin: 5,
    width: "80%",
    fontFamily: "Roboto",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  circle: {
    width: 125,
    height: 125,
    bottom: -115,
    left: 90,
    borderRadius: 150 / 2,
  },
  circleText: {
    width: 90,
    marginTop: 35,
    marginLeft: 25,
    color: "black",
  },
  line: {
    height: "1",
    width: "100%;",
    backgroundColor: "#9CA3AF",
    marginVertical: 10,
  },
  textBox: {
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 2,
  },
  collapseHeader: {
    borderWidth: 0.5,
    borderRadius: 5,
    alignItems: "center",
    fontFamily: "Roboto",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  lastPage: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    width: 278,
    height: "100%",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  }
});

export default ColorGramInfo