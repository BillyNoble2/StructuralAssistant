import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the SplashScreen component
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Set up a timer to navigate to 'MainMenu' after 5000 milliseconds (5 seconds)
    const timer = setTimeout(() => {
      navigation.navigate('MainMenu');
    }, 5000);

    // Clean up the timer when the component unmounts or changes
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>StructuralAssistant</Text>
      <Text style = {styles.subtitle}>Structural Analysis Made Simple!</Text>
    </View>
  );
};

// Set navigationOptions to hide the header for this screen
SplashScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  subtitle: {
    fontSize: 25,
    color: 'darkblue',
  },
});

export default SplashScreen;
