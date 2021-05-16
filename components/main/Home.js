import React from 'react'
import { View,Text } from 'react-native'
import { Paragraph } from 'react-native-paper'
import { styles } from './Styles'

export default function Home(){
    return (
        <View style={styles.homePageWrapper}>
            <Text style={styles.homeHead}>Home Page</Text>
            <View style={styles.homeText}>
            <Text>
            This is a steganography project taking User Input such as Images and embedding text into it also allowing for decoding.
            </Text>
            
            <Text>
            You are currently on the home page from here you can navigate to the upload page or the DBView Page where you can select 
            encoded images and reveal the hidden message.
            </Text>
            </View>
        </View>
    )
}