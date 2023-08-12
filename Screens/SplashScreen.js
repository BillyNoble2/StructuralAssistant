import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainMenu');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>StructuralAssistant</Text>
      <Text style = {styles.subtitle}>Structual Analysis Made Simple!</Text>
    </View>
  );
};

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
