import React, { useState, useRef } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Line} from './styled'
import { useSelector, useDispatch } from 'react-redux'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import HsvColorPicker from 'react-native-hsv-color-picker'
import { ADD_COLORGRAM, LOAD_DEFAULT_DIAG } from '../components/redux/action/types'
import axios from 'axios'

function ModalSubmitCologram ({ isModalClose, setIsModalClose, countParts}) {
    const [ activePage, setActivePage ] = useState(0)
    const [ shades, setShades ] = useState(null)
    const [ hsvData, setHsvData ] = useState({
        hue: 0,
        sat: 0,
        val: 1,
      })
    const [ colorWithoutProblem, setColorWithoutProblem ] = useState(null)
    const colors = [
        "#00FFFF",
        "#000000",
        "#0000FF",
        "#FF00FF",
        "#808080",
        "#008000",
        "#00FF00",
        "#800000",
        "#808000",
        "#800080",
        "#FF0000",
        "#C0C0C0",
        "#008080",
        "#FFFFFF",
        "#FFFF00"
    ]
    const email = useSelector(state => state.email)
    const name = useSelector(state =>  state.username)
    const diagrams = useSelector(state => state.diagrams)
    const dispatch = useDispatch()
    const colorRef = useRef(null)

    // Функция для HSV Color Picker
    const onSatValPickerChange = ({ saturation, value }) => {
        setHsvData({
          ...hsvData,
          sat: saturation,
          val: value
        })
    }
  
    const onHuePickerChange = ({ hue }) => {
        setHsvData({...hsvData, hue: hue})
    }

    // Генерация оттенков цвета
    function generateColorShades (color) {
        let r1 = parseInt(color.slice(1, 3), 16)
        let g1 = parseInt(color.slice(3, 5), 16)
        let b1 = parseInt(color.slice(5, 7), 16)
    
        let hash = []
    
        for (let i = 1; i < 11; i++) {
            let newR = Math.round(r1  + (255 - r1) * (i / 11))
            let newG = Math.round(g1 + (255 - g1) * (i / 11))
            let newB = Math.round(b1 + (255 - b1) * ( i / 11))
    
            let newColor = "#" + newR.toString(16) + newG.toString(16) + newB.toString(16)
            hash.push(newColor)
        }
        setShades(hash)
    }
// Этапы подтверждения сектора и обнуления всех секторов цветограмма, на стандартный
    function pageHandler() {
        if(activePage === 0){ 
            return (
                <View>
                    <Text style={styles.comments}>
                        <Text>{name}, выберите цвет вашего душевного состояния,
                        если бы этой проблемы не было или она уже была бы разрешена!</Text>
                    </Text>
                    <Line />
                    <Collapse style={{
                        marginBottom: 10,
                        alignSelf:"center",
                        justifyContent:"center",
                        alignItems: "center"
                    }}>
                        <CollapseHeader>
                            <View style={styles.collapseHeader}>
                                <Text style={{
                                    height: "100%",
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: 18
                                }}>Основные цвета</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                        <View style={{ width: 300, height: 200, flexWrap: "wrap",}}>
                {colors.map((item, index) => (
                  <Text
                    style={[
                      styles.textBox,
                      {
                        backgroundColor: item,
                        margin: 5,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      setActivePage(activePage + 1);
                      generateColorShades(item);
                    }}
                  ></Text>
                ))}
              </View>
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={{
                        marginBottom: 10,
                        alignSelf: "center"
                    }}>
                            <CollapseHeader>
                                <View style={styles.collapseHeader}>
                                <Text style={{
                                    height: "100%",
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: 18
                                }}>Кастомный цвет</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                            <HsvColorPicker 
                        huePickerHue={hsvData.hue}
                        onHuePickerDragMove={onHuePickerChange}
                        onHuePickerPress={onHuePickerChange}
                        satValPickerHue={hsvData.hue}
                        satValPickerSaturation={hsvData.sat}
                        satValPickerValue={hsvData.val}
                        onSatValPickerDragMove={onSatValPickerChange}
                        onSatValPickerPress={onSatValPickerChange}
                        ref={colorRef}
                      />
                      <TouchableOpacity
                            style={{
                                width: "80%",
                                height: 25,
                                alignItems: 'center',
                                marginTop: 20,
                                marginLeft: 20,
                                borderWidth: 1,
                                borderColor: "black",
                                borderRadius: 5
                            }}
                                onPress={() => {
                                  const customColor = colorRef.current.getCurrentColor()
                                  setActivePage(activePage + 1)
                                  generateColorShades(customColor)
                                }}
                            >
                                <Text>Выбрать</Text>
                            </TouchableOpacity> 
                            </CollapseBody>
                    </Collapse>
                </View>
            )
        } else if (activePage === 1) {
            return (
                <>
                <View>
                      <Text style={styles.comments}>
                        {name}, теперь выберите оттенок этого цвета
                      </Text>
                      <Line />
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.list}>
                    {shades.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        width: 54,
                        height: 54,
                        fontStyle: "normal",
                        fontWeight:"normal",
                        fontSize: 22,
                        lineHeight: 30,
                        textAlign: "center"
                      }}
                    >{`${110 - parseInt(index + 1 + "0")}%`}</Text>
                    <Text
                      style={[
                        styles.shades,
                        {
                          backgroundColor: item,
                          margin: 5,
                        },
                      ]}
                      key={index}
                      onPress={() => {
                        setColorWithoutProblem(item)
                        setActivePage(activePage + 1);
                      }}
                    ></Text>
                  </View>
                );
              })}
                    </View>
                </>
            )
        } else if (activePage === 2) {
            return (
                <View>
                    <Text style={styles.comments}>
                    Все сектора цветограммы заполнены!  
                    Теперь вы можете купить персональный модуль цветовой коррекции!
                     Ежедневный просмотр цветовой коррекции снимет стресс, возникший 
                     из-за вашей проблемы! Вернувшись в спокойное душевное состояние,
                     вы легко и быстро найдете самое правильное решение для этой проблемы!
                    </Text>
                    <TouchableOpacity
                        style={[styles.collapseHeader, { marginTop: 20 }]}
                        onPress={async () => {
                            console.log(diagrams)
                            await axios
                              .post(
                                "https://agile-thicket-06723.herokuapp.com/diagrams",
                                {
                                  email: email,
                                  mainSegment: {
                                      color: diagrams.mainSegment.color,
                                      problem: diagrams.mainSegment.problem,
                                      colorWithoutProblem: colorWithoutProblem
                                  },
                                  anotherSegments:
                                    diagrams.anotherSegments.slice(
                                      0,
                                      countParts
                                    ),
                                 }
                              )
                              .catch((e) => console.log(e));
                            dispatch({
                              type: ADD_COLORGRAM,
                              payload: {
                                mainSegment: {
                                  color: diagrams.mainSegment.color,
                                  problem: diagrams.mainSegment.problem,
                                  colorWithoutProblem: colorWithoutProblem
                                },
                                anotherSegments:
                                  diagrams.anotherSegments.splice(
                                    0,
                                    countParts
                                  ),
                              },
                            });
                            dispatch({
                              type: LOAD_DEFAULT_DIAG,
                            });
                            setIsModalClose(!isModalClose);
                        }}
                    >
                        <Text style={{
                            height: "100%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            fontSize: 18,
                            color: "white"
                        }}>Перейти к покупке курса</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    return (
        <View>
            {pageHandler()}
        </View>
    )
}

const styles = StyleSheet.create({
  comments: {
    fontSize: "normal",
    fontSize: 19,
    lineHeight: 26,
    fontFamily: "Roboto",
    fontWeight: "normal",
    textAlign: "center",
  },
  collapseHeader: {
    width: 304,
    height: 47,
    backgroundColor: "red",
    borderRadius: 15,
    fontFamily: "Roboto",
  },
  textBox: {
    width: 54,
    height: 54,
    borderRadius: 8,
    margin: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    width: "100%",
    marginTop: 10,
  },
  shades: {
    width: 240,
    height: 30,
    borderRadius: 10,
  },
});

export default ModalSubmitCologram