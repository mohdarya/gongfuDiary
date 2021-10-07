import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    FlatList,
    Image,
    Keyboard,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import HistoryItem from "../components/historyItem";
import {connect} from "react-redux";
import {Directions, FlingGestureHandler, State} from "react-native-gesture-handler";




function TeaDetailPage(props) {



    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#264653',
                justifyContent: 'flex-start',


            },




       topPart: {
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

            },       HistoryViewTextView: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center'
            },
            historyContainer: {
                top: "23%",
                height: '55%',
                marginLeft: 15,
                marginRight: 15,

            },
            historyView: {
                height: '80%',
                marginLeft: 15,
                marginRight: 15,
            },  sessionActionMenu: {
                height: 66,
                width: 'auto',
                flexDirection: 'row',
                borderRadius: 25,

                alignItems: "center",
                justifyContent: 'center',
                alignSelf: "flex-end",

            },


        })


    const route = useRoute()
    const {data} = route.params
    let beginX
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const [editActive, setEdit] = useState(false)
    const [editBackground, setEditBackground] = useState({  backgroundColor: '#E9C46A',})
    const [historyItems, setHistoryItems] = useState([])
    useEffect(() => {
        let items = []

        let loopNumber = props.diary.length

        if (loopNumber > 5) {
            loopNumber = 5
        }
        for (let i = 0; i < loopNumber; i++) {
            if(props.diary[props.diary.length - 1 - i].teaID === data.teaID) {
                items.push({...props.diary[props.diary.length - 1 - i]})
            }
        }
        setHistoryItems(items)
    }, [props.wholeDiary])


    useEffect(() => {

        Animated.timing(textInputWidth, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
        if(editActive){
            setEditBackground({ backgroundColor: '#E53B3B'})
        }
        else {


            setEditBackground({ backgroundColor: '#E9C46A'})
        }
    }, [editActive])

    const renderItems = ({item}) => {


        return (
            <HistoryItem key={`historyItem${item.sessionID}`} data={{...item}}/>
    )
    }
    return (



            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{ top: '40%',left: '20%',width: '60%', height: 230, backgroundColor: '#E9C46A', borderRadius:50, position: "absolute", alignContent: 'space-around', justifyContent: 'space-around'}}>
                        <Text style={{alignSelf: 'center', textAlign: "center", marginTop: 30, fontSize: 20, color: '#264653', fontWeight: 'bold'}}>
                            {data.teaName}
                        </Text>
                        <Text style={{alignSelf: 'center', fontSize: 17,marginTop: 20, color: '#264653', fontWeight: 'bold'}}>
                            {data.teaName}
                        </Text>

                            <Text style={{textAlign: 'center', marginTop: 7, fontSize: 18,}}>
                                {data.weight + 'G'}
                            </Text>


                        <Text style={{color: 'black', alignSelf: 'center', backgroundColor: 'white', marginBottom: 20, width: 100, textAlign: 'center',height: 30, textAlignVertical: 'center', borderRadius: 30,}}
                              onPress={() => Linking.openURL(data.link)}>
                            Item Link
                        </Text>
                    </View>

                </View>
                <View style={styles.historyContainer}>
                    <View style={styles.HistoryViewTextView}>
                        <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                            History
                        </Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%',}}>
                            <Text style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'right',
                                textAlignVertical: 'center'
                            }}>
                                More
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.historyView}>
                        <FlatList data={historyItems} style={{height: '100%'}} renderItem={renderItems}



                                  keyExtractor={item => item.sessionID}/>


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
                            <Animated.View style={[{
                                height: 66,
                                justifyContent: 'center',
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25,
                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [110, 67]
                                }),

                            }, editBackground]}>


                                <Image style={{width: 50, height: 50, alignSelf: 'center'}}
                                       source={require('../img/edit.png')}/>

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
                                    <AnimatedTouchable activeOpacity={1}  style={{
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
const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(TeaDetailPage)
