// App.js
import React, { useEffect, useState } from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, View, ActivityIndicator } from 'react-native'; 
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppNavigator from './navigation/AppNavigator'; 
import AuthNavigator from './navigation/AuthNavigator'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// http link to GraphQL server
const httpLink = createHttpLink({
  uri: 'http://172.20.10.12:4000/graphql', 
});

// Set up an authentication link
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  const currentRoute = headers['x-current-path'] || '/';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-current-path': currentRoute,
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View className={`flex-1 pt-${Constants.statusBarHeight}`}>
            <NavigationContainer>
              {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <Toast />
          </View> 
        </GestureHandlerRootView>
      </ApolloProvider>
    </>
  );
};

export default App;
