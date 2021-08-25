import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Animatable from 'react-native-animatable'
import Svg, { Path } from 'react-native-svg'
import { List } from 'react-native-paper'

import { useSelector } from 'react-redux'

const AnalizeColorgram = () => {

    // const { colors } = useTheme()

    const listOfDiagrams = useSelector(state => state.listOfDiagrams)
    
    function slice(item) {
        let slices = [];
        const numberOfSlice = item.countOfParts;
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
            return <Path d={pathData} fill={item.diagrama[index].color} key={pathData} />;
        });
        return arr;
    }

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

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.header}></View>
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            >
                {
                    listOfDiagrams.length === 0 ?
                     <Text style={styles.centeredView}>Не создано ни одной цветограмы</Text>
                     : listOfDiagrams.map((item, index) => {
                    return (
                        <List.Section
                            key={index}
                            style={styles.accordion}
                            title={`Цветограмм №${index + 1}`}    
                        >
                            <List.Accordion title="Проблемные сектора">
                                {
                                    item.diagrama.slice(0, item.diagrama.length / 2)
                                    .map((elem, i) =>{
                                        let arr = []
                                        let oppositeSector = i + (item.countOfParts / 2)
                                        let colors = isOppositeColor(elem.color, item.diagrama[oppositeSector].color)
                                        if( colors ) arr.push(item.diagrama[oppositeSector])

                                        return arr.map((list, count) => (
                                            <List.Item key={count} title={list.emotion} />
                                        ))
                                    })
                                }
                            </List.Accordion>
                            <List.Accordion title="Цветограм">
                                {/* <List.Item title> */}
                                    <Svg
                                        height="350"
                                        width="350"
                                        viewBox="-1 -1 2 2"
                                        style={{ transform: [{rotate: '-90deg'}]}}
                                    >{slice(item)}</Svg>
                                {/* </List.Item> */}
                            </List.Accordion>
                        </List.Section>
                    )
                })
                }
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
        alignItems: 'center'
    },
    accordion: {
        width: '100%'
    }
})

export default AnalizeColorgram