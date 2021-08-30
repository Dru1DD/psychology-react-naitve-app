import React, { useMemo } from 'react'
import { Text, ScrollView } from 'react-native'

const ModalListRendered = ({ dataList, setEmotion, setActivePage, activePage }) => {

    const renderList = useMemo(() => {
        dataList.map(item =>(
            <Text
                style={{
                    margin: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 1
                    },
                    shadowOpacity: 0.10,
                    shadowRadius: 1,
                    elevation: 2
                }}
                key={() => Math.random().toString(32).substring(2)}
                onPress={() => {
                    setEmotion(item)
                    setActivePage(activePage + 1)
                }}
            >
                {item}
            </Text>
        ) ) 
    }, [dataList])
    return (
        <ScrollView>
            {renderList}
        </ScrollView>
    )
}

export default ModalListRendered