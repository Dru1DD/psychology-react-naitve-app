import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import HsvColorPicker from "react-native-hsv-color-picker";
import {
  ADD_CENTER_SEGMENT,
  CHANGE_TEXT_COLOR,
  CHANGE_FIRST_DIAG_SEGMENT,
} from "./redux/action/types";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  comments: {
    fontSize: "normal",
    fontSize: 19,
    lineHeight: 26,
    fontFamily: "Roboto",
    fontWeight: "normal",
    textAlign: "center"
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
    width: "100%",
    backgroundColor: "#9CA3AF",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    fontFamily: "Roboto",
  },
  list: {
    width: "100%",
    marginTop: 10,
  },
  gradient: {
    height: 50,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
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
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  button: {
    width: 304,
    height: 47,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    alignSelf:"center"
  },
  shades: {
    width: 240,
    height: 30,
    borderRadius: 10
  }
});

const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;

const ModalMainSegment = ({
  isModalOpen,
  setIsModalOpen,
  isModalFill,
  setIsModalFill,
}) => {
  const dispatch = useDispatch();
  const { mainSegment } = useSelector((state) => state.diagrams);
  const name = useSelector((state) => state.username);

  const [activePage, setActivePage] = useState(1);
  const [color, setColor] = useState(mainSegment.color);
  const [problemName, setProblemName] = useState("");
  const [shades, setShades] = useState([]);

  const colorRef = useRef();

  const [hsvData, setHsvData] = useState({
    hue: 0,
    sat: 0,
    val: 1,
  });

  const onSatValPickerChange = ({ saturation, value }) => {
    setHsvData({
      ...hsvData,
      sat: saturation,
      val: value,
    });
  };

  const onHuePickerChange = ({ hue }) => {
    setHsvData({ ...hsvData, hue: hue });
  };

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
    "#FFFF00",
  ];
// Генератор оттенков
  function generateColorShades(color) {
    let r1 = parseInt(color.slice(1, 3), 16);
    let g1 = parseInt(color.slice(3, 5), 16);
    let b1 = parseInt(color.slice(5, 7), 16);

    let hash = [];

    for (let i = 1; i < 11; i++) {
      let newR = Math.round(r1 + (255 - r1) * (i / 11));
      let newG = Math.round(g1 + (255 - g1) * (i / 11));
      let newB = Math.round(b1 + (255 - b1) * (i / 11));

      let newColor =
        "#" + newR.toString(16) + newG.toString(16) + newB.toString(16);
      hash.push(newColor);
    }
    setShades(hash);
  }
  // Подтверждение заполнености центрального круга

  const confirmHandler = () => {
    dispatch({
      type: ADD_CENTER_SEGMENT,
      payload: {
        mainSegment: {
          color: color,
          problem: problemName
        },
      },
    });

    let g1 = parseInt(color.slice(3, 5), 16);
    let b1 = parseInt(color.slice(5, 7), 16);
    if (g1 <= 100 || b1 <= 100) {
      dispatch({
        type: CHANGE_TEXT_COLOR,
        payload: {
          textColor: "white",
        },
      });
    } else {
      dispatch({
        type: CHANGE_TEXT_COLOR,
        payload: {
          textColor: "black",
        },
      });
    }

    dispatch({
      type: CHANGE_FIRST_DIAG_SEGMENT,
      payload: {
        anotherSegments: {
          catagory: "",
          problem: "",
          emotion: "",
          color: "",
        },
        color: color,
        problem: problemName
      },
    });
    setIsModalFill(!isModalFill);
    setIsModalOpen(!isModalOpen);
   
  };
