import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const NewCalc = () => {
  const navigation = useNavigation();

  // Get the route information.
  const route = useRoute();
  // Extract the userId parameter from the route.
  const userID = route.params?.userId;

  const handleScenario1Press = () => {
    navigation.navigate('Scenario1');
  };

  const handleScenario2Press = () => {
    navigation.navigate('Scenario2');
  };

  const handleScenario3Press = () => {
    navigation.navigate('Scenario3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please select desired calculation scenario:</Text>
      <ScrollView contentContainerStyle={styles.containerSelection}>
        <TouchableOpacity onPress={handleScenario1Press}>
          <Image style={styles.image} source={require('/Users/billynoble/StrucAssistant/images/Scenario1.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleScenario2Press}>
          <Image style={styles.image} source={require('/Users/billynoble/StrucAssistant/images/Scenario2.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleScenario3Press}>
          <Image style={styles.image} source={require('/Users/billynoble/StrucAssistant/images/Scenario3.png')} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.blankSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    paddingTop: 25
  },
  containerSelection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    paddingTop: 25,
    paddingBottom: 100
  },
  image: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    width: 350,
    height: 190,
  },
  text: {
    paddingTop: 0,
    paddingBottom: 15,
    paddingLeft: 10,
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  headerContainer: {
    marginTop: 0,
    alignItems:'center',
    paddingTop:30,
  },

  blankSection: {
    height: 150, 
    backgroundColor: 'white',
  },
});

export default NewCalc;
