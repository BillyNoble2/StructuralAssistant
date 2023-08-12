import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {

    const navigation = useNavigation()

    

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Logged in as: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress = {handleSignOut} style = {styles.button} >
            <Text style = {styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:20, 
    },
    button:{
        backgroundColor: 'blue',
        width: '60%',
        padding:15, 
        borderRadius:10,
        marginTop:10,
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
})