import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if (user) {
                navigation.replace("MainMenu");
            }
        })
        return unsubscribe
    }, [])

    const handleSignUpNav = () => {
        navigation.replace("Register")
    }

    const handleLogin = () =>{
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials =>{
            const user = userCredentials.user; })
        .catch(error => alert(error.message))
    }

    const handleForgotPasswordNav = () => {
        navigation.navigate("Reset")        
    }

  return (
    <KeyboardAvoidingView style = {styles.container} behavior = "padding">
        <Text style={styles.headingText}>StructuralAssistant</Text>
        <View style = {styles.inputContainer}>
            <TextInput
                placeholder = "Email"
                value = { email }
                onChangeText = {text => setEmail(text)}
                style = {styles.input}
            />
            <TextInput
                placeholder = "Password"
                value = { password }
                onChangeText = {text => setPassword(text)}
                style = {styles.input}
                secureTextEntry
            />  
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity onPress = {handleLogin} style = {styles.button}>
                <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handleSignUpNav} style = {styles.button}>
                <Text style = {styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPasswordNav}>
                <Text style={styles.forgottenPassword}>Forgot your password?</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
    headingText: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingBottom:75,
        paddingTop:50,
        color: 'darkblue'
      },
    forgottenPassword:{
        fontSize:18,
        textDecorationLine: 'underline',
        paddingTop:15,
        paddingBottom:170,
        color: 'gray'
      }
})