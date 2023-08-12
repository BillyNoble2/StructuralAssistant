import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase';

// Component for displaying a welcome message.
const WelcomeMessage = () => {
  return(
    <View style = {styles.welcome}>
      <Text style = {styles.welcomeText}>Welcome back!</Text>
    </View>
  )
}

// Component for displaying the header.
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>StructuralAssistant</Text>
    </View>
  );
};

const MainMenu = () => {

  // Sign out the user and navigate to the Login screen.
  const handleSignOut = () =>{
    auth.signOut().then(()=>{
        navigation.replace("Login")
    })
    // Show an alert if sign out fails.
    .catch(error => alert(error.message))
  }
  // Initialize useNavigation hook.
  const navigation = useNavigation();

  const handleNewCalcPress = () => {
    navigation.navigate('NewCalc');
  };

  const handleExistCalcPress = () => {
    navigation.navigate('ExistingCalc');
  };

  const handleFAQPress = () => {
    navigation.navigate('FAQ');
  };  

  return (
    <View style={styles.container}>
      <Header />
      <WelcomeMessage />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewCalcPress}>
          <Text style={styles.buttonText}>Start a new calculation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExistCalcPress}>
          <Text style={styles.buttonText}>View Existing Calculations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFAQPress}>
          <Text style={styles.buttonText}>FAQ's</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton} onPress = {handleSignOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
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
    padding: 10,
    width: 350,
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
