import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Modal, Alert } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'

import ModalAddingProps  from '../components/ModalAddingProps'
import { useTheme } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { ADD_COLORGRAM } from '../components/redux/action/types'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
    }
})

function Item() {
    const [countParts, isCountParts] = useState(4)
    const [isModalVisible, setIsModalVisible] = useState(false)
    // const [isChangable, setIsChangable] = useState(false)

    const { colors } = useTheme()
    const [activeSection, setActiveSection] = useState(0)
    const [sectionsData, setSectionData] = useState([])
    
    // Redux useSelector & useDispatch
    const diagrams = useSelector(state => state.diagrams)
    const dispatch = useDispatch()

    function whichColorRender (index) {
        if ( diagrams.length == 0 ) return 'grey'
        else return diagrams[index].color
    }
    function slice() {
        let slices = [];
        const numberOfSlice = countParts;
        for (let i = 0; i < numberOfSlice; i++) {
            slices.push({ percent: 1 / numberOfSlice, color: "grey" });
        }

        let cumulativePercent = 0;

        function getCoordinatesForPercent(percent) {
            const x = Math.cos(2 * Math.PI * percent);
            const y = Math.sin(2 * Math.PI * percent);
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
            return <Path d={pathData} fill={whichColorRender(index)} key={pathData} onPress={() => { 
                setIsModalVisible(true) 
                setActiveSection(index)
            }} 
            style={{borderWidth: 1, borderColor: "black"}}
            />;
        });
        return arr;
    }

    function confirmHandler() {
        let finishedSegments = countParts
        for ( let i = 0; i < countParts; i++ ) {
            if (diagrams[i].catagory === "" &&
                diagrams[i].problem === "" &&
                diagrams[i].emotion === "" &&
                diagrams[i].color === ""
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
                        onPress: () => {
                            dispatch({
                                type: ADD_COLORGRAM,
                                payload: {
                                    countOfParts: countParts,
                                    diagrama: diagrams.splice(0, countParts)
                                }
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
        // Для того, чтобы проверить весь кргу, нам нужно знать количество кусочков,
        // Дальше проходимся по массиву diagrams, которая вмещает в себя все 16 частей круга
        // Цикл продолжает до n числа( Это количество кусочков ). 
        // 
        //
        //
    }

    //   39 размер ноги
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
                <Svg
                height="350"
                width="350"
                viewBox="-1 -1 2 2"
                style={{ transform: [{ rotate: '-90deg' }] }}>
                    {slice()}
            </Svg>  
            
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => {
                    if(countParts >= 16) isCountParts(16)
                    else isCountParts(countParts + 2)
                }}>
                    <Text style={[styles.button, {
                        borderColor: "#009387",
                        borderWidth: 1
                    }]}>+</Text>
                </TouchableOpacity>
                <Text style={{ width: 50, color: 'black', justifyContent: "center" }}>{countParts}</Text>
                <TouchableOpacity onPress={() => {
                    if(countParts <= 4) isCountParts(4)
                    else isCountParts(countParts - 2)
                }}>
                    <Text style={[styles.button, {
                        alignSelf:"center",
                        borderColor: "#009387",
                        borderWidth: 1
                    }]}>-</Text>
                </TouchableOpacity>
            </View>
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
                    marginTop: 15
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

export default Item

