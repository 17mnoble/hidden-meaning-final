import React from 'react'
import { Text, View, Button } from 'react-native'
import { styles } from '../main/Styles'

export default function Landing({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
            <Text style={styles.h1}>Hidden Meaning</Text>
            <Text style={styles.h2}>Steganography Made Easy</Text>
            </View>
            <View style={styles.buttonContainer}>
            <Button          
            title="Register"
            color="#000000"
            onPress={() => navigation.navigate("Register")}/>
            <Button   
            title="Login"
            color="#000000"
            onPress={() => navigation.navigate("Login")}/>
            </View>
        </View>
    )
}
