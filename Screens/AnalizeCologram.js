import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
// import Svg, { Path } from 'react-native-svg'
import LottieView from 'lottie-react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import { Line } from '../components/styled'

import { useSelector } from 'react-redux'

import axios from 'axios'

const AnalizeColorgram = () => {

    const [ isModalOpen, setIsModalOpen ] = useState(null)

    const email = useSelector(state => state.email)

    useEffect(() => {
        const _fecthindData = async () => {
            const lists = await axios.get("https://agile-thicket-06723.herokuapp.com/diagram", {
                email
            }) .catch(e => console.log(e))
        } 

        _fecthindData()
    }, []) 

    let listOfDiagrams = useSelector(state => state.listOfDiagrams)

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

    function renderProblemSectors(item, index) {
      let arr = [];
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
        if(arr.length === 0) {
            return (
                <Text>
                    Не было найдено проблемных секторов
                </Text>
            )
        } else if ( arr.length !== 0) {
            return arr.map((list, count) => {
                return (
                    <View key={count} style={{justifyContent: "center", alignItems: "center"}}>
                        <View style={[styles.listItem, {
                            flexDirection: "column",
                        }]}>
                            <Text>Категория: {list.catagory}</Text>
                            <Text>Проблема: {list.problem}</Text>
                            <Text>Эмоция: {list.emotion}</Text>
                        </View>
                        <View style={styles.listItem}>
                            <Text>Категория: {item.anotherSegments[index].catagory}</Text>
                            <Text>Проблема: {item.anotherSegments[index].problem}</Text>
                            <Text>Эмоция: {item.anotherSegments[index].emotion}</Text>
                        </View>
                    </View>
                    
                    );
                }
            )
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}></View>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                    <ScrollView style={{height: 500, width: "80%"}}>
                        {
                             listOfDiagrams ?
                                listOfDiagrams.length !== 0 ? 
                                    listOfDiagrams.map((item, index) => {
                                        return (
                                            <View key={index} style={{marginBottom: 10}}>
                                                <View>
                                                    <Text>Цветограмм № {index + 1}</Text>
                                                </View>
                                                <Collapse>
                                                    <CollapseHeader style={[{
                                                            marginTop: 10,
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }, styles.collapseHeader]}>
                                                            <View
                                                                style={{
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <Text>Проблемные сектора</Text>
                                                            </View>
                                                    </CollapseHeader>
                                                    <CollapseBody>
                                                        {renderProblemSectors(item, index)}
                                                    </CollapseBody>
                                                </Collapse>
                                                <Line />
                                            </View>
                                        )
                                    })
                                : <Text style={styles.centeredView}>Не создано ни одной цветограмы</Text>
                            : null
                            }
                    </ScrollView>
                    <TouchableOpacity style={[styles.loadAnim, {
                        borderColor: "#009387",
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                        onPress={() => setIsModalOpen(!isModalOpen)}
                    >
                        <Text style={[styles.textLoad, { color: "#009387"}]}>
                            Загрузить цветокоректирующийся модуль
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.loadAnim, {
                        borderColor: "#009387",
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                    onPress={() => console.log("Data was saved")}>
                        <Text style={[styles.textLoad, { color: "#009387"}]}>
                            Сохранить
                        </Text>
                    </TouchableOpacity> */}
                    <Modal
                        style={styles.centeredView}
                        animationType="fade"
                        transparent={true}
                        visible={isModalOpen}
                        onRequestClose={() => {
                            setIsModalOpen(!isModalOpen)
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <LottieView
                                source={require("../assets/73806-preloader-animation.json")}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                autoPlay
                            />
                            </View>
                        </View>
                    </Modal>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387"
    },
    header: {
        flex: 1,
        justifyContent: "center",
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
    }
})

export default AnalizeColorgram