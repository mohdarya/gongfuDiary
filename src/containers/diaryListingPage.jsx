import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {addEntry, addSteep, editEntryName, editEntrySteep, editNote, removeEntry} from "../action/diaryEntryAction";
import {connect} from 'react-redux';
import RadarChart from "../components/radarChart";
import Slider from "@react-native-community/slider";
import SteepSelector from "../components/steepSelector";
import {addWeight, deductWeight} from "../action/currentTeaAction";

function DiaryListingPage(props) {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',

        },
        topPart: {
            height: 170,
            width: '100%',


        },
        topPartBar: {
            height: 200,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        steepView: {
            alignSelf: 'center',


            top: '13%',
            height: 500,
            width: '90%',

        },
        steepTag: {
            alignSelf: 'center',
            borderRadius: 15,
            height: 40,
            marginBottom: 10,
            width: '50%',
            backgroundColor: '#E9C46A',
        }, teaFlavorView: {
            backgroundColor: 'grey',
            flex: 5,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        }, graphView: {
            marginTop: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,

            borderRadius: 20,
        }, notesView: {

            alignSelf: 'center',


            top: '20%',
            height: 400,
            width: '90%',
        },
        noteElement: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 380,


            borderRadius: 20,
        },
        notesTag: {
            alignSelf: 'center',
            borderRadius: 15,
            height: 40,
            marginBottom: 10,
            width: '50%',
            backgroundColor: '#E9C46A',
        },
        sessionActionMenu: {
            height: 66,
            width: 'auto',
            flexDirection: 'row',
            borderRadius: 25,

            alignItems: "center",
            justifyContent: 'center',
            alignSelf: "flex-end",

        },
        sliderView: {
            height: 'auto',
            width: '100%',
            marginTop: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,

        }, valueTextView: {
            height: 'auto',
            width: '100%',
            alignItems: 'center',
        },
        valueText: {
            top: '40%',
            fontSize: 30,
            color: 'white'

        },
        steepSelector: {
            width: '100%',
            height: 80,

            borderRadius: 10,
            backgroundColor: 'white',

            marginTop: 30,


        },


    });

    const navigation = useNavigation()
    const route = useRoute()

    let beginX

    const [editBackground, setEditBackground] = useState({  backgroundColor: '#E9C46A',})
    const [data, setData] = useState(route.params.data)
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const iconWidth = useRef(new Animated.Value(0)).current
    const [steepData, setSteepData] = useState(route.params.data.steeps)
    const [editActive, setEdit] = useState(false)
    const [note, setNote] = useState(route.params.data.note)
    const [teaName, setName] = useState(data.teaName)
    const [currentSteepIndex, setSteepIndex] = useState(0)
    const [openNavigation, setOpenNavigation] = useState(false)
    const [dataToDisplay, setDataToDisplay] = useState(() => {
        if (steepData[0] === undefined) {
            return {}
        } else {
            return steepData[0][0]
        }
    })

    let flavorValue
    if('flavor' in data)
    {
        flavorValue = data.flavor
    }
    else {
        flavorValue = true
    }
    let height

    if(flavorValue)
    {
        height = 1580
    }
    else if(!flavorValue)
    {
        height = 1000
    }
    let backgroundColour

    if(props.teaAvailable[data.teaID].type === 'Hei cha')
    {
        backgroundColour = props.colors.HeiCha
    }
    else if(props.teaAvailable[data.teaID].type === 'Raw Pu-erh')
    { backgroundColour = props.colors.RawPuerh}
    else if(props.teaAvailable[data.teaID].type === 'Ripe Pu-erh')
    {
        backgroundColour = props.colors.RipePuerh
    }
    else{
        backgroundColour = props.colors[props.teaAvailable[data.teaID].type]
    }


    const [teaNameToDisplay, setDisplayTeaName] = useState()

    useEffect(()=> {
        if(props.teaAvailable[data.teaID].teaName.length <= 85)
        {
            setDisplayTeaName(props.teaAvailable[data.teaID].teaName)
        }
        else {
            setDisplayTeaName( props.teaAvailable[data.teaID].teaName.substring(0, 85) + ' ...')
        }
    }, [props.teaAvailable])


    const setNoteMiddleFunc = (note) => {
        if(note !== "Tap To Enter Note"){
            setNote(note)
            props.editNote(data.sessionID, note)
        }else {
            setNote('')
            props.editNote(data.sessionID, '')
        }

    }
    const goToFlavorSelection = () => {

        if(editActive) {
            navigation.navigate('FlavorEntry', {
                setSteepData: changeSteepData,
                steepData: dataToDisplay
            })
        }
        else {
            navigation.navigate('FlavorDiaryEntry', {
                steepData: dataToDisplay
            })
        }
    }
    const deleteTea = () => {
        props.deleteEntry(route.params.data.sessionID)
        props.addWeight(data.teaID, data.weight)
        navigation.goBack()
    }
    const steepChanged = (index) => {
        setSteepIndex(index - 1)
        setDataToDisplay(steepData[index - 1][0])
    }
    const setTeaName = (teaNameAndID) => {

    props.deductWeight(teaNameAndID.teaID, data.weight)
        props.addWeight(data.teaID, data.weight)
        props.editName(data.sessionID, {...teaNameAndID})

            setData({...data, teaID: teaNameAndID.teaID})


    }
    const editTeaName = () => {

        if(editActive)
        {
            navigation.navigate('TeaSelection', {
                setTeaName
            })
            }

    }


    const changeSteepData = (newSteepData) =>{



        props.editSteep(route.params.data.sessionID,currentSteepIndex, newSteepData)
        setDataToDisplay(newSteepData)
    }
    const editSelected = () => {
        setEdit(!editActive)

    }



    //this needs to be here to handle the color change in noteentrypage
    const setTeaTagColor = (color) => {

    }

    useEffect(() => {


        if(editActive){
            setEditBackground({ backgroundColor: '#E53B3B'})

        }
        else if (!editActive) {


            setEditBackground({ backgroundColor: '#E9C46A'})

        }
        setOpenNavigation(false)

    }, [editActive])

    useEffect(() => {

        if (openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 1,
                duration: 1,
                useNativeDriver: false,
            }).start();

        } else if (!openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 0,
                duration: 1,
                useNativeDriver: false,
            }).start();
        }
    }, [openNavigation])
    const gotToNoteSection = () => {

        if(editActive){

                navigation.navigate('NoteEntry', {
                    note, setNote: setNoteMiddleFunc, setTeaTagColor
                })

        }
    }

    const clockiFy = (durationTime) => {



        durationTime = durationTime / 1000
        let hour = Math.floor(durationTime / 60 /  60)
        let mins = Math.floor((durationTime / 60) %60)
        let seconds = Math.floor(durationTime % 60)


        let displayHour = hour < 10 ? `0${hour}` : hour
        let displayMins = mins < 10 ? `0${mins}` : mins
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds

        return {
            displayHour,
            displayMins,
            displaySecs
        }

    }
    return (


        <View style={styles.container}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{height: height}}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>
                        <View style={{
                            top: 20,
                            width: 80,
                            height: 80,
                            backgroundColor: backgroundColour,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity activeOpacity={1} style={{width: 50, height: 50, }}>
                                <Image style={{height: '100%', width: '100%'}} source={require('../img/teaLeafWhite.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={editTeaName} activeOpacity={1} style={{
                        top: '80%',
                        left: '20%',
                        width: '60%',
                        height: 130,
                        backgroundColor: '#E9C46A',
                        borderRadius: 40,
                        position: "absolute",
                        alignContent: 'center',
                        justifyContent: 'space-around'
                    }}>

                        <Text style={{
                           textAlignVertical: 'center',
                            alignSelf: 'center',
                            marginTop: 5,
                            fontSize: 15,
                            color: '#264653',
                            width: '90%',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            height: 80,
                        }}>
                            {teaNameToDisplay}
                        </Text>

                        <Text style={{
                            alignSelf: 'center',

                            fontSize: 15,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            {route.params.date}
                        </Text>

                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', height: 'auto', width: '90%', top: '35%', marginRight: 20, marginLeft: 20,justifyContent: 'space-around'}}>

                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/temperatureWhite.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7, color: 'white'}}>
                            {data.temp + '°C'}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/waterWhite.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7, color: 'white'}}>
                            {data.waterVolume + 'ml'}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/clockWhite.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7, color: 'white'}}>
                            {clockiFy(route.params.data.duration).displayHour + ':' +clockiFy(route.params.data.duration).displayMins + ':' + clockiFy(route.params.data.duration).displaySecs}
                        </Text>
                    </View>
                    <View style={{height: 100, width: 70, backgroundColor: '#2A9D8F', borderRadius: 25, justifyContent: 'center'}}>

                        <Image style={{width: 40, height: 40, alignSelf: 'center'}}
                               source={require('../img/scaleWhite.png')}/>
                        <Text style={{textAlign: 'center', marginTop: 7, color: 'white'}}>
                            {data.weight + 'G'}
                        </Text>
                    </View>


                </View>
                {flavorValue &&
                <View style={styles.steepView}>
                    <View style={styles.steepTag}>
                        <Text style={{
                            alignSelf: 'center',
                            height: '100%',
                            textAlignVertical: 'center',
                            fontSize: 20,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Flavor
                        </Text>

                    </View>
                    <TouchableOpacity style={styles.graphView}
                                      activeOpacity={1}
                                      onPress={goToFlavorSelection}
                    >

                        <RadarChart steeps={{...dataToDisplay}}/>

                    </TouchableOpacity>
                    <View style={styles.steepSelector}>
                        <SteepSelector maxValue={steepData.length} processChange={steepChanged}/>
                    </View>
                </View>
                }

                <View style={styles.notesView}>
                    <View style={styles.notesTag}>
                        <Text style={{
                            alignSelf: 'center',
                            height: '100%',
                            textAlignVertical: 'center',
                            fontSize: 20,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>
                            Notes
                        </Text>

                    </View>
                    <TouchableOpacity style={styles.noteElement}
                                      activeOpacity={1}
                                      onPress={gotToNoteSection}
                    >

                        <Text style={{
                            textAlignVertical: 'top',
                            height: '100%',
                            color: 'white',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>
                            {note}
                        </Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>

            <View style={{
                position: "absolute",
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row'
            }}>

                <TouchableOpacity activeOpacity={1} onPress={() => {setOpenNavigation(!openNavigation)}}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={[{
                            height: 66,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [65, 67]
                            }),

                        }, editBackground]}>


                            <AnimatedImage style={{
                                width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 67]
                                }), height: 67, alignSelf: 'center'
                            }}
                                           source={require('../img/push.png')}/>




                            <AnimatedImage style={{
                                height: 67, width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0]
                                }), alignSelf: 'center'
                            }}
                                           source={require('../img/pull.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 230]
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
                                <AnimatedTouchable activeOpacity={1} onPress={()=> {
                                    setEdit(!editActive)
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/edit.png')}/>
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
                                <AnimatedTouchable activeOpacity={1} onPress={deleteTea} style={{
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
                </TouchableOpacity>

            </View>
        </View>


    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        colors: TeaAvailable.teaColour,
        teaAvailable: TeaAvailable.teaAvailable,
        Diary: Diary.diaryEntry
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        editName: (sessionid, newName) => dispatch(editEntryName(sessionid, newName)),
        editNote: (sessionid, newNote) => dispatch(editNote(sessionid, newNote)),
        editSteep: (sessionid, steepIndex, newSteep) => dispatch(editEntrySteep(sessionid,steepIndex,newSteep)),
        deleteEntry: (sessionid) => dispatch(removeEntry(sessionid)),
        deductWeight: (teaId, newData) => dispatch(deductWeight(teaId, newData)),
        addWeight: (teaId, newData) => dispatch(addWeight(teaId, newData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryListingPage);
