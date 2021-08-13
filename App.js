import React, { Component } from 'react';
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@firebase/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./redux/reducers";
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfYKial6F3KGXgcEJJunG70Dfe2jyykwc",
  authDomain: "instagram-memic.firebaseapp.com",
  projectId: "instagram-memic",
  storageBucket: "instagram-memic.appspot.com",
  messagingSenderId: "971982710366",
  appId: "1:971982710366:web:0cbf311c17f8aff76bb6cf",
  measurementId: "G-3TFP0HCSQ0"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from './componenets/auth/Landing';
import RegisterScreen from './componenets/auth/Register';
import LoginScreen from './componenets/auth/Login';
import MainScreen from './componenets/Main';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: "1", justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <Provider store={store}>
          <MainScreen />
        </Provider>
      );
    }
  }
}

export default App;
