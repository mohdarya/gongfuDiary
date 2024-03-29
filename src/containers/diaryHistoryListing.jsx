import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";
import {resetCurrentTeaData} from "../action/currentTeaAction";
import {resetDiaryData} from "../action/diaryEntryAction";
import HistoryItem from "../components/historyItem";

function DiaryHistoryListing(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        welcomeText: {
            fontSize: 30,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: 50,
            fontWeight: 'bold'
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
        },    searchTextInput: {
            width: '90%',
            marginLeft: 15,
            color: 'black'
        },      searchView: {
            alignSelf: 'center',
            backgroundColor: '#E9C46A',
            flexDirection: 'row',


            borderRadius: 15,
            width: '98%',
            height: 42

        },    topBar: {
            top: '5%',
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginLeft: 15,
            marginRight: 15,


        },


    });

    const route = useRoute()
    const [searchTerm, setSearchTerm] = useState(route.params.searchTerm)
    const [searchBar, setSearchBar] = useState(()=> {
        return route.params.teaID === null;
    })
    const [data, setData] = useState()

    useEffect(()=> {

        let tempData

        if (searchTerm !== null) {


         tempData = (Object.entries(props.diary).filter(([key, value]) => props.teaAvailable[value.teaID].teaName.toLowerCase().includes( searchTerm.toLowerCase())))


    }else if(route.params.teaID !== null)
    {
        tempData = ( Object.entries(props.diary).filter(([key, value]) => value.teaID === route.params.teaID))
    }
    else {
        tempData = ( Object.entries(props.diary).filter(([key, value]) => {


            return true
        }))
    }

    tempData.reverse()
    setData(tempData)} , [searchTerm])



    return (
        <View style={styles.container}>

            <View style={styles.topBar}>

                {searchBar &&
                <View style={styles.searchView}>
                    <TextInput
                        onSubmitEditing={(event) => {
                            if(event.nativeEvent.text === '')
                            {

                                    setSearchTerm(null)

                            }else {
                                setSearchTerm(event.nativeEvent.text)
                                if(route.params.setParentSearch !== null)
                                {
                                    route.params.setParentSearch(event.nativeEvent.text)
                                }
                            }
                        }}
                        style={styles.searchTextInput}
                        onChangeText={(text) => {
                            setSearchTerm(text)
                            if(route.params.setParentSearch !== null)
                            {
                                route.params.setParentSearch(text)
                            }
                        }}

                        placeholder={'Search For a Tea'}
                        placeholderTextColor={'#585858'}>
                        {searchTerm}
                    </TextInput>
                </View>}


            </View>

            <View style={[{flex: 1}, searchBar ? {top: '10%'} : {}]}>


                <Text style={styles.welcomeText}>
                    History
                </Text>

                <View style={{height: '73%', width: '90%', alignSelf: 'center'}}>


                    <FlatList data={data} renderItem={({item}) => {

                        return(
                            <HistoryItem key={`historyItem${item[1].sessionID}`} data={item[1]}/>
                        )
                    }}
                              keyExtractor={item => item[1].sessionID}/>
                </View>
            </View>


        </View>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        resetDiary: () => dispatch(resetDiaryData()),
        resetTeaInventory: () => dispatch(resetCurrentTeaData())
    };
};

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        weeklySession: TeaAvailable.weeklySession,
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiaryHistoryListing)

