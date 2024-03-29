import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import HistoryItem from "./historyItem";

function DiaryListingSection(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'grey',

        },
        textStyle: {
            textAlign: 'center',
            fontSize: 16,

            fontWeight: 'bold'
        }

    })

    const renderDiaryItem = ({item}) => {

        return(

        <HistoryItem data={item}/>
            )
    }
    return (

        <View style={styles.container}>
            <FlatList data={props.diary}
                      horizontal={false}
                      numColumns={2}
                      renderItem={renderDiaryItem}
                      keyExtractor={item => item.sessionID}/>


        </View>
    )


}



export default DiaryListingSection
