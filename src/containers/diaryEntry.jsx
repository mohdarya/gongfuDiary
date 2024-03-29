import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    AppState,
    BackHandler,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {addEntry, addSteep} from '../action/diaryEntryAction';
import {connect} from 'react-redux';
import RadarChart from '../components/radarChart';
import {deductWeight, setTeaSessionForDay} from '../action/currentTeaAction';
import Sound from 'react-native-sound';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';

function DiaryEntry(props) {


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
            height: 250,
            width: '100%',

            alignItems: 'center',
            backgroundColor: '#2A9D8F',
            borderBottomLeftRadius: 93,
            borderBottomRightRadius: 93,

        },
        steepView: {
            alignSelf: 'center',


            top: 300,
            height: 400,
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
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'white',
            marginTop: 20,
            borderRadius: 20,
        }, notesView: {

            alignSelf: 'center',


            top: 350,
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
            backgroundColor: '#E9C46A',
            flexDirection: 'row',
            borderRadius: 25,

            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',

        }, doneButton: {
            backgroundColor: '#E9C46A',
            width: 100,
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
        },


    });


    let beginX;
    const  timerEndingSound = useRef(new Sound('phone_ring_bell.wav', Sound.MAIN_BUNDLE,(error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    }))
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current;
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const iconWidth = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const route = useRoute();
    const {startingTime, teaID, temp, waterVolume, weight, flavor} = route.params.teaData;
    const [confirmationVisible, setConfirmation] = useState(false);
    const [currentTime, setCurrenTime] = useState(parseInt(startingTime));
    const [countDownTimerState, setCountdownState] = useState(-1);

    const [startTimer, setStartTimer] = useState(false);
    const [increment, setIncrement] = useState(5);
    const [steepData, setSteepData] = useState({});
    const [note, setNote] = useState('Tap To Enter Note');
    const [timerViewVisibility, setTimerViewVisibility] = useState(false);
    const [buttonText, setButtonText] = useState('Stop');
    const [steepArray, setSteepArray] = useState([]);
    const [teaTagColor, setTeaTagColor] = useState('#92a3aa');
    const [openNavigation, setOpenNavigation] = useState(false);
    const [startTime, setStartTime] = useState(() => {

        return Date.now();

    });

    const endingTime = useRef(0);
    const countdownTimer = useRef(parseInt(startingTime));
    const first = useRef(true);
    const firstCounterRun = useRef(true);
    const countdownFunction = useRef(null)
    let height;
    if (flavor) {
        height = 1580;
    } else if (!flavor) {
        height = 1000;
    }
    const setSteepArrayMiddleFunc = () => {

        setSteepArray([...steepArray, [steepData]]);

    };


    const createEntry = (force) => {


        if (!firstCounterRun.current || force) {


            let sessionID = teaID + props.teas[teaID].teaName + startTime;


            let duration = Date.now() - parseInt(startTime);
            let tempnote = note;
            if (tempnote === 'Tap To Enter Note') {
                tempnote = '';
            }

            props.setTeaDay(new Date().getDay(), new Date().getDate());
            props.deductWeight(teaID, weight);
            props.createEntry({
                teaID, waterVolume, weight, temp, duration, note: tempnote,
                sessionID: sessionID,
                teaName: props.teas[teaID].teaName,
                steeps: [...steepArray, [steepData]],
                flavor,


            });
        }
    };

    const endButtonAction = () => {

        createEntry(false);
        setStartTimer(false);
        navigation.navigate('HomeScreen');
    };
    const handleBack = () => {

        clearInterval( countdownFunction.current)
        setConfirmation(!confirmationVisible);

    };

    function handleBackButtonClick(goHome) {

        if (goHome) {
            navigation.navigate('HomeScreen');
            return true;
        } else {
            if (navigation.canGoBack()) {
                handleBack();

                return true;

            } else {
                return true;

            }
        }

    }

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
    }, [openNavigation]);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    const ONE_SECOND_IN_MS = 300;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
    ];


    useEffect(() => {
        if (!startTimer) {


            if (!first.current) {
                if (firstCounterRun.current) {

                    countdownTimer.current = (parseInt(currentTime));
                    firstCounterRun.current = false;

                } else {
                    countdownTimer.current = (parseInt(currentTime) + parseInt(increment));
                    setCurrenTime(parseInt(currentTime) + parseInt(increment));
                }
            }
            clearInterval( countdownFunction.current)
            setButtonText('Close');
            endingTime.current = 0;
            deactivateKeepAwake();
        }
        else if (startTimer && !first.current) {

            countdownFunction.current =          setInterval(() => {


                    if (Math.ceil((endingTime.current - new Date().getTime()) / 1000) < 0) {


                        setCountdownState(0)
                        if (AppState.currentState === 'active') {
                            Vibration.vibrate(PATTERN);
                            timerEndingSound.current.play((success) => {
                                if (!success) {
                                    console.log('Sound did not play');
                                }
                            });
                            setStartTimer(false);
                        }


                    } else {

                        setCountdownState(Math.ceil((endingTime.current - new Date().getTime()) / 1000) > 0 ? Math.ceil((endingTime.current - new Date().getTime()) / 1000) : 0);

                    }
                }, 1000,
            );
        }


    }, [startTimer]);
    const startInterval = () => {


        activateKeepAwake();


        if (!first.current) {
            setSteepArrayMiddleFunc();

            endingTime.current = new Date().getTime() + 1000 * parseInt(countdownTimer.current + increment);
            setCountdownState(countdownTimer.current + increment);
            setStartTimer(true);



        } else {

            first.current = (false);
            endingTime.current = new Date().getTime() + 1000 * parseInt(startingTime);
            setCountdownState(countdownTimer.current);
            setStartTimer(true);
        }


    };


    const clockiFy = (time, origin) => {
        let mins = Math.floor((time / 60));
        let seconds = Math.floor(time % 60);

        let displayMins = mins < 10 ? `${mins}` : mins;
        let displaySecs = seconds < 10 ? `0${seconds}` : seconds;

        if (displayMins === '0' && origin === 'currentTime') {
            return displaySecs;
        } else {
            return (
                displayMins + ':' + displaySecs
            );
        }

    };

    let backgroundColour;

    if (props.teas[teaID].type === 'Hei cha') {
        backgroundColour = props.colors.HeiCha;
    } else if (props.teas[teaID].type === 'Raw Pu-erh') {
        backgroundColour = props.colors.RawPuerh;
    } else if (props.teas[teaID].type === 'Ripe Pu-erh') {
        backgroundColour = props.colors.RipePuerh;
    } else {
        backgroundColour = props.colors[props.teas[teaID].type];
    }
    const goToFlavorSelection = () => {
        navigation.navigate('FlavorEntry', {
            setSteepData,
            steepData,
        });
    };

    const [teaNameToDisplay, setTeaName] = useState();

    useEffect(() => {
        if (props.teas[teaID].teaName.length <= 110) {
            setTeaName(props.teas[teaID].teaName);
        } else {
            setTeaName(props.teas[teaID].teaName.substring(0, 110) + ' ...');
        }
    }, [props.teas]);


    return (


        <View style={styles.container}>


            <Modal animationType="slide"
                   transparent={true}
                   visible={confirmationVisible}
                   onRequestClose={() => {

                       setConfirmation(!confirmationVisible);
                   }}>
                <View style={{
                    height: '50%',
                    width: '100%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        height: 200,
                        width: '90%',
                        borderRadius: 20,
                    }}>

                        <Text style={{
                            fontSize: 23,
                            color: 'black',
                            marginLeft: 20,
                            marginRight: 20,
                            textAlign: 'center',
                            marginTop: 5,
                            fontWeight: 'bold',
                        }}>
                            Would You Like To Save Your Data The Data?
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginRight: 50,
                            marginLeft: 50,
                        }}>
                            <TouchableOpacity style={styles.doneButton} onPress={() => {
                                createEntry(true);
                                setConfirmation(!confirmationVisible);
                                handleBackButtonClick(true);
                            }} activeOpacity={1}>
                                <Text style={styles.doneButtonText}>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.doneButton} onPress={() => {
                                setConfirmation(!confirmationVisible);
                                navigation.goBack();
                            }} activeOpacity={1}>
                                <Text style={styles.doneButtonText}>
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>
            <Modal animationType="slide"
                   transparent={true}
                   visible={timerViewVisibility}
                   onRequestClose={() => {

                       setTimerViewVisibility(!timerViewVisibility);
                   }}>
                <View style={{height: '100%', width: '100%', justifyContent: 'flex-end'}}>
                    <View style={{
                        height: '80%',
                        width: '100%',
                        backgroundColor: '#13242A',
                        borderTopLeftRadius: 100,
                        borderTopRightRadius: 100,
                    }}>


                        <View style={{
                            marginTop: '15%',
                            marginBottom: 5,
                            alignSelf: 'center',
                            borderRadius: 300,
                            backgroundColor: '#264653',
                            borderWidth: 10,
                            borderColor: '#2A9D8F',
                            height: 300,
                            width: 300,
                            justifyContent: 'center',

                        }}>
                            <Text style={{alignSelf: 'center', fontWeight: 'bold', color: 'white', fontSize: 80}}>
                                {clockiFy(countDownTimerState, 'countdownTimer')}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setStartTimer(false);
                                    setTimerViewVisibility(!timerViewVisibility);
                                }} style={{
                                backgroundColor: '#E53B3B',
                                width: 200,
                                height: 50,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }} activeOpacity={1}>
                                <Text style={{
                                    textAlign: 'center',
                                    bottom: '5%',
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    color: '#000000',
                                }}>
                                    {buttonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </Modal>
            <ScrollView style={{flex: 1}} contentContainerStyle={{height: height}}>
                <View style={styles.topPart}>
                    <View style={[styles.topPartBar]}>
                        <View style={{
                            top: 20,
                            width: 80,
                            height: 80,
                            backgroundColor: backgroundColour,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity activeOpacity={1} style={{width: 50, height: 50}}>
                                <Image style={{height: '100%', width: '100%'}}
                                       source={require('../img/teaLeafWhite.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        top: '70%',
                        left: '20%',
                        width: '60%',
                        height: 300,
                        backgroundColor: '#E9C46A',
                        borderRadius: 30,
                        position: 'absolute',
                        alignContent: 'center',
                        justifyContent: 'flex-start',
                    }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            setButtonText('Stop');


                            setTimerViewVisibility(!timerViewVisibility);
                            startInterval();
                        }}>
                            <Text style={{alignSelf: 'center', fontSize: 35, color: '#264653', fontWeight: 'bold'}}>
                                {clockiFy(currentTime, 'currentTime')}
                            </Text>
                            <Text style={{alignSelf: 'center', fontSize: 25, color: '#264653'}}>
                                Timer
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                            width: '80%',
                            marginTop: 5,
                            alignSelf: 'center',
                            height: 2,
                            backgroundColor: '#2A9D8F',
                        }}/>
                        <TextInput
                            selectTextOnFocus={true}
                            keyboardType={'number-pad'}
                            onChangeText={(text) => {
                                if (text !== '') {
                                    setIncrement(parseInt(text));
                                } else {
                                    setIncrement(0);
                                }
                            }}
                            style={{
                                alignSelf: 'center',

                                fontSize: 25,
                                color: '#264653',
                                fontWeight: 'bold',
                            }}
                            value={increment.toString()}>

                        </TextInput>
                        <Text style={{alignSelf: 'center', fontSize: 20, color: '#264653'}}>
                            Increment
                        </Text>

                        <Text style={{
                            height: 84,

                            textAlignVertical: 'center',
                            alignSelf: 'center',
                            marginTop: 15,
                            marginRight: 5,
                            marginLeft: 5,
                            fontSize: 15,
                            color: '#264653',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                            {teaNameToDisplay}
                        </Text>


                    </View>
                </View>

                {flavor &&
                    <View style={styles.steepView}>
                        <View style={styles.steepTag}>
                            <Text style={{
                                alignSelf: 'center',
                                height: '100%',
                                textAlignVertical: 'center',
                                fontSize: 20,
                                color: '#264653',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                                Flavor
                            </Text>

                        </View>
                        <TouchableOpacity style={styles.graphView}
                                          activeOpacity={1}
                                          onPress={goToFlavorSelection}
                        >

                            <RadarChart steeps={{...steepData}}/>

                        </TouchableOpacity>
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
                            textAlign: 'center',
                        }}>
                            Notes
                        </Text>

                    </View>
                    <TouchableOpacity style={styles.noteElement}
                                      activeOpacity={1}
                                      onPress={() => {
                                          let tempnote = note;
                                          if (tempnote === 'Tap To Enter Note') {
                                              tempnote = '';
                                          }
                                          navigation.navigate('NoteEntry', {
                                              note: tempnote, setNote, setTeaTagColor,
                                          });
                                      }}
                    >

                        <Text style={{
                            textAlignVertical: 'top',
                            height: '100%',
                            color: teaTagColor,
                            fontSize: 20,
                            textAlign: 'center',
                        }}>
                            {note}
                        </Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>

            <View style={{
                position: 'absolute',
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row',
            }}>

                <TouchableOpacity activeOpacity={1} onPress={() => {
                    setOpenNavigation(!openNavigation);
                }}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={{
                            height: 66,

                            flexDirection: 'row',
                            backgroundColor: '#E9C46A', borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [65, 67],
                            }),

                        }}>

                            <AnimatedImage style={{
                                width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 67],
                                }), height: 67, alignSelf: 'center',
                            }}
                                           source={require('../img/push.png')}/>


                            <AnimatedImage style={{
                                height: 67, width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0],
                                }), alignSelf: 'center',
                            }}
                                           source={require('../img/pull.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 230],
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
                                    outputRange: [0, 50],
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={() => {
                                    setButtonText('Stop');
                                    startInterval();
                                    setTimerViewVisibility(!timerViewVisibility);
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40],
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40],
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}}
                                           source={require('../img/start.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>
                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50],
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={endButtonAction} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40],
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40],
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/stop.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </TouchableOpacity>

            </View>
        </View>


    );
}


const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        colors: TeaAvailable.teaColour,
        teas: TeaAvailable.teaAvailable,
        Diary: Diary.diaryEntry,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        setTeaDay: (day, date) => dispatch(setTeaSessionForDay(day, date)),
        createEntry: (data) => dispatch(addEntry(data)),
        addSteep: (sessionID, steepData) => dispatch(addSteep(steepData, sessionID)),
        deductWeight: (teaId, newData) => dispatch(deductWeight(teaId, newData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryEntry);
