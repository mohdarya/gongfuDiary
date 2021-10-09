import React, {useRef, useState} from 'react';
import {
    Animated,
    FlatList,
    Image,
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";
import {addSteep} from "../action/diaryEntryAction";
import {connect} from "react-redux";
import {addTea} from "../action/currentTeaAction";


function TeaInventoryEntry(props) {


    const
        styles = StyleSheet.create({
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
                backgroundColor: 'grey',
                width: 200,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
            },
            doneButtonText: {
                textAlign: 'center',
                bottom: '5%',
                fontSize: 25,
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
                height: 130,
                width: '100%',

                alignItems: 'center',
                backgroundColor: '#2A9D8F',
                borderBottomLeftRadius: 93,
                borderBottomRightRadius: 93,

            },
            infoPart: {
                marginTop: '10%',
                marginRight: '10%',
                marginLeft: '10%',
            },
            buttonPart: {


                width: '100%',
                top: '15%',
                height: 400,
            },
            flavorListContainer: {
                flex: 1,
                marginBottom: 20,
            },
            endButtonText: {
                textAlign: 'center',
                bottom: '5%',
                fontSize: 15,
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
            flavorNoteText: {
                alignSelf: 'center',
                height: '100%',
                textAlignVertical: 'center',
                textAlign: 'center',
                fontSize: 20
            },
            FlavorNoteItem: {
              
                height: 60,
                width: 160,
                borderRadius: 20,
                flexBasis: '39%',
                margin: 20,

            },
            sessionActionMenu: {
                height: 66,
                width: 'auto',
                backgroundColor: '#E9C46A',
                flexDirection: 'row',
                borderRadius: 25,

                alignItems: "center",
                justifyContent: 'center',
                alignSelf: "flex-end",

            },


        })


    const [teaData, setTeaData] = useState({
        status: 'active',
        teaName: null,
        type: null,
        weight: null,
        link: '',
    })
    const navigation = useNavigation()
    const [typeModal, setTypeModal] = useState(false)
    const textInputWidth = useRef(new Animated.Value(0)).current
    const [teaType, setTeaType] = useState('Type')
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    let beginX
    return (
        <View style={{flex: 1}}>


            <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={typeModal}
                    onRequestClose={() => {

                        setTypeModal(!typeModal)
                    }}

                >

                    <View style={{

                        zIndex: 3,
                        height: '80%',
                        width: '90%',
                        margin: 20,
                        borderRadius: 20,
                        borderWidth: 10,
                        borderColor: '#707070',
                        backgroundColor: '#2a9d8f'
                    }}>
                        <TouchableOpacity style={styles.endButton} activeOpacity={1} onPress={() => {
                            setTypeModal(!typeModal)
                        }}>
                            <Text style={styles.endButtonText}>
                                Exit
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.flavorListContainer}>
                            <FlatList
                                data={['Oolong', 'Black', 'Green', 'White', 'hei cha', 'purple', 'Raw Pu-erh', 'Ripe Pu-erh',]}
                                horizontal={false}
                                numColumns={2}
                                renderItem={({item}) => {

                                    let styleToUse = {
                                        backgroundColor: 'white',
                                    }
                                    if(teaType !== undefined) {
                                        if (teaType === item) {
                                            styleToUse = {
                                                backgroundColor: 'grey',
                                            }
                                        }
                                    }
                                    return (

                                        <TouchableOpacity style={[styles.FlavorNoteItem, styleToUse]} activeOpacity={1}
                                                          onPress={() => {
                                                              setTeaType(item)
                                                              setTeaData({...teaData, type: item})
                                                              setTypeModal(!typeModal)
                                                          }}>
                                            <Text style={styles.flavorNoteText}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={item => item}/>

                        </View>
                    </View>

                </Modal>
                <View style={styles.topPart}>

                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{
                        top: '40%',
                        left: '15%',
                        width: '70%',
                        height: 110,
                        backgroundColor: '#E9C46A',
                        borderRadius: 30,
                        position: "absolute",
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653', fontWeight: 'bold'}}>
                            Enter The Tea Detail
                        </Text>
                    </View>

                </View>
                <View style={styles.infoPart}>

                    <TextInput style={{fontSize: 20, marginBottom: 15, borderBottomWidth: 2, borderColor: '#E9C46A'}}
                               onChangeText={(text) => {
                                   let d = new Date()
                                   setTeaData({...teaData, teaName: text})


                               }} placeholderTextColor={'white'} placeholder={'Name'} keyboardType={'default'}>

                    </TextInput>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        Keyboard.dismiss()
                        setTypeModal(true)
                    }} style={{
                        fontSize: 20,
                        height: 45,
                        marginBottom: 15,
                        borderBottomWidth: 2,
                        borderColor: '#E9C46A'
                    }}>
                        <Text style={{fontSize: 20, marginLeft: 3, color: 'white'}}>
                            {teaType}
                        </Text>
                    </TouchableOpacity>
                    <TextInput style={{fontSize: 20, marginBottom: 15, borderBottomWidth: 2, borderColor: '#E9C46A'}}
                               onChangeText={(text) => {
                                   let amount
                                   if (text === '') {
                                       amount = null
                                   } else {
                                       amount = parseFloat(text)
                                   }
                                   setTeaData({...teaData, weight: amount})
                               }} placeholderTextColor={'white'} placeholder={'Weight'} keyboardType={'number-pad'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20, marginBottom: 15, borderBottomWidth: 2, borderColor: '#E9C46A'}}
                               onChangeText={(text) => {
                                   setTeaData({...teaData, vendor: text})
                               }} placeholderTextColor={'white'} placeholder={'Vendor'} keyboardType={'default'}>

                    </TextInput>
                    <TextInput style={{fontSize: 20, marginBottom: 15, borderBottomWidth: 2, borderColor: '#E9C46A'}}
                               onChangeText={(text) => {
                                   setTeaData({...teaData, link: text})
                               }} placeholderTextColor={'white'} placeholder={'Link'} keyboardType={'default'}>

                    </TextInput>
                </View>

            </View>


            <View style={{
                position: "absolute",
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row'
            }}>
                <FlingGestureHandler
                    direction={Directions.RIGHT | Directions.LEFT}
                    onHandlerStateChange={({nativeEvent}) => {
                        if (nativeEvent.state === State.BEGAN) {
                            beginX = nativeEvent.absoluteX;
                        }
                        if (nativeEvent.state === State.END) {

                            if (nativeEvent.absoluteX - beginX < -50) {
                                Animated.timing(textInputWidth, {
                                    toValue: 1,
                                    duration: 100,
                                    useNativeDriver: false,
                                }).start();

                            } else if (nativeEvent.absoluteX - beginX > 10) {
                                Animated.timing(textInputWidth, {
                                    toValue: 0,
                                    duration: 100,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }
                    }}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={{
                            height: 66,
                            justifyContent: 'center',

                            backgroundColor: '#E9C46A', borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [110, 67]
                            }),

                        }}>


                            <Image style={{width: 50, height: 50, alignSelf: 'center'}}
                                   source={require('../img/add.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 200]
                                    }),
                                    backgroundColor: '#E9C46A',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',


                                },
                            ]}>


                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable onPress={() => {
                                    if (teaData.teaName !== null && teaData.type !== null && teaData.weight !== null) {

                                        props.addTea(teaData)
                                        navigation.goBack()
                                    } else {
                                        ToastAndroid.show("Please fill all fields", ToastAndroid.LONG)
                                    }

                                }} activeOpacity={1} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/add.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>
                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={() => {
                                    navigation.goBack()
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}}
                                           source={require('../img/delete.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </FlingGestureHandler>
            </View>
        </View>


    )
}


const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        addTea: (data) => dispatch(addTea(data)),
        addSteep: (sessionID, steepData) => dispatch(addSteep(steepData, sessionID)),
    };
};

export default connect(null, mapDispatchToProps)(TeaInventoryEntry);
