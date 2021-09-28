import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function InventoryItem(props) {

    const styles = StyleSheet.create({
        container: {
            height: 165,
            width: 110,
            borderRadius: 32,
            backgroundColor: '#3C91E6',


        }, nameContainer: {
            alignSelf: 'center',
            height: 'auto',
            width: '85%',


        },
        circleView: {
            marginTop: 10,
            marginBottom: 5,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: 'white',
            borderWidth: 10,
            borderColor: '#585858',
            height: 90,
            width: 90,
            justifyContent: 'center',

        }


    })
    return (

        <View style={styles.container}>

               <View style={styles.circleView}>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                        78G
                    </Text>
                </View>


            <View style={styles.nameContainer}>
                <Text style={{textAlignVertical: 'top', height: '100%', color: 'white', fontSize: 13, textAlign: 'center',}}>
                    Feng Qing Ye Sheng Hong ...
                </Text>
            </View>
        </View>
    )

}

export default InventoryItem