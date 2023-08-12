import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import{db, auth} from '../firebase'

const handleSignOut = () =>{
    auth.signOut().then(()=>{
        navigation.replace("Login")
    })
    .catch(error => alert(error.message))
}

const fetchUserData = () => {
    //will do something
};
  
const MyAccount = () => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.label}>First Name:</Text>
      <Text style = {styles.label}>Last Name:</Text>
      <Text style = {styles.label}>Email:</Text>

      <TouchableOpacity style = {styles.button}>
        <Text style = {styles.buttonText}>Change Your Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button} onPress = {handleSignOut}>
        <Text style = {styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
      backgroundColor: 'white'
    },
    label: {
        fontSize: 20, 
    },
    button: {
        backgroundColor: 'darkblue',
        borderRadius: 30,
        padding: 10,
        marginBottom: 10,
        width: 350,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 0,
      },
    
});

export default MyAccount