// Этапы заполнения центрального круга
  const pageRenderHandler = () => {
    if (activePage === 1) {
      return (
        <View>
          <View>
            <Text style={styles.comments}>
              {name}, введите проблему из вашей жизни с которой вы боритесь
            </Text>
          </View>
          <View style={styles.line} />
          <View style={{
            borderRadius: 8,
            marginBottom: 5,
          }}>
            <View style={styles.action}>
              <TextInput
                placeholder="Введите проблему                 "
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setProblemName(val)}
              />
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  marginBottom: 10,
                  justifyContent: "center",
                  backgroundColor: "red"
                },
              ]}
              onPress={() => setActivePage(activePage + 1)}
            >
              <Text style={{
                fontStyle:"normal",
                fontWeight: "500",
                fontSize: 18,
                lineHeight: 21,
                color: "white"
              }}>Подтвердить</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (activePage === 2) {
      return (
          <View>
            <View>
              <Text style={styles.comments}>
                {name}, каким цветом вы бы изобразили собственное "Я" или своё
                нынешнее состояние? Пожалуйста, закрасьте этим цветом
                центральный круг вашей цветограммы
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
                  <Text style={{
                    color: "white",
                    fontSize: 18,
                    textAlign: "center",
                    textAlignVertical: "center"
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
            <Collapse
              style={{
                marginBottom: 10,
              }}
            >
              <CollapseHeader>
                <View style={styles.collapseHeader}>
                  <Text style={{
                    color: "white",
                    fontSize: 18,
                    textAlign: "center",
                    textAlignVertical: "center"
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
                  style={styles.collapseHeader}
                  onPress={() => {
                    const customColor = colorRef.current.getCurrentColor();
                    setColor(customColor);
                    setActivePage(activePage + 1);
                    generateColorShades(customColor);
                  }}
                >
                  <Text 
                    style={{
                      fontStyle:"normal",
                      fontWeight: "500",
                      fontSize: 18,
                      lineHeight: 21,
                      color: "white",
                      textAlignVertical: "center",
                      textAlign: "center"
                    }}
                  >Выбрать</Text>

                </TouchableOpacity>
              </CollapseBody>
            </Collapse>
          </View>
        );
    } else if (activePage === 3) {
return (
          <View>
            <View>
              <Text style={styles.comments}>{name}, теперь выберите оттенок этого цвета</Text>
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
          </View>
        );
    } else if (activePage === 4) {
        return (
          <View>
            <View>
              <Text style={styles.comments}>{name}, проверьте ещё раз цвет, который Вы выбрали</Text>
            </View>
            <View style={styles.line}></View>
            <View>
              <View
                style={{
                  margin: 5,
                  flexDirection: "column",
                  alignSelf: "center"
                }}
              >
                <Text style={{
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: 19,
                  lineHeight: 26,
                  textAlign: "center"
                }}>Вы выбрали цвет: </Text>
                <Text
                  style={[
                    {
                      backgroundColor: color,
                      margin: 5,
                      width: 304,
                      height: 47,
                      borderRadius: 15
                    },
                  ]}
                />
              </View>
              <View style={styles.line} />
              <View style={{ flexDirection: "column", alignSelf:"center" }}>
                <TouchableOpacity
                  style={{
                    width: 304,
                    height: 47,
                    backgroundColor: "red",
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    setActivePage(1);
                  }}
                >
                  <View style={{alignItems:"center"}}>
                    <Text style={{
                      height: "100%",
                      color: "white",
                      fontStyle: "normal",
                      fontSize: 18,
                      lineHeight: 21,
                      fontWeight: "500",
                      textAlign: "center",
                      textAlignVertical: "center"
                    }}>Изменить</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 304,
                    height: 47,
                    backgroundColor: "red",
                    borderRadius: 15,
                    marginTop: 10
                  }}
                  onPress={() => {
                    confirmHandler();
                  }}
                >
                  <Text
                    style={{
                      height: "100%",
                      color: "white",
                      fontStyle: "normal",
                      fontSize: 18,
                      lineHeight: 21,
                      fontWeight: "500",
                      textAlign: "center",
                      textAlignVertical: "center"
                    }}
                  >Подтвердить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  return <View>{pageRenderHandler()}</View>;
};

export default ModalMainSegment;
