import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Modal, Alert, Image } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'

import ModalAddingProps  from '../components/ModalAddingProps'
import { useTheme } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import ModalMainSegment from '../components/ModalMainSegment'

import { EvilIcons } from '@expo/vector-icons';
import ModalSubmitCologram from '../components/ModalSubmitCologram'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flex: 1,
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
        backgroundColor: "red",
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
        width: 220,
        height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20
    },
    textSign: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        width: 121,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF5441",
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
    title: {
      width: 173,
      height: 33,
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: 24,
      lineHeight: 33,
      color: "#000000",
    }, 
    styledButton:{
      width: 220,
    height: 59,
    marginTop: 20,
    backgroundColor: "red",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    },
    styledText: {
      width: "100%",
      fontSize: 16,
      textAlign: "center",
      textAlignVertical: "center",
      color: "white"
    }
})

function Cologram({ navigation }) {

    //LocalState
    const [countParts, isCountParts] = useState(4)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isMainModalVisible, setIsMainModalVisible] = useState(false)
    const [isMainModalFill, setIsMainModalFill] = useState(false)
    const [isErrorModaOpen, setIsErrorModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const { colors } = useTheme()
    const [activeSection, setActiveSection] = useState(0)
    const [sectionsData, setSectionData] = useState([])
    
    // Redux useSelector & useDispatch
    const diagrams = useSelector(state => state.diagrams)
    const textColor = useSelector(state => state.textColor)

    // Функция отвеяающая за положения текста на секторах ( Возможно есть другой и попроще способ, но я решил захардкорить)
    function whichParametrsForText (index) {
        if(countParts === 4) {
          if(index === 0) {
            return {
              left: 70,
              top: 340
            }
          } else if(index === 1) {
            return {
              top: 300,
              left: -70
            }
          } else if(index === 2) {
            return {
              top: 100,
              left: -70,
            }
          } else if(index === 3) {
            return {
              top: 50,
              left: 70
            }
          }
        } else if (countParts === 6) {
            if(index === 0) {
                return {
                  left: 90,
                  top: 300
                }
              } else if(index === 1) {
                return {
                  top: 320,
                  left: 0
                }
              } else if(index === 2) {
                return {
                  top: 220,
                  left: -90,
                }
              } else if(index === 3) {
                return {
                  top: 70,
                  left: -90
                }
            } else if(index === 4 ) {
                return {
                    top: 0,
                    left: 0
                }
            } else if(index === 5) {
                return {
                    top: 0,
                    left: 90
                }
            }
        } else if (countParts === 8) {
            if(index === 0) {
                return {
                    top: 300,
                    left: 90
                }
            } else if(index === 1) {
                return {
                    top: 320,
                    left: 40
                }
            } else if ( index === 2 ) {
                return {
                    top: 280,
                    left: -40
                }
            } else if (index === 3) {
                return {
                    top: 170,
                    left: -100
                }
            } else if ( index === 4) {
                return {
                    top: 50,
                    left: -100
                }
            } else if (index === 5) {
                return {
                    top: -40,
                    left: -30
                }
            } else if (index === 6) {
                return {
                    top: -90,
                    left: 30
                }
            } else if (index === 7) {
                return {
                    top: -80,
                    left: 90
                }
            }
        } else if (countParts === 10) {
            if(index === 0) {
                return {
                    top: 300,
                    left: 100
                }
            } else if (index === 1) {
                return {
                    top: 310,
                    left: 60
                }
            } else if (index === 2) {
                return {
                    top: 290,
                    left: 0
                }
            } else if (index === 3) {
                return {
                    top: 230,
                    left: -60
                }
            } else if (index === 4 ) {
                return {
                    top: 130,
                    left: -100
                }
            } else if (index === 5) {
                return {
                    top: 30,
                    left: -100
                }
            } else if (index === 6) {
                return {
                    top: -70,
                    left: -60
                }
            } else if (index === 7) {
                return {
                    top: -130,
                    left: 0
                }
            } else if (index === 8 ) {
                return {
                    top: -160,
                    left: 60
                }
            } else if (index === 9) {
                return {
                    top: -140,
                    left: 100
                }
            }
        } else if (countParts === 12) {
            if(index === 0) {
                return {
                    top: 290,
                    left: 100
                }
            } else if (index === 1) {
                return  {
                    top: 290,
                    left: 70
                }
            } else if (index === 2) {
                return {
                    top: 280,
                    left: 30
                }
            } else if (index === 3 ) {
                return {
                    top: 240,
                    left: -30
                }
            } else if (index === 4) {
                return {
                    top: 180,
                    left: -80
                }
            } else if (index === 5) {
                return {
                    top: 80,
                    left: -100
                }
            } else if (index === 6) {
                return {
                    top: -10,
                    left: -100
                }
            } else if (index === 7) {
                return {
                    top: -110,
                    left: -80
                }
            } else if (index === 8) {
                return {
                    top: -180,
                    left: -30
                }
            } else if (index === 9) {
                return {
                    top: -230,
                    left: 30
                }
            } else if (index === 10) {
                return {
                    top: -240,
                    left: 80
                }
            } else if (index === 11) {
                return {
                    top: -230,
                    left: 100
                }
            }
        } else if (countParts === 14 ) {
            if(index === 0) {
                return {
                  top: 290,
                  left: 100
                }
            } else if(index === 1) {
                return {
                    top: 290,
                    left: 90
                }
            } else if (index === 2) {
                return {
                    top: 280,
                    left: 50
                }
            } else if(index === 3 ) {
                return {
                    top: 250,
                    left: 0
                }
            } else if (index === 4 ){ 
                return {
                    top: 200,
                    left: -50
                }
            } else if (index === 5) {
                return {
                    top: 130,
                    left: -90
                }
            } else if (index === 6) {
                return {
                    top: 40,
                    left: -100
                }
            } else if (index === 7) {
                return {
                    top: -50,
                    left: -100
                }
            } else if  (index === 8) {
                return {
                    top: -140,
                    left: -90
                }
            } else if (index === 9 ) {
                return {
                    top: -210,
                    left: -50
                }
            } else if (index === 10) {
                return {
                    top: -260,
                    left: 0
                }
            } else if (index === 11) {
                return {
                    top: -290,
                    left: 50
                }
            } else if (index === 12) {
                return {
                    top: -310,
                    left: 90
                }
            } else if(index === 13) {
                return {
                    top: -310,
                    left: 100
                }
            }
        } else if (countParts === 16) {
            if(index === 0) {
                return {
                    top: 290,
                    left: 100
                }
            } else if (index === 1) {
                return {
                    top: 280,
                    left: 90
                }
            } else if (index === 2) {
                return {
                    top: 270,
                    left: 60
                }
            } else if (index === 3) {
                return {
                    top: 240,
                    left: 20
                }
            } else if (index === 4 ) {
                return {
                    top: 200,
                    left: -20
                }
            } else if (index === 5) {
                return {
                    top: 140,
                    left: -60
                }
            } else if (index === 6) {
                return {
                    top: 70,
                    left: -90
                }
            } else if (index === 7) {
                return {
                    top: -10,
                    left: -100
                }
            } else if (index === 8 ) {
                return {
                    top: -90,
                    left: -100
                }
            } else if (index === 9) {
                return {
                    top: -170,
                    left: -90
                }
            } else if (index === 10) {
                return {
                    top: -250,
                    left: -60
                }
            } else if(index === 11) {
                return {
                    top: -310,
                    left: -20
                }
            } else if(index === 12) {
                return {
                    top: -350,
                    left: 20
                }
            } else if (index === 13){
                return {
                    top: -380,
                    left: 60
                }
            } else if(index === 14) {
                return {
                    top: -390,
                    left: 90
                }
            } else if(index === 15) {
                return {
                    top: -390,
                    left: 100
                }
            }
        }
    }
    // Функиця отвечающая за текст на секторе в цветограмме
    function renderTextContext(index) {
        if(countParts === 4 || countParts === 6) {
            return (
                <>
                <EvilIcons name="pencil" size={16} color="black" />
                
                <Text style={{ fontSize: 12 }}>
                  {index + 1}. {diagrams.anotherSegments[index].catagory.slice(0, 4)}...
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {index + 1}.1 {diagrams.anotherSegments[index].problem.slice(0, 4)}...
                </Text>
                </>
            )
        } else {
            return (
                <>
                <EvilIcons name="pencil" size={16} color="black" />
                
                <Text style={{ fontSize: 12 }}>
                  {index + 1}. {diagrams.anotherSegments[index].catagory.slice(0, 1)}...
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {index + 1}.1 {diagrams.anotherSegments[index].problem.slice(0, 1)}...
                </Text>
                </>
            )
        }
    }
    // Функция отвечающая за разделения круга на сектора( Работал с SVG)
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
              <View key={(Math.random() + 1).toString(36).substring(7)}>
                <Path
                  d={pathData}
                  id="path"
                  fill={diagrams.anotherSegments[index].color}
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
                        diagrams.anotherSegments[index + 1].color === "#808080"
                      )
                        diagrams.anotherSegments[index + 1].color = "";
                    }
                  }}
                ></Path>
                <View
                  style={[
                    {
                      transform: [{ rotate: "90deg" }],
                    },
                    whichParametrsForText(index),
                  ]}
                >
                    {renderTextContext(index)}
                </View>
              </View>
            );
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
        if (isMainModalFill) {
          if (finishedSegments === countParts) {
            setIsSuccessModalOpen(!isSuccessModalOpen);
          } else {
            setIsErrorModalOpen(!isErrorModaOpen);
          }
        } else {
          setIsErrorModalOpen(!isErrorModaOpen);
        }
    }

    // Функция отвечающая за цвет текста на центральном круге
    function whichColorRender () {
        if (diagrams.mainSegment.color === "#ffffff") return "white"
        else return diagrams.mainSegment.color
    }
    
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} hidden={true} />
        <View style={styles.header}></View>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            }
          ]}
          animation="fadeInUpBig"
        >
          <View
            style={[
              styles.circle,
              {
                backgroundColor: whichColorRender(),
                zIndex: 100,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setIsMainModalVisible(!isMainModalVisible);
              }}
            >
              <Text
                style={[
                  styles.circleText,
                  {
                    color: textColor,
                  },
                ]}
              >
                Моё сегодняшнее "Я"
              </Text>
            </TouchableOpacity>
          </View>
          <Svg
            height="300"
            width="300"
            viewBox="-1 -1 2 2"
            style={{
              transform: [{ rotate: "-90deg" }],
              top: -100,
              position: "relative",
              backgroundColor: colors.background,
            }}
          >
            {slice()}
          </Svg>

          <View style={{ flexDirection: "row", padding: 15, top: -100 }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                if (countParts >= 16) isCountParts(16);
                else isCountParts(countParts + 2);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: 24,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonText}>
              <Text
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: 24,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >
                {countParts}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  alignSelf: "center",
                  borderColor: "#009387",
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                if (countParts <= 4) isCountParts(4);
                else isCountParts(countParts - 2);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: 24,
                }}
              >
                -
              </Text>
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
                  isModalFill={isMainModalFill}
                  setIsModalFill={setIsMainModalFill}
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
              setIsModalVisible(!isModalVisible);
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
          <Modal
            style={styles.centeredView}
            animationType="fade"
            transparent={true}
            visible={isSuccessModalOpen}
            onRequestClose={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ModalSubmitCologram 
                  setIsModalClose={setIsSuccessModalOpen}
                  isModalClose={isSuccessModalOpen}
                />
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
                top: -100,
              },
            ]}
            onPress={() => confirmHandler()}
          >
            <Text style={styles.textSign}>Подтвердить</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              marginTop: "auto",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                position: "absolute",
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
          <Modal
            style={styles.centeredView}
            animationType="fade"
            transparent={true}
            visible={isErrorModaOpen}
            onRequestClose={() => {
              setIsErrorModalOpen(!isErrorModaOpen);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={[styles.title, { width: "100%", alignSelf: "center" }]}
                >
                  Ошибка
                </Text>
                <Text
                  style={{ width: "100%", fontSize: 16, textAlign: "center" }}
                >
                  Не все поля были заполнены
                </Text>
                <TouchableOpacity
                  style={styles.styledButton}
                  onPress={() => setIsErrorModalOpen(!isErrorModaOpen)}
                >
                  <Text style={styles.styledText}>Вернуться</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Animatable.View>
      </View>
    );
}

export default Cologram

