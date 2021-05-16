import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { styles } from '../main/Styles'

import firebase from 'firebase'

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onSignIn= this.onSignIn.bind(this)

    }

    onSignIn(){
        const { email , password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
x
    render() {
        return (
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    style={styles.textInput}
                    onPress={() => this.onSignIn()}
                    title="Sign In"
                />
            </View>
        )
    }
}

export default Login
