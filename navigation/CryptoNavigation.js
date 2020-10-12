import React from 'react';
import {Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AddCryptosScreen from '../screens/AddCryptosScreen';
import MyCryptosScreens from '../screens/MyCryptosScreens';
import {Ionicons} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MyCryptosNavigate = () => {
    return(
       
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'hsl(0, 0%, 13.3%)', height: Platform.OS==='ios'?80: 60,}, 
                headerTitleAlign: 'center', 
                headerTitleStyle: {color: 'white', fontSize: 24},
                title: "Crypto Tracker",
            }}
            >
                <Stack.Screen
                    name="My Cryptos"
                    component={MyCryptosScreens}

                />
            </Stack.Navigator>
       
    )
}

const AddCryptosNavigate = () => {
    return(
        
            <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'hsl(0, 0%, 13.3%)',height: Platform.OS==='ios'?80: 60}, 
                headerTitleAlign: 'center', 
                headerTitleStyle: {color: 'white', fontSize: 24},
                title: "Crypto Tracker"
            }}
            >
                <Stack.Screen
                    name="Add Cryptos"
                    component={AddCryptosScreen}

                />
            </Stack.Navigator>
       
    )
}


const TabNavigate = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'white',
                    style: {
                        backgroundColor: 'hsl(0, 0%, 13.3%)',
                    },
                    labelStyle: {
                        fontSize: 14
                    }
                    
                }}
            >
                <Tab.Screen 
                    name="MyCryptos" 
                    component={MyCryptosNavigate} 
                    options={{
                        title: 'MyCryptos',
                        tabBarIcon: (tabinfo)=>{
                            return <Ionicons name='logo-bitcoin' color={tabinfo.color} size={30} />
                        }
                    }}  
                />
                <Tab.Screen 
                    name="AddCryptos" 
                    component={AddCryptosNavigate} 
                    options={{
                        title: 'Add',
                        tabBarIcon: (tabinfo)=>{
                            return <Ionicons name='ios-add-circle-outline' color={tabinfo.color} size={30} />
                        }
                    }}  
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigate;