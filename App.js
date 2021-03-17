/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetectionScreen from './views/components/DetectionScreen';
import FormScreen from './views/components/FormScreen';


const Tab = createBottomTabNavigator();

const App: () => Node = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle:{fontSize:13},
                    keyboardHidesTabBar:true,
                    style:{height:70}
                }}
                screenOptions={ ({ route }) => ({
                    tabBarIcon : () => {
                        if(route.name == 'Detection') {
                            return <Image
                                       source={require('./assets/radar.png')}
                                       style={styles.tabImg}
                                   />
                        } else {
                            return <Image
                                       source={require('./assets/form.png')}
                                       style={styles.tabImg}
                                   />
                        }
                    }
                })}
            >
                <Tab.Screen name='Detection' component={DetectionScreen}/>
                <Tab.Screen
                    name='Formulaire'
                    component={FormScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabImg:{
        width:45,
        height:45
    }
});

export default App;
