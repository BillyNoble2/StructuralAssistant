import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase';


const WelcomeMessage = () => {
  return(
    <View style = {styles.welcome}>
      <Text style = {styles.welcomeText}>Welcome back!</Text>
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>StructuralAssistant</Text>
    </View>
  );
};

const MainMenu = () => {

  const handleSignOut = () =>{
    auth.signOut().then(()=>{
        navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  const navigation = useNavigation();

  const handleButton1Press = () => {
    navigation.navigate('NewCalc');
  };

  const handleButton2Press = () => {
    navigation.navigate('ExistingCalc');
  };

  const handleButton3Press = () => {
    navigation.navigate('FAQ');
  };  
  
  const handleButton4Press = () => {
    navigation.navigate('MyAccount');
  };

  return (
    <View style={styles.container}>
      <Header />
      <WelcomeMessage />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
          <Text style={styles.buttonText}>Start a new calculation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>View Existing Calculations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton3Press}>
          <Text style={styles.buttonText}>FAQ's</Text>
        </TouchableOpacity>
        <View style={styles.additionalButtonsContainer}>
          <TouchableOpacity style={styles.additionalButton} onPress = {handleButton4Press}>
            <Text style={styles.buttonText}>My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton} onPress = {handleSignOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'white'
  },
  headerContainer: {
    marginTop: 50,
    alignItems:'center',
    paddingTop:30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color:'darkblue',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 70
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
    padding: 20,
  },
  additionalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 20,
  },
  additionalButton: {
    backgroundColor: 'darkblue',
    borderRadius: 30,
    padding: 5,
    width: 160,
    alignItems: 'center',
  },
  welcome:{
    paddingTop:50
  },
  welcomeText:{
    fontSize:18,
    fontWeight: 'bold'
  }
});

export default MainMenu;
