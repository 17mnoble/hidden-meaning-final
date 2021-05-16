import { StyleSheet } from 'react-native'
const wrapperStyle = StyleSheet.create({
    wrapper: {
        flex:1
    }
})

const canText = StyleSheet.create({
  canVan: {
    transform: [{ scale: 0 }]
  }
})

const styles = StyleSheet.create({
    cameraWrapper: {
      flex: 1,
      flexDirection: 'row'
    },
    fixedRatio: {
      flex: 1,
      aspectRatio: 1
    },
    containerHeader: {
      margin: 20
      
    },
    container: {
      flex: 1,
      backgroundColor: '#1960C6',
      marginTop:0
    },
    entryContainer: {
      flex:1,
      backgroundColor: '#1960C6'
    },
    entryComp: {
      marginTop:120
    },
    entryButton:{
      marginTop:240
    },
    galleryContainer: {
      flex: 1
    },
    imageWrapper: {
      flex: 1/3
    },
    image: {
      flex: 1,
      aspectRatio: 1/1
    },
    textInput: {
      height: 40,
      borderColor: 'gray', 
      borderWidth: 1
    },
    containerWrap: {
      flex: 1,
      backgroundColor: '#1960C6',
      alignItems: 'center',
      justifyContent: 'space-between',
      width:'100%'
    },
    h1: {
      color: '#FA710C',
      fontSize: 40,
    },
    h2: {
      color: '#ffffff',
      fontSize: 18,
      marginTop: 8,
    },
    buttonContainer: {
      backgroundColor: '#fffffff',
      borderRaduis: 1,
      padding: 1,
      margin: 1,
      width: '100%'
    },
    topContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomContainer: {
      justifyContent: 'flex-end',
      width: '90%',
      margin: 20,
      padding: 10,
    },
    containerLogin: {
      flex: 1,
      backgroundColor: '#1960C6',
      alignItems: 'center',
      justifyContent: 'space-between',
      width:'100%',
      paddingTop:40
    },
    homePageWrapper: {
      flex: 1,
      backgroundColor: '#1960C6',
    },
    homeHead: {
      flex:1,
      color: '#FA710C',
      fontSize: 30,
      marginTop: 10,
      marginLeft: 70
    },
    homeText: {
      marginBottom: 180
    }
  })

  

  export {styles, wrapperStyle, canText}