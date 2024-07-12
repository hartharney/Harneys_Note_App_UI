import React, { useState } from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { UserProvider } from './services/contexts/userContext';
import { IsLoggedInProvider } from './services/contexts/isLoggedInContext';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native'; 
import Constants from 'expo-constants';

import MainNavigator from './navigation/AuthNavigator';
import { NotesProvider } from './services/contexts/noteContext';


// http link to GraphQL server
const httpLink = createHttpLink({
  uri: 'http://172.20.10.12:4000/graphql', 
});

// Set up an authentication link
const authLink = setContext(async (_, { headers }) => {
  const tokenString = await AsyncStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [loading, setLoading] = useState(false);


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
    <IsLoggedInProvider>
        <ApolloProvider client={client}>
          <UserProvider>
            <NotesProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <View className={`flex-1 pt-${Constants.statusBarHeight}`}>
                  <NavigationContainer  screenOptions={{ headerShown: false }}>
                      <MainNavigator />
                  </NavigationContainer>
                  <Toast />
                </View> 
              </GestureHandlerRootView>
            </NotesProvider>
          </UserProvider>
        </ApolloProvider>
      </IsLoggedInProvider>
    </>
  );
};

export default App;
