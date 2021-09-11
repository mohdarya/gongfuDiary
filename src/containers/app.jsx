import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {persistor, store} from "../reducer/store";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";
import HomeScreen from "./homescreen";
import DiaryEntry from "./diaryEntry";
import FlavorEntry from "./flavorEntry";
import DiaryListingPage from "./diaryListingPage";
import FlavorDiary from "./flavorDiary";
import TeaNameEntryPage from "./teaNameEntryPage";
import TimerPage from "./timerPage";
import teaNameEntryPageTimer from "./teaNameEntryPageTimer";

function App(props) {
    const Stack = createStackNavigator();
    return (

        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>

                    <Stack.Navigator initialRouteName="HomeScreen"
                                     screenOptions={{
                                         headerShown: false,
                                         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                                     }}
                    >
                        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                        <Stack.Screen name="DiaryEntry" component={DiaryEntry}/>
                        <Stack.Screen name="FlavorEntry" component={FlavorEntry}/>
                        <Stack.Screen name="DiaryListing" component={DiaryListingPage}/>
                        <Stack.Screen name="FlavorDiaryEntry" component={FlavorDiary}/>
                        <Stack.Screen name="TeaName" component={TeaNameEntryPage}/>
                        <Stack.Screen name="TimerTeaName" component={teaNameEntryPageTimer}/>
                        <Stack.Screen name="TimerPage" component={TimerPage}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}


export default App
