import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import NotesScreen from "../screens/NotesScreen";
import HistoryScreen from "../screens/HistoryScreen";
import FriendsScreen from "../screens/FriendsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
        initialRouteName='AddNotes'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'History') {
                        iconName = 'time-outline';
                    } else if (route.name === 'Add notes') {
                        iconName = 'create-outline';
                    } else if (route.name === 'Collaborators') {
                        iconName = 'people-outline';
                    }

                    return <Ionicons name={iconName} color={color} size={size} />;
                },
                // headerShown: false,
                
            })}
            tabBarOptions={{
                activeTintColor: '#FBBC05', 
                inactiveTintColor: '#858585', 
                style: {
                    backgroundColor: '#000000', 
                    borderTopWidth: 1,
                    borderTopColor: '#000000', 
                },
                labelStyle: {
                    fontSize: 12,
                    marginBottom: 3,
                },
                tabStyle: {
                    justifyContent: 'center',
                }
            }}
        >
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'History',
                }}
            />
            <Tab.Screen
                name="Add notes"
                component={NotesScreen}
                options={{
                    tabBarLabel: 'Add notes',
                }}
            />
            <Tab.Screen
                name="Collaborators"
                component={FriendsScreen}
                options={{
                    tabBarLabel: 'Collaborators',
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;
