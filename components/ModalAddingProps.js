import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import { v4 as uuidv4 } from 'uuid'

import ColorPicker from './ColorPicker'

//Styled Components
import { Line, SubTitle } from './styled'

//icons
import { Ionicons } from '@expo/vector-icons';

//Redux 
import { ADD_SEGMENT_CHARACTERISTICS } from './redux/action/types';
import { useDispatch, useSelector } from 'react-redux';



const styles = StyleSheet.create({
    comments: {
        width: '100%',
        borderColor: 'red'
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
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1,

        elevation: 2,
    },
    collapseHeader: {
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center'
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
        paddingBottom: 5
    }
})

const ModalAddingProps = ({ closeModal, activeSection, setActiveSection, isMainSegmentField }) => {

    const diagrams = useSelector(state => state.diagrams)
    const name = useSelector(state =>  state.username)
    const dispatch = useDispatch()

    const [activePage, setActivePage] = useState(0)
    const [catagory, setCatagory] = useState(diagrams.anotherSegments[activeSection].catagory)
    const [problem, setProblem] = useState(diagrams.anotherSegments[activeSection].problem)
    const [emotion, setEmotion] = useState(diagrams.anotherSegments[activeSection].emotion)
    const [color, setColor] = useState(diagrams.anotherSegments[activeSection].color)

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

    function pageHandler() {
        if (activePage === 0) {
            return (
                <>
                    <View style={styles.comments}>
                        <Text>{name}, пожалуйста, напишите ту сферу вашей жизни, которая вызывает наибольшее беспокойство. Далее введите наиболее близкую вам проблему из этой сферы, выберите её цвет и определите эмоцию, которую эту проблема заставляет переживать вас</Text>
                    </View>
                    <View style={styles.line}></View>
                  <Text style={styles.textBox}  >
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Введите категорию"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setCatagory(val)}
                    />
                    </View>
                </Text>  
                </>
                
            )
        } else if (activePage === 1) {
             return (
                <>
                    <View style={styles.comments}>
                        <Text>{name}, введите наиболее близкую вам проблему, характерную для этой сферы жизни.
                        Неторопитесь! Введите то, что действительно важно для вас
                        </Text>
                    </View>
                    <View style={styles.line}></View>
                    <Text style={[styles.textBox, {
                        alignItems: 'center'
                    }]}  >
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Введите проблему"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setProblem(val)}
                    />
                    </View>
                </Text>
                </>
                
            )
        } else if (activePage === 2) {
            return <>
                    <View style={styles.comments}>
                        <Text>{name}, определите эмоцию, которую эту проблема переживать вас. Вспомните, что вы чувствуете, когда думаете об этой проблеме…</Text>
                    </View>
                    <View style={styles.line}></View>
                    {
                        emotions.map((elem, index) => {
                            return (
                                <Collapse key={index} style={{marginBottom: 10}}>
                                    <CollapseHeader>
                                        <View style={styles.collapseHeader}>
                                            <Text>{elem.title}</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <SafeAreaView style={{height: 200}}>
                                            <ScrollView>
                                                {
                                                    elem.items.map(item => (
                                                        <>
                                                            <Text 
                                                                style={styles.textBox}
                                                                key={() => Math.random().toString(32) + uuidv4()}
                                                                onPress={() => {
                                                                    setEmotion(item)
                                                                    setActivePage(activePage + 1)
                                                                }}
                                                                >
                                                                    {item}
                                                                </Text>
                                                        </>
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
                    <View style={styles.comments}>
                        <Text>{name}, У каждого человека своё понимание и представление о счастье. Что для вас счастье? Выберете пиктограмму, которая наиболее точно соответствует вашему представлению о счастье…</Text>
                    </View>
                    <View style={styles.line}></View>
                    <Collapse style={{
                        marginBottom: 10
                    }}>
                        <CollapseHeader>
                            <View style={styles.collapseHeader}>
                                <Text>Основные цвета</Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            {
                                 colors.map((item, index) => (
                                    <Text style={[styles.textBox, {
                                            backgroundColor: item
                                        }]} 
                                        key={index} 
                                        onPress={() => {
                                            setColor(item)
                                            setActivePage(activePage + 1)
                                        }}
                                    ></Text>
                                ))
                            }
                        </CollapseBody>
                    </Collapse>
                    <Collapse style={{
                        marginBottom: 10
                    }}>
                            <CollapseHeader>
                                <View style={styles.collapseHeader}>
                                    <Text>Кастомный цвет</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <ColorPicker />
                            </CollapseBody>
                    </Collapse>
                </>
               
            )
        }
    }

    function lastPageConfirm() {
        return (
            <View style={styles.lastPage}>
                <SubTitle>Подтвердить</SubTitle>
                <Text>Категория: {catagory}</Text>
                <Text>Проблема: {problem}</Text>
                <Text>Эмоция: {emotion}</Text>
                <Text>Цвет: <Text style={{width: 50, backgroundColor: color}}></Text></Text>
            </View>
        )
    }

    return (
        <View>
            {
                activePage !== 4 ?
                    <View style={styles.header}>
                        <Text style={activePage === 0 ? [styles.tag, styles.activeTag] : styles.tag}>Категория</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 1 ? [styles.tag, styles.activeTag] : styles.tag}>Проблема</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 2 ? [styles.tag, styles.activeTag] : styles.tag}>Эмоция</Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        <Text style={activePage === 3 ? [styles.tag, styles.activeTag] : styles.tag}>Цвет</Text>
                    </View>
                    :
                    lastPageConfirm()
            }

            <Line />
            <View style={styles.mainContent}>
                {pageHandler()}
                {
                    activePage === 4 ?
                        <Button
                            title="Подтвердить"
                            onPress={() => {
                                dispatch({
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
                        />
                        :
                        <Button
                            title="Далее"
                            onPress={() => setActivePage(activePage + 1)}
                        />
                }

            </View>
        </View>

    )
}

export default ModalAddingProps