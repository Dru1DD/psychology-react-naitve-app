import React, { useState, useRef, useEffect, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
} from "react-native";

// Icons
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Window Screen Size
const windowWidth = Math.round(Dimensions.get("window").width);
const windowHeight = Math.round(Dimensions.get("window").height);

const ModalColorCorrectionModule = ({
  bcolor,
  colorsForFigures,
  animSpeed,
  setOpenModule,
}) => {
  const figureScale = useRef(new Animated.Value(1)).current;
  const [data, setData] = useState({
    figurePage: 0,
    backColor: colorsForFigures[0],
    mainColor: colorsForFigures[1],
    currentColorIndex: 0,
  });
  const [isPaused, setIsPaused] = useState(false);
  // Таймер на 20 минут или 1200000 мс
  const [timeDelay, setTimeDelay] = useState(1200000)
  let { figurePage, currentColorIndex } = data;
// Используется для контроля показа фигур( Можно не менять)
  const figureStyles = useMemo(() => {
    const { figurePage } = data;
    let res = {};
    if (figurePage === 0) {
      res = styles.circle;
    } else if (figurePage === 1) {
      res = styles.triangle;
    } else if (figurePage === 2) {
      res = styles.box;
    } else if (figurePage === 3) {
      res = styles.rhombus;
    }
    return res;
  }, [data.figurePage]);

  function renderBoard() {
    const { figurePage, backColor, mainColor } = data;
    let list = [];
    for (let i = 0; i < windowWidth + 100; i = i + 50) {
      for (let j = 0; j < windowHeight; j = j + 50) {
        list.push("+");
      }
    }

    return list.map((item, index) => {
      if (index % 2 !== 0) {
        if (index === 59) {
          return (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
              }}
              key={index}
            >
              <View
                style={[
                  figureStyles,
                  figurePage === 1
                    ? { borderBottomColor: mainColor }
                    : { backgroundColor: mainColor },
                ]}
              />
            </View>
          );
        }
        return (
          <View
            style={{
              width: 50,
              height: 50,
            }}
            key={index}
          ></View>
        );
      }
      if (
        index === 60 ||
        index === 58 ||
        index === 52 ||
        index === 66 ||
        index === 59
      ) {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
            }}
            key={index}
          >
            <View
              style={[
                figureStyles,
                figurePage === 1
                  ? { borderBottomColor: mainColor }
                  : { backgroundColor: mainColor },
              ]}
            />
          </View>
        );
      }
      return (
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: bcolor,
            justifyContent: "center",
          }}
          key={index}
        >
          <View
            style={[
              figureStyles,
              figurePage === 1
                ? { borderBottomColor: backColor }
                : { backgroundColor: backColor },
            ]}
          />
        </View>
      );
    });
  }

  // Сама анимация
  const anim = useMemo(() => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(figureScale, {
          toValue: 2,
          duration: animSpeed,
          useNativeDriver: true,
        }),
        Animated.timing(figureScale, {
          toValue: 1,
          duration: animSpeed,
          useNativeDriver: true,
        }),
      ])
    );
  }, [figureScale]);

  // Контроль паузы
  useEffect(() => {
      if (isPaused === false) {
        console.log(`Is not paused: ${isPaused}`)
        Animated.loop(
          Animated.sequence([
            Animated.timing(figureScale, {
              toValue: 2,
              duration: animSpeed,
              useNativeDriver: true,
            }),
            Animated.timing(figureScale, {
              toValue: 1,
              duration: animSpeed,
              useNativeDriver: true,
            }),
          ])
        ).start()
      } else if (isPaused === true) {
        console.log(`Is on paused: ${isPaused}`)
        anim.stop()
      }         
    }, [anim, isPaused]);

    // Основное изменение анимации (Фигур, цветов, изменение таймера)
  useEffect(() => {
    if (isPaused === false) {
      setTimeout(() => {
        if (figurePage === 3) {
          if (currentColorIndex === colorsForFigures.length - 1) {
            let index = currentColorIndex;
            setData({
              ...data,
              mainColor: colorsForFigures[index + 1],
              backColor: colorsForFigures[index],
              currentColorIndex: 0,
              figurePage: 0,
            });
          } else {
            let index = currentColorIndex;
            setData({
              ...data,
              mainColor:
                index + 1 === colorsForFigures.length
                  ? colorsForFigures[0]
                  : colorsForFigures[index + 1],
              backColor: colorsForFigures[index],
              currentColorIndex:
                index + 1 === colorsForFigures.length ? 0 : index + 1,
              figurePage: 0,
            });
          }
        } else if (currentColorIndex === colorsForFigures.length - 1) {
          let index = currentColorIndex;
          setData({
            ...data,
            mainColor:
              index + 1 === colorsForFigures.length
                ? colorsForFigures[0]
                : colorsForFigures[index + 1],
            backColor: colorsForFigures[index],
            currentColorIndex: 0,
            figurePage: figurePage + 1,
          });
        } else {
          let index = currentColorIndex;
          setData({
            ...data,
            mainColor:
              index + 1 === colorsForFigures.length
                ? colorsForFigures[0]
                : colorsForFigures[index + 1],
            backColor: colorsForFigures[index],
            currentColorIndex:
              index + 1 === colorsForFigures.length ? 0 : index + 1,
            figurePage: figurePage + 1,
          });

          let timeValue = timeDelay
          setTimeDelay(timeValue - animSpeed * 2)
          if (timeDelay <= 0) {
            setIsPaused(!isPaused);
            Alert.alert("Успех", "Модуль цветокорекции пройден", [
              {
                text: "Отлично",
                onPress: () => setOpenModule(false),
              },
            ]);
          }
        }
      }, animSpeed * 2);
    }
  }, [isPaused, currentColorIndex, figurePage, currentColorIndex]);

  return (
    <View style={[styles.container, { backgroundColor: bcolor }]}>
      <StatusBar />
      <TouchableOpacity
        onPress={() => {
          setIsPaused(!isPaused);
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            top: -25,
            height: "100%",
            width: "100%",
            marginLeft: 25,
            transform: [{ scale: figureScale }],
          }}
        >
          {renderBoard()}
        </Animated.View>
        {isPaused ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isPaused}
            onRequestClose={() => setIsPaused(!isPaused)}
            deviceWidth={windowWidth}
            deviceHeight={windowWidth}
            style={{
              width: "100%",
              height: "100%"
            }}
            >
            <Animated.View
              animation="fadeInUpBig"
              style={{
                width: 110,
                height: 50,
                marginTop: "auto",
                alignSelf: "flex-end",
                borderWidth: 1,
                backgroundColor: "white",
                transform: [{rotate: "90deg"}],
                marginBottom: 30,
              }}
            >
              <View style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-end"
                }}>
                <AntDesign
                  name="pausecircle"
                  size={42}
                  color="black"
                  onPress={() => setIsPaused(!isPaused)}
                />
                <FontAwesome
                  name="close"
                  size={45}
                  color="black"
                  onPress={() => setOpenModule(false)}
                />
              </View>
              
            </Animated.View>
          </Modal>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "90deg" }],
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 90 / 2,
  },
  box: {
    width: 50,
    height: 50,
  },
  rhombus: {
    width: 40,
    height: 40,
    transform: [{ rotate: "45deg" }],
  },
});

export default ModalColorCorrectionModule;
