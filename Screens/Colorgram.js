import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Modal, Alert, Dimensions } from 'react-native'
import Svg, { Path, TextPath } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'

import ModalAddingProps  from '../components/ModalAddingProps'
import { useTheme } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { ADD_COLORGRAM, LOAD_DEFAULT_DIAG } from '../components/redux/action/types'

import axios from 'axios'
import ModalMainSegment from '../components/ModalMainSegment'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        minHeight: Math.round(Dimensions.get('window').height)
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: 10
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
        marginBottom: 15,
        textAlign: "center"
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "#009387",
        alignSelf: 'center'
    },
    circle: {
        width: 125,
        height: 125,
        bottom: -115,
        borderRadius: 150 / 2,
    },
    circleText: {
        width: 90,
        marginTop: 35,
        marginLeft: 25,
        color: "black"
    }
})

function Cologram() {

    //LocalState
    const [countParts, isCountParts] = useState(4)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isMainModalVisible, setIsMainModalVisible] = useState(false)

    const { colors } = useTheme()
    const [activeSection, setActiveSection] = useState(0)
    const [sectionsData, setSectionData] = useState([])
    
    // Redux useSelector & useDispatch
    const diagrams = useSelector(state => state.diagrams)
    const email = useSelector(state => state.email)
    const textColor = useSelector(state => state.textColor)
    const dispatch = useDispatch()

    function slice() {
        let slices = [];
        for (let i = 0; i < countParts; i++) {
            slices.push({ percent: 1 / countParts , color: "white" });
        }

        let cumulativePercent = 0;

        function getCoordinatesForPercent(percent) {
            const x = Math.cos( 2 * Math.PI * percent);
            const y = Math.sin( 2 * Math.PI * percent);
            return [x, y];
        }

        let arr = [];

        arr = slices.map((slice, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += slice.percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
            const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                'L 0 0', // Line
            ].join(' ');
            return (
                <Text key={(Math.random() + 1).toString(36).substring(7)}>
                    <Path
                    d={pathData}
                    id="path"
                    fill={diagrams.anotherSegments[index].color}
                    style={{
                        margin: 10
                    }}
                    onPress={() => {
                      if (diagrams.anotherSegments[index].color === " ") {
                        setIsModalVisible(true);
                        setActiveSection(index);
                        diagrams.anotherSegments[index + 1].color = "";
                      }
                      if (diagrams.anotherSegments[index].color !== "#808080") {
                        setIsModalVisible(true);
                        setActiveSection(index);
                        if (
                          diagrams.anotherSegments[index + 1].color ===
                          "#808080"
                        )
                          diagrams.anotherSegments[index + 1].color = "";
                      }
                    }}
                  />
                  <TextPath href="#path" fill="black">№ {index + 1}</TextPath>
                </Text>
                  
            )
        });
        return arr;
    }

    function confirmHandler() {
        let finishedSegments = countParts
        for ( let i = 0; i < countParts; i++ ) {
            if (diagrams.anotherSegments[i].catagory === "" &&
                diagrams.anotherSegments[i].problem === "" &&
                diagrams.anotherSegments[i].emotion === "" &&
                diagrams.anotherSegments[i].color === ""
            ) {
                    finishedSegments--
                }
        }
        if (finishedSegments === countParts) {
            Alert.alert(
                "Подтверждение",
                "Все сегменты круга были заполнены",
                [
                    {
                        text: "Oк",
                        onPress: async () => {
                            await axios.post("https://agile-thicket-06723.herokuapp.com/diagrams", {
                                email: email,
                                mainSegment: diagrams.mainSegment,
                                anotherSegments: diagrams.anotherSegments.splice(0, countParts)
                            }).catch(e =>  console.log(e))

                            dispatch({
                                type: ADD_COLORGRAM,
                                payload: {
                                    mainSegment: diagrams.mainSegment,
                                    anotherSegments: diagrams.anotherSegments.splice(0, countParts)
                                }
                            })
                            dispatch({
                                type: LOAD_DEFAULT_DIAG
                            })
                        }
                    }
                ]
            )
        }
        else {
            Alert.alert(
                "Ошибка",
                "Не все сегменты цветограммы были заполнены"
            )
        }
    }

    function whichColorRender () {
        if (diagrams.mainSegment.color === "#ffffff") return "white"
        else return diagrams.mainSegment.color
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}></View>
            <Animatable.View 
                style={[styles.footer, { 
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                 <View style={[styles.circle, {
                        backgroundColor: whichColorRender(),
                        zIndex: 100
                        }]}
                    >
                        <TouchableOpacity
                        onPress={() => 
                            // if ()
                            setIsMainModalVisible(!isMainModalVisible)
                        }
                        >
                            <Text style={[styles.circleText,{
                                color: textColor
                            }]}>Моё сегодняшнее "Я"</Text>
                        </TouchableOpacity>
                        
                    </View>
                <Svg
                height="300"
                width="300"
                viewBox="-1 -1 2 2"
                style={{ 
                    transform: [{ rotate: '-90deg' }],
                    top: -100,
                    position: "relative",
                    backgroundColor: colors.background
                }}>
                        {slice()}
                </Svg> 
               
            <View style={{ flexDirection: 'row', padding: 15, top: -100}}>
                <TouchableOpacity 
                    style={[styles.button, {
                        borderColor: "#009387",
                        borderWidth: 1
                    }]}
                    onPress={() => {
                        if(countParts >= 16) isCountParts(16)
                        else isCountParts(countParts + 2)
                    }}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <Text style={[styles.buttonText, { width: 50, textAlign: 'center'}]}>{countParts}</Text>
                <TouchableOpacity 
                    style={[styles.button, {
                        alignSelf:"center",
                        borderColor: "#009387",
                        borderWidth: 1,
                    }]}
                    onPress={() => {
                        if(countParts <= 4) isCountParts(4)
                        else isCountParts(countParts - 2)
                    }}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <Modal
                style={styles.centeredView}
                animationType="fade"
                transparent={true}
                visible={isMainModalVisible}
                onRequestClose={() => setIsMainModalVisible(!isMainModalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ModalMainSegment 
                            isModalOpen={isMainModalVisible} 
                            setIsModalOpen={setIsMainModalVisible}  
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                style={styles.centeredView}
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                       <ModalAddingProps 
                        closeModal={setIsModalVisible} 
                        sectionData={sectionsData} 
                        setSectionData={setSectionData} 
                        activeSection={activeSection} 
                        setActiveSection={setActiveSection}
                    />
                    </View>
                </View>
            </Modal>
                <TouchableOpacity style={[styles.signIn, {
                    borderColor: "#009387",
                    borderWidth: 1,
                    marginTop: 15,
                    top: -100
                }]}
                onPress={() => confirmHandler()}
                >
                    <Text style={[styles.textSign, { color: "#009387"}]}>
                        Подтвердить
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
              
        </View>
    )
}

export default Cologram

