import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchEntry } from '../redux/actions/index'

import DBViewPage from './main/DBView'
import UploadPage from './main/Upload'
import HomePage from './main/Home'
//import DBViewPage from './main/DBView'

const Tab = createBottomTabNavigator();
const EmptyPage = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        //this will call the index.js in actions which will call dispatch effecting the Reducers at user.js updating the state of
        //current users with what is entered in the actions.
        this.props.fetchUser();
        this.props.fetchEntry();

    }
    render() {
    /*    const { currentUser } = this.props;

        console.log(currentUser)
        if(currentUser==undefined){
            return(
                <View></View>
            )
        }*/
        return (
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={HomePage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name = "home" color={color} size ={26}/>
                    ),
                }}/>
                <Tab.Screen name="Uploads" component={EmptyPage} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Upload")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name = "upload" color={color} size ={26}/>
                    ),
                }}/>
                <Tab.Screen name="DBView" component={DBViewPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name = "database" color={color} size ={26}/>
                    ),
                }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
//This will connect actions to the props 
const mapDispatchProps =(dispatch) => bindActionCreators({fetchUser, fetchEntry}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
