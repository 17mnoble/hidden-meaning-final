import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native'
//import * as firebase from 'firebase'
import firebase from 'firebase/app';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

//This creates a Store and uses the Reducer and Middleware used in Redux.
const store = createStore(rootReducer, applyMiddleware(thunk))

//This must be hidden in an environment variable before push to production.
const firebaseConfig = {
  apiKey: "AIzaSyBNfa4ldD_2vc93u0LnZ8O0RLf6H6QquYQ",
  authDomain: "hidden-meaning-dev.firebaseapp.com",
  projectId: "hidden-meaning-dev",
  storageBucket: "hidden-meaning-dev.appspot.com",
  messagingSenderId: "953007209429",
  appId: "1:953007209429:web:8e3b35e05569e39aaedb5c",
  measurementId: "G-7FRQ5S0LH1"
};

//This checks to ensure that there are no current firebase instances initialized.
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


//This is an import for the Navigator and StackNavigator
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//This is an import for all the pages being referenced.
import LandingPage from './components/auth/Landing'
import RegisterPage from './components/auth/Register'
import LoginPage from './components/auth/Login'
import MainPage from './components/Main'
import UploadPage from './components/main/Upload'
import GeneratePage from './components/main/Entry'

//This constant is used to contain the Stack Navigator.
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false, 
    }
  }

  //This is a listener for auth state change

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  //The Stack Navigator here is responsible for users that are currently signed out they will land on the landing page and can be routed.
  //to the Login or Register pages.
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingPage} options = {{ headerShown: false}}/>
            <Stack.Screen name = "Register" component = {RegisterPage}/>
            <Stack.Screen name = "Login" component = {LoginPage}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      //Provider must be the parent of MainPage to ensure that redux will work inside MainPage  
      //NavigationContainer must wrap the Stack Navigator in order for the BottomTab React Navigation to work.
      //The Stack in the Navigator is responsible for moving from page to page allowing for this to be done as seen in the Confirm Button
      //on the Upload.js section.
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {MainPage} options = {{ headerShown: false}}/>
            <Stack.Screen name = "Upload" component = {UploadPage} navigation={this.props.navigation}/>
            <Stack.Screen name = "Entry" component = {GeneratePage} navigation={this.props.navigation}/>

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
  }
}

export default App

