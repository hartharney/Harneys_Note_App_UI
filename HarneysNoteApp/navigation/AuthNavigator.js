import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AppNavigator from './AppNavigator';
import { useIsLoggedIn } from '../services/contexts/isLoggedInContext';

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home">
      {(props) => <HomeScreen {...props} routeName="Home" />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {(props) => <RegisterScreen {...props} routeName="Register" />}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {(props) => <LoginScreen {...props} routeName="Login" />}
    </Stack.Screen>
  </Stack.Navigator>
);

const MainNavigator = () => {
    const { isLoggedIn } = useIsLoggedIn();
    console.log("logged in status" , isLoggedIn)
    return isLoggedIn ? <AppNavigator /> :  <AuthNavigator />;
}

export default MainNavigator;
