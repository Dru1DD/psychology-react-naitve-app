import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import { v4 as uuidv4 } from 'uuid'

//Styled Components
import { Line, SubTitle } from './styled'

//icons
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

//Redux 
import { ADD_SEGMENT_CHARACTERISTICS } from './redux/action/types';
import { useDispatch, useSelector } from 'react-redux';

//ColorPicker
import HsvColorPicker from 'react-native-hsv-color-picker'

const styles = StyleSheet.create({
    comments: {
        fontSize: "normal",
        fontSize: 19,
        lineHeight: 26,
        fontFamily: "Roboto",
        fontWeight: "normal",
        textAlign: "center"
      },
    header: {
        flexDirection: 'row',
        fontFamily: 'Roboto'
    },
    tag: {
        padding: 5
    },
    activeTag: {
        backgroundColor: '#CCCCCC'
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
    collapseHeader: {
        width: 304,
        height: 47,
        backgroundColor: "red",
        borderRadius: 15,
        fontFamily: "Roboto",
      },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: "#9CA3AF",
        marginVertical: 10
    },
    emotionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }, 
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginBottom: 5
    },
    lastPage: {
        width: "200%",
        justifyContent: "center",
        alignSelf: 'center',
    },
    emotionBox: {
        margin: 10,
        flexWrap: "wrap"
    },
    shades: {
        width: 240,
        height: 30,
        borderRadius: 10
      }
})

