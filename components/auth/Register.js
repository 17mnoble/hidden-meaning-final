import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { styles } from '../main/Styles'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp= this.onSignUp.bind(this)

    }

    

    onSignUp(){
        const { email , password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={(name) => this.setState({ name })}
                    maxLength={8}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true}
                    maxLength={16}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    autoCapitalize='none'
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}

export default Register
