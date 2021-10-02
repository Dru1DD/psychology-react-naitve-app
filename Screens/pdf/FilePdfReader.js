import React from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import Pdf from 'react-native-pdf';
import { Asset } from 'expo-asset'

const FilePdfReader = ({ navigation, route }) => {
    const { pdfFileName } = route.params
    let absolute_path = (function () {
        if(pdfFileName === "Schema") {
            return Asset.fromModule(require('../../assets/pdf/sxema.pdf')).uri
        } else if (pdfFileName === "Audit") {
            return Asset.fromModule(require('../../assets/pdf/audit.pdf')).uri
        } 
    })()
    // Загрузка пдф файлов и их открытие

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pdf
                    source={{
                      uri: absolute_path
                    }}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate("MainScreen")}    
                >
                   <Text style={styles.buttonText}>Вернуться</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        flex: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: "100%",
        height: 50,
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttonText: {
        color: "white",
        textAlign:"center",
        textAlignVertical: "center",
        fontSize: 16
    }
})

export default FilePdfReader