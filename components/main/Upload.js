//ref https://docs.expo.io/versions/latest/sdk/camera/
//ref https://docs.expo.io/versions/latest/sdk/imagepicker/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import {styles, wrapperStyle} from './Styles'


export default function Upload({ navigation }) {
  //These are 2 consts used in order to request permission for the Camera and the Image Picker.
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasImagePickerPermission, setHasImagePickerPermission] = useState(null);
  //the setCamera function uses the camera in the cameraWrapper as a reference.
  const [camera, setCamera] = useState(null);
  let [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

//whenever a function is call it will trigger the useEffect and the request permissions contained within it checking for permissions.
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const imagePickerStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasImagePickerPermission(imagePickerStatus.status === 'granted');
    })();
  }, []);

//This is a function to pick and image from your storage for uploading.
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Image,
    
    allowsEditing: true,
    aspect: [1,1],
    quality: 1,
  });
  console.log(result);

  if(!result.cancelled){
    setImage(result.uri);
  }
}


// This is a function to capture an image after the capture button has been pressed.
  const captureImage = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      console.log(data.uri)
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === null || hasImagePickerPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasImagePickerPermission === false) {
    return <Text>No access to resource</Text>;
  }

  //This return is responisible for the reverse camera function allowing the user to use both their rear and forward facing camera.
  //expo was used to facilitate this using their camera documentation.
  //The last line of containing the image tag creates a copy of the image we have taken and shows it below the image buy grabbing the 
  //URI
  return (
      <View style={wrapperStyle.wrapper}>
        <View style={styles.cameraWrapper}>
        <Camera ref={ref => setCamera(ref)}style={styles.fixedRatio} type={type} ratio={'1:1'}/>
        </View>

        <Button
        title="Reverse Camera"
        onPress={() => {
        setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
        }}>
        </Button>
        <Button title="Capture" onPress={() => captureImage()}/>
        <Button title="Choose Image" onPress={() => pickImage()}/>
        <Button title="Confirm Selection" onPress={() => navigation.navigate('Entry', {image})}/>
        {image && <Image source={{uri: image}} style={wrapperStyle.wrapper}/>}
    </View>
  );
}
