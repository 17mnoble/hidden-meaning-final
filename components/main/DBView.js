import React, {useState} from 'react'
import { View,Text,Image,FlatList,TouchableOpacity,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { styles } from './Styles';
import { decode } from './stego'



function DBView(props){
    const [secretText, setText] = useState('');
    const {entry} = props; 
    console.log({entry})

    const onDecode = async (downloadURL) => {
        const blob = await fetch(downloadURL).then(r => r.blob())
        let dataUrl = await new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });  
        decode(dataUrl).then(text => {
            setText(text)
         //   console.log(secretText)
                 
        })
    }
 
    //The Flatlist will display 2 columns of images calling on the entries data being called from the Redux userState through the
    //mapStateToProps
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text >Value: {secretText}</Text>
            </View>
        <View style={styles.galleryWrapper}>
        
            <FlatList
                numColumns={3}
                horizontal={false}
                data={entry}
                
                renderItem={({item}) => (
                    
                    <View style={styles.imageWrapper}>
                        
                        <TouchableOpacity onPress={() => onDecode(item.downloadURL)}>
                        <Image
                            style={styleImage.image}
                            source={{uri:item.downloadURL}}
                        />
                        </TouchableOpacity>
                       
                    </View>
                )}
            />
        </View>       
                <canvas  id='canvas'></canvas>
        </View>

    )
    
}


const styleImage = StyleSheet.create({
    image:{
        flex: 1,
        aspectRatio: 1/1,
        height: 150,
        width: 150  
    }
  })
//parses everything in the firestore into the mapStateToProps component
//the entries is also included in the userState found in the reducer
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    entry: store.userState.entry
})



export default connect (mapStateToProps, null)(DBView);