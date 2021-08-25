import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native'
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';

//Styled Components
import { Line, SubTitle } from './styled'
//icons
import { Ionicons } from '@expo/vector-icons';
import { ADD_SEGMENT_CHARACTERISTICS } from './redux/action/types';

//Redux action type

const styles = StyleSheet.create({
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


const ModalAddingProps = ({ closeModal, activeSection, setActiveSection }) => {
    const [activePage, setActivePage] = useState(0)
    const [category, setCategory] = useState(null)
    const [problem, setProblem] = useState(null)
    const [emotion, setEmotion] = useState(null)
    const [color, setColor] = useState(null)
    
    const dispatch = useDispatch()

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
                <Text style={styles.textBox}  >
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Введите категорию"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setCategory(val)}
                    />
                    </View>
                </Text>
            )
        } else if (activePage === 1) {
             return (
                <Text style={styles.textBox}  >
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Введите проблему"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setProblem(val)}
                    />
                    </View>
                </Text>
            )
        } else if (activePage === 2) {
            return emotions.map((item, index) => {
                return (
                <ScrollView>
                    <List.Section key={index} title={item.title}>
                          <List.Accordion>
                            {item.items.map((elem, i) => (
                                <List.Item style={styles.textBox} title={elem} key={i} onPress={() => {
                                    setEmotion(elem)
                                    setActivePage(activePage + 1)
                                }}/>
                            ))}
                        </List.Accordion>  
                    </List.Section>
                    </ScrollView>
                )
            })
        } else if (activePage === 3) {
            return colors.map((item, index) => (
                <Text style={[styles.textBox, {
                    backgroundColor: item
                }]} key={index} onPress={() => {
                    setColor(item)
                    setActivePage(activePage + 1)
                }}></Text>
            ))
        }
    }

    function lastPageConfirm() {
        return (
            <View style={styles.lastPage}>
                <SubTitle>Подтвердить</SubTitle>
                <Text>Категория: {category}</Text>
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
                                        category: category,
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