const ModalAddingProps = ({ closeModal, activeSection, setActiveSection }) => {

    //Redux state
    const diagrams = useSelector(state => state.diagrams)
    const name = useSelector(state =>  state.username)
    const dispatch = useDispatch()

    const colorRef = useRef(null)
    
    //LocalState
    const [activePage, setActivePage] = useState(0)
    const [catagory, setCatagory] = useState(diagrams.anotherSegments[activeSection].catagory)
    const [problem, setProblem] = useState(diagrams.anotherSegments[activeSection].problem)
    const [emotion, setEmotion] = useState(diagrams.anotherSegments[activeSection].emotion)
    const [color, setColor] = useState(diagrams.anotherSegments[activeSection].color)
    const [ hsvData, setHsvData ] = useState({
        hue: 0,
        sat: 0,
        val: 1,
      })
  
    const [shades, setShades] = useState([])
    // Основные цвета
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
    // Эмоции
    const emotions = [
        {
            title: "Гнев",
            items: [
                "Агрессия",
                "Бешенство",
                "Брезгливость",
                "Возмущение",
                "Досада",
                "Жестокость",
                "Зависть",
                "Злость",
                "Исступление",
                "Истерия",
                "Негодование",
                "Ненависть",
                "Неприязнь",
                "Обида",
                "Озверения"
            ]
        },
        {
            title: "Страх",
            items: [
                "Беспокойство",
                "Вина",
                "Боязнь",
                "Возбуждение",
                "Встревоженность",
                "Замешательство",
                "Застенчивость",
                "Испуг",
                "Надменность",
                "Опасение",
                "Отчаяние",
                "Ошарашенность",
                "Ошеломлённость",
                "Подвох"
            ]
        },
        {
            title: "Грусть",
            items: [
                "Безнадёжность",
                "Безысходность",
                "Горечь",
                "Беспомощность",
                "Душевная боль",
                "Жалобность",
                "Жалость",
                "Загнанность",
                "Задумчивость",
                "Лень",
                "Отрешённость",
                "Отчаяние",
                "Отчуждённость",
                "Печаль",
                "Потерянность"
            ]
        },
        {
            title: "Радость",
            items: [
                "Вера",
                "Веселье",
                "Возбуждение",
                "Восторг",
                "Забава",
                "Забота",
                "Изумление",
                "Интерес",
                "Ликование",
                "Любопытсво",
                "Надежда",
                "Нетерпение",
                "Оживление",
                "Ожидание",
                "Освобождение"
            ]
        },
        {
            title: "Любовь",
            items: [
                "Безопасность",
                "Блаженство",
                "Благодарность",
                "Взаимовыручка",
                "Влечение",
                "Влюблённость",
                "Восхищение",
                "Гордость",
                "Доброта",
                "Доверие",
                "Дружелюбие",
                "Идентичность",
                "Искренность",
                "Любовь к себе",
                "Нежность"
            ]
        }
    ]

    //Hsv Color Picker 
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
//   Генирация оттенков цветов
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

    // Тут отображаються разные этапы заполнения сектора
    function pageHandler() {
        if (activePage === 0) {
            return (
                <>
                    <View>
                        <Text style={styles.comments}>{name}, пожалуйста, напишите ту сферу вашей жизни, которая вызывает наибольшее беспокойство. Далее введите наиболее близкую вам проблему из этой сферы, выберите её цвет и определите эмоцию, которую эту проблема заставляет переживать вас</Text>
                    </View>
                    <View style={styles.line}></View>
                  
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Введите категорию                                                "
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setCatagory(val)}
                    />
                    </View>
                </>
                
            )
        } else if (activePage === 1) {
             return (
                <>
                    <View>
                        <Text style={styles.comments}>{name}, введите наиболее близкую вам проблему, 
                        характерную для этой сферы жизни.
                        Неторопитесь! Введите то, что действительно важно для вас
                        </Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.action} >
                        <TextInput 
                        placeholder="Введите проблему                                                 "
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setProblem(val)}
                    />
                    </View>
                </>
                
            )
        } else if (activePage === 2) {
            return <>
                    <View>
                        <Text style={styles.comments}>{name}, определите эмоцию, 
                        которую эту проблема переживать вас. Вспомните, что вы чувствуете, 
                        когда думаете об этой проблеме…</Text>
                    </View>
                    <View style={styles.line}></View>
                    {
                        emotions.map((elem, index) => {
                            return (
                                <Collapse key={index} style={{marginBottom: 10}}>
                                    <CollapseHeader>
                                        <View>
                                            <Text>{elem.title}</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <SafeAreaView style={{height: 200, width: "100%" }}>
                                            <ScrollView>
                                                {
                                                    elem.items.map(item => (
                                                        <View style={{flexWrap: "wrap"}}>
                                                            <View style={styles.emotionBox}>
                                                                
                                                            <Text 
                                                            key={() => Math.random().toString(32) + uuidv4()}
                                                            onPress={() => {
                                                                setEmotion(item)
                                                                setActivePage(activePage + 1)
                                                            }}
                                                            >
                                                                <Foundation name="arrow-right" size={16} color="red"/>{item}
                                                            </Text>
                                                        </View>
                                                        </View>
                                                    )) 
                                                }
                                            </ScrollView>
                                        </SafeAreaView>
                                    </CollapseBody>
                                </Collapse>
                            )
                        })
                    }
                </>
        } else if (activePage === 3) {
            return (
                <>
                    <View>
                        <Text style={styles.comments}>{name}, У каждого человека своё понимание
                         и представление о счастье. Что для вас счастье? Выберете пиктограмму, 
                         которая наиболее точно соответствует вашему представлению о счастье…</Text>
                    </View>
                    <View style={styles.line}></View>
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
                      setColor(item);
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
                                  setColor(customColor)
                                  setActivePage(activePage + 1)
                                  generateColorShades(customColor)
                                }}
                            >
                                <Text>Выбрать</Text>
                            </TouchableOpacity> 
                            </CollapseBody>
                    </Collapse>
                </>
            )
        } else if (activePage === 4 ) {
            return (
                <>
                <View>
                      <Text style={styles.comments}>
                        {name}, теперь выберите оттенок этого цвета
                      </Text>
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
                          flex: 1,
                          backgroundColor: item,
                          margin: 5,
                        },
                      ]}
                      key={index}
                      onPress={() => {
                        setColor(item);
                        setActivePage(activePage + 1);
                      }}
                    ></Text>
                  </View>
                );
              })}
                    </View>
                </>
            )
        }
    }

    // Отображение последней странички с подтверждение заполненности
    function lastPageConfirm() {
        return (
          <View style={styles.lastPage}>
            <SubTitle style={{alignSelf: "center"}}>Подтвердить</SubTitle>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>Категория:</Text>
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>{catagory}</Text>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>Проблема:</Text>
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>{problem}</Text>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>Эмоция:</Text>
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>{emotion}</Text>
            </View>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={{fontSize: 18, fontStyle: "normal", fontWeight: "normal"}}>Цвет:</Text>
              <View
                style={{
                    width: 75,
                    height: 25,
                    backgroundColor: color,
                    margin: 5,
                    borderRadius: 10,
                  }}
              >
              </View>
            </View>
          </View>
        );
    }

    return (
        <View>
            {
                activePage !== 5 ?
                    <View style={styles.header}>
                        <Text style={activePage === 0 ? [styles.tag, styles.activeTag] : styles.tag}>Категория</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 1 ? [styles.tag, styles.activeTag] : styles.tag}>Проблема</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 2 ? [styles.tag, styles.activeTag] : styles.tag}>Эмоция</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 3 || activePage === 4 ? [styles.tag, styles.activeTag] : styles.tag}>Цвет</Text>
                    </View>
                    :
                    lastPageConfirm()
            }

            <Line />
            <View style={styles.mainContent}>
                {pageHandler()}
                {
                    activePage === 5 ?
                    (
                        <View style={{flexDirection: "column", alignSelf: "center"}}>
                            <TouchableOpacity
                            style={[styles.collapseHeader, {marginBottom: 15}]}
                            onPress={() => {
                                setActivePage(0)
                            }}
                        >
                            <View>
                            <Text style={{
                                    height: "100%",
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    fontSize: 18,
                                    color: "white"
                                }}>Изменить</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.collapseHeader}
                            onPress={async () => {
                                await dispatch({
                                    type: ADD_SEGMENT_CHARACTERISTICS,
                                    payload: {
                                        id: activeSection,
                                        catagory: catagory,
                                        problem: problem,
                                        emotion: emotion,
                                        color: color
                                    }
                                })
                                closeModal(false)
                                setActiveSection(null)
                            }}
                            >
                                <Text style={{
                                    height: "100%",
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    fontSize: 18,
                                    color: "white"
                                }}>Подтвердить</Text>
                            </TouchableOpacity> 
                        </View>
                    )
                        :
                        <TouchableOpacity
                            style={[styles.collapseHeader, {alignSelf: "center"}]}
                            onPress={() => setActivePage(activePage + 1)}
                        >
                            <View style={{ alignSelf: "center"}}>
                                <Text style={{
                                    height: "100%",
                                    color: "white",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontSize: 18,
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                }}>Далее</Text> 
                            </View>
                            
                        </TouchableOpacity>
                }

            </View>
        </View>

    )
}

export default ModalAddingProps