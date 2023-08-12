import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { auth } from '../firebase'

function ResetPassword() {
    // State variable for the user's email.
    const [email, setEmail] = useState('')
    // Initialize useNavigation hook.
    const navigation = useNavigation()

    // Function to handle sending a password reset email.
    const handleForgottenPassword = () => {
        auth.sendPasswordResetEmail(email)
        .then(alert('Please check your email for password reset instructions'))
        .catch(error => alert(error.message))
        .then(navigation.navigate("Login"))
    }

  return (
    <KeyboardAvoidingView style = {styles.container} behavior = "padding">
        <View style = {styles.inputContainer}>
            <TextInput
                placeholder = "Email"
                value = { email }
                onChangeText = {text => setEmail(text)}
                style = {styles.input}
            />
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity onPress = {handleForgottenPassword} style = {styles.button}>
                    <Text style = {styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        width: '80%'
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10, 
        marginTop: 5, 
    },
    buttonContainer:{
        width: '60%', 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: 'darkblue',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        marginTop:10,
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    },
})

export default ResetPassword