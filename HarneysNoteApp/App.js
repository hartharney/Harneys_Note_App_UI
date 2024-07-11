// App.js
import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';

const Stack = createStackNavigator();


// http link to GraphQL server
const httpLink = createHttpLink({
  uri: 'http://172.20.10.12:4000/graphql', 
});

// Set up an authentication link
const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from AsyncStorage if it exists
  const token = await AsyncStorage.getItem('token');

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {
  return (
    <>
     <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className={`flex-1 pt-${Constants.statusBarHeight}`}>
          <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown : false}}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  {/* Add other screens here */}
                </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </View> 
      </GestureHandlerRootView>
     </ApolloProvider>
    </>
  )
};

export default App;



