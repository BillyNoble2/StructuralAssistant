import React, {useState} from 'react'
import { View, TextInput, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

function RegisterScreen() {
    // State variables for input fields.
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    // Initialize useNavigation hook.
    const navigation = useNavigation()

    // Function to handle user registration.
    const handleSignUp = () => {
        if (password1 === password2) {
          const password = password1;
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              db.collection("users").add({
                // Adding user data to the Firestore database.
                firstName: fName,
                lastName: lName,
                emailAdd: email,
                userId: user.uid,
              });
              // Navigate to the Login screen after successful registration.
              navigation.replace("Login");
            })
            .catch(error => alert(error.message));
        } else {
          alert("Passwords do not match, please try again");
        }
      };

  return (
    <KeyboardAvoidingView style = {styles.container} behavior = "padding">
        <View style = {styles.inputContainer}>
            <TextInput
                placeholder = "First Name"
                value = { fName }
                onChangeText = {text => setFName(text)}
                style = {styles.input}
            />
            <TextInput
                placeholder = "Last Name"
                value = { lName }
                onChangeText = {text => setLName(text)}
                style = {styles.input}
            />
            <TextInput
                placeholder = "Email"
                value = { email }
                onChangeText = {text => setEmail(text)}
                style = {styles.input}
            />
            <TextInput
                placeholder = "Password"
                value = { password1 }
                onChangeText = {text => setPassword(text)}
                style = {styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder = "Re-type Password"
                value = { password2 }
                onChangeText = {text => setPassword2(text)}
                style = {styles.input}
                secureTextEntry
            />
            <TouchableOpacity onPress = {handleSignUp} style = {styles.button}>
                <Text style = {styles.buttonText}>Register</Text>
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
    headingText: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingBottom:75,
        paddingTop:50,
        color: 'darkblue'
      },
})


export default RegisterScreen