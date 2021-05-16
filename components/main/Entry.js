//ref https://www.npmjs.com/package/stegjs
//ref https://github.com/andmev/stegjs
import React, { Component, useEffect, useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import {wrapperStyle, canText, styles} from './Styles'
import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase'
import { encode, decode } from './stego'
require("firebase/firestore")
require("firebase/firebase-storage")


export default function Entry(props) {
    
    
    //console.log(props.route.params.image)

    

    const [embText, setText] = useState('');
    const uri = props.route.params.image;
    let newerURI
   // const imgUri = fetch(uri);
  /*  var image = new Image();
    image.src = imgUri;
    document.body.appendChild(image);

    const newUri2 = decode(newUri)
        console.log(newUri2)

        

        console.log(newURI)
            console.log(uri)

                            props.navigation.popToTop()

*/
//This is responsible for calling the encode function from stego.js and passing the image uri and text through.
//In this function the new uri is then passed to the firebase storage to be saved with the user instance.
    const onStego = async () => {
        encode(uri,embText,blob => {
         //   newerURI = newURI
         //   console.log(uri.length)
         //   console.log(newerURI.length)
         //   console.log(newerURI===uri)
         //   decode(newerURI).then(text => {
         //       console.log(text)
         //   })

         const task = firebase.storage().ref().child(`entry/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob);
         const taskStatus = snapshot => {
             console.log(`transferred: ${snapshot.bytesTransferred}`)
         }
         const taskFinished = () => {
             task.snapshot.ref.getDownloadURL().then((snapshot) => {
                 newEntry(snapshot);
                 console.log(snapshot)
                 
             }).then((function () {
                props.navigation.popToTop()
             }))
         }
         const error = snapshot => {
             console.log(snapshot)
         }
         task.on("state_changed", taskStatus, error, taskFinished);
         const newEntry = (downloadURL) => {
             firebase.firestore().collection('entries').doc(firebase.auth().currentUser.uid).collection("uniqueEntries")
             .add({downloadURL,creation: firebase.firestore.FieldValue.serverTimestamp()})
        }
        })     
   }
/*
   
*/
    //This section uses the image from the Upload page using the props.route.params.image path displays it on screen and requests the
    //user input to be used for image stegenography.
    //<Image source={{uri: props.route.params.image}} style={wrapperStyle.wrapper}/>
    return (
        <View style={styles.entryContainer}>
            <View style = {wrapperStyle.wrapper}>
                <View style = {styles.entryComp}>
                <Image source={uri}/>
                <TextInput placeholder="Secret Text" onChangeText={embText => setText(embText)}></TextInput>
                <View style = {styles.entryButton}>
                <Button title="Encode" onPress={() => onStego()}></Button>
                </View>
                <canvas id="canvas"></canvas>
                </View>
            </View>
        </View>
    )
    
}
