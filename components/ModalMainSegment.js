import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import ColorPicker from './ColorPicker'

import { 
    ADD_CENTER_SEGMENT, 
    CHANGE_TEXT_COLOR,
    CHANGE_FIRST_DIAG_SEGMENT
} from './redux/action/types'
import { useDispatch, useSelector } from 'react-redux'


const styles = StyleSheet.create({
    comments: {
        width: "100%",
        borderColor: "red"
    },
    collapseHeader: {
        borderWidth: 0.5,
        borderRadius: 5,
        alignItems: 'center',
        fontFamily: "Roboto"
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: "#9CA3AF",
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        fontFamily: 'Roboto'
    },
    list: {
        width: "100%",
        marginTop: 10,
    },
    textBox: {
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1,

        elevation: 2,
    }
})

const ModalMainSegment = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch()
    const { mainSegment } = useSelector(state => state.diagrams)
    const name = useSelector(state => state.username)

    const [activePage, setActivePage] = useState(0)
    const [ color, setColor ] = useState(mainSegment.color)
    const [ shades, setShades ] = useState([])

    const colors = [
        "#00FFFF",
        "#000000",
        "#0000FF",
        "#FF00FF",
        "#808080",
        "#008000",
        "#00FF00",
        "#800000",
        "#000080",
        "#808000",
        "#800080",
        "#FF0000",
        "#C0C0C0",
        "#008080",
        "#FFFFFF",
        "#FFFF00"
    ]

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

    const confirmHandler = () => {
        dispatch({
            type: ADD_CENTER_SEGMENT,
            payload: {
                mainSegment: {
                    color: color
                }
            }
        })

        let g1 = parseInt(color.slice(3, 5), 16)
        let b1 = parseInt(color.slice(5, 7), 16)
        if( g1 <= 100 || b1 <= 100) {
            dispatch({
                type: CHANGE_TEXT_COLOR,
                payload: {
                    textColor: "white"
                }
            })
        }else {
            dispatch({
                type: CHANGE_TEXT_COLOR,
                payload: {
                    textColor: "black"
                }
            })
        }
        
        dispatch({
            type: CHANGE_FIRST_DIAG_SEGMENT,
            payload: {
                anotherSegments: {
                    catagory: "",
                    problem: "",
                    emotion: "",
                    color: ""
                },
                color: color
            }
        })
        setIsModalOpen(!isModalOpen)
    }

    const pageRenderHandler = () => {
        switch(activePage){
            case 0: 
                return (
                  <View>
                    <View style={styles.comments}>
                      <Text>
                        {name}, каким цветом вы бы изобразили собственное "Я"
                        или своё нынешнее состояние? Пожалуйста, закрасьте этим
                        цветом центральный круг вашей цветограммы
                      </Text>
                    </View>
                    <View style={styles.line}></View>
                    <Collapse
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <CollapseHeader>
                        <View style={styles.collapseHeader}>
                          <Text>Основные цвета</Text>
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        {colors.map((item, index) => (
                          <Text
                            style={[
                              styles.textBox,
                              {
                                backgroundColor: item,
                                margin: 5
                              },
                            ]}
                            key={index}
                            onPress={() => {
                              setColor(item);
                              setActivePage(activePage + 1)
                              generateColorShades(item)
                            }}
                          ></Text>
                        ))}
                      </CollapseBody>
                    </Collapse>
                    <Collapse
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <CollapseHeader>
                        <View style={styles.collapseHeader}>
                          <Text>Кастомный цвет</Text>
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        <ColorPicker />
                      </CollapseBody>
                    </Collapse>
                  </View>
                );
            case 1: 
                return (
                    <View>
                     <View style={styles.comments}>
                      <Text>
                        {name}, теперь выберите оттенок этого цвета
                      </Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.list}>
                        {
                            shades.map((item, index) => {
                                return (
                                    <View key={index} style={{
                                        margin: 5,
                                        flexDirection: "row"
                                        }}>
                                        <Text>{`${110 - parseInt((index + 1)+"0")}%`}</Text>
                                        <Text
                                          style={[
                                            styles.textBox,
                                            {
                                                flex: 1,
                                              backgroundColor: item,
                                              margin: 5
                                            },
                                          ]}
                                          key={index}
                                          onPress={() => {
                                              setColor(item)
                                              setActivePage(activePage + 1)
                                          }}
                                        ></Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                )
            case 2:
                return (
                    <View>
                        <View style={styles.comments}>
                      <Text>
                        {name}, проверьте ещё раз цвет, который Вы выбрали
                      </Text>
                    </View>
                    <View style={styles.line}></View>
                    <View>
                        <View style={{
                            margin: 5,
                            flexDirection: "row"
                        }}>
                            <Text>Вы выбрали цвет: </Text>
                            <Text style={[
                                styles.textBox,
                                {
                                    flex: 1,
                                    backgroundColor: color,
                                    margin: 5
                                }
                            ]}/>
                        </View>

                        <View style={{flexDirection: "row"}}>
                           <TouchableOpacity
                            style={{
                                width: 150,
                                height: 25,
                                alignItems: 'center',
                                marginLeft: 20,
                                borderWidth: 1,
                                borderColor: color,
                                borderRadius: 5
                            }}
                            onPress={() => {
                                setActivePage(0)
                                }}
                            >
                                <View>
                                    <Text>Изменить</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{
                                width: 150,
                                height: 25,
                                alignItems: 'center',
                                marginLeft: 30,
                                borderWidth: 1,
                                borderColor: color,
                                borderRadius: 5
                            }}
                                onPress={() => {
                                    confirmHandler()
                                }}
                            >
                                <Text>Подтвердить</Text>
                            </TouchableOpacity> 
                        </View>
                        
                    </View>
                    </View>
                )
        }
    }

    return (
        <View>
            {pageRenderHandler()}
        </View>
    )
}


export default ModalMainSegment