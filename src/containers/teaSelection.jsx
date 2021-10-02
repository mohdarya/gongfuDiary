import React, {useState} from 'react';
import {
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import Slider from "@react-native-community/slider";
import {useNavigation, useRoute} from "@react-navigation/core";
import InventoryItem from "../components/inventoryItem";
import {connect} from "react-redux";


function TeaSelection(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',
            justifyContent: 'flex-start',


        },
        teaNameTag: {
            fontSize: 15,
            margin: 10,
            marginTop: 10,
        },
        teaName: {

            textAlign: 'center',
            textAlignVertical: 'top',
            fontSize: 15,
            borderTopRightRadius: 20,
            color: 'black',
        },
        teaNameTextView: {
            height: '70%',
            width: '90%',

            marginBottom: '3%',
            justifyContent: 'flex-start',
            alignSelf: 'center',


        },


        teaNameView: {


            height: 70,
            flexDirection: 'column',
            marginBottom: '5%',
            marginLeft: 20,
            marginRight: 20,
            marginTop: '20%',
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-around',
        },
        doneButtonView: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        doneButton: {
            backgroundColor: '#E9C46A',
            width: 200,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
        },
        doneButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#264653',
        }, timeView: {
            height: 150,
            flexDirection: 'row',
            marginBottom: '30%',
            marginLeft: 20,
            marginRight: 20,


            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-around',
        },
        timerTag: {
            backgroundColor: 'grey',
            height: 80,
            width: 130,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
        },
        startingTime: {
            fontSize: 40,
            textAlign: 'center',
            color: 'black',
        },
        startingTimeView: {
            backgroundColor: 'grey',
            height: 80,
            width: 130,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        timerTagText: {
            fontSize: 20,
            top: 4,
            textAlign: 'center',
        },
        incrementView: {
            alignSelf: 'center',
            backgroundColor: 'grey',
            borderRadius: 20,

            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'space-between',
            height: 110,
            width: 170,
        }, topPart: {
            height: 170,
            width: '100%',


        },
        topPartBar: {
            height: 170,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        infoPart: {
            width: '100%',
            justifyContent: 'center',
            marginTop: '20%',
            height: '65%',

        },
        buttonPart: {


            width: '100%',
            top: '15%',
            height: 400,

        }, flavorNote: {
            backgroundColor: 'grey',
            width: 150,
            height: 45,
            alignSelf: 'flex-end',
            margin: 5,
            marginRight: 0,
            borderTopRightRadius: 20,
            marginLeft: 15,
            borderBottomLeftRadius: 20,
        },
        flavorView: {
            height: 170,
            width: '100%',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

            justifyContent: 'flex-start',

            flexDirection: 'column',
        }, valueTextView: {
            height: 'auto',
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 30,
            color: 'white'

        }, sliderView: {
            height: 'auto',
            width: '100%',
            marginTop: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

        },
        detailView: {
            width: 150,
            height: 45,
            margin: 10,
            marginRight: 0,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: 'grey',
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        fieldTag: {
            fontSize: 17,
            height: '100%',
            width: '100%',

            textAlign: 'center',
            textAlignVertical: 'center',
        }, flavorContainer: {
            height: 120,
            margin: 15,
            width: 'auto',
            justifyContent: 'space-between',
        },
        endButton: {
            margin: 20,
            backgroundColor: 'grey',
            borderRadius: 5,
            height: 30,
            width: 60,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
        },
        endButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontSize: 15,
        }, FlavorNoteItem: {
            height: 60,
            width: 160,
            borderRadius: 20,
            flexBasis: '40%',
            margin: 20,

        },
        flavorNoteView: {
            flex: 1,

            flexDirection: 'row',
        },
        flavorNoteText: {
            alignSelf: 'center',
            height: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 20
        },
        flavorListContainer: {
            flex: 1,
            marginBottom: 20,
        }

    })


    const route = useRoute()






    const navigation = useNavigation()



    const renderItems = ({item}) => {

        let toShow

        console.log(item)
        if(item === 'Add')
        {
            toShow =   <TouchableOpacity activeOpacity={1} onPress={() => {
                navigation.navigate('TeaInventoryData')}
            } style={{ height: 110,
                width: 110,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                backgroundColor: '#3C91E6',}}>


                <Image style={{height: 60, width: 60}} source={require('../img/add.png')}/>


            </TouchableOpacity>
        }
        else {
            toShow = <InventoryItem data={{...item}}/>
        }
        return(
            <TouchableOpacity activeOpacity={1} onPress={ () => {
                route.params.setTeaName({teaName: item.teaName, teaID: item.teaID})
                navigation.goBack()
            }}>
                {toShow}
            </TouchableOpacity>

        )
    }

    return (



        <View style={styles.container}>
            <View style={styles.topPart}>
                <View style={styles.topPartBar}>

                </View>
                <View style={{ top: '70%',left: '15%',width: '70%', height: 110, backgroundColor: '#E9C46A', borderRadius:30, position: "absolute", alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                        Select your Tea
                    </Text>
                </View>

            </View>

            <View style={styles.infoPart}>


              <FlatList data={['Add',...props.teaAvailable]} style={{height: '100%',}} renderItem={renderItems} columnWrapperStyle={{ justifyContent: 'space-around', alignItems: 'center', marginBottom: 15, marginRight:15, marginLeft: 15} } horizontal={false}
                        numColumns={2}
                        keyExtractor={item => item.teaID}/>










            </View>



        </View>


    )
}
const mapStateToProps = (state, ownProps) => {
    const {TeaAvailable} = state;

    return {
        teaAvailable: TeaAvailable.teaAvailable
    };
};


export default connect(mapStateToProps)(TeaSelection);
