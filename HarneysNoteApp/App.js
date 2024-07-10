// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`flex-1 pt-${Constants.statusBarHeight}`}>
        <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown : false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                {/* Add other screens here */}
              </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </View> 
    </GestureHandlerRootView>
    </>
  )
};

export default App;
