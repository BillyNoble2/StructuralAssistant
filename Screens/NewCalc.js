import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ImageComponent = ({ source }) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <Image source={source} style={[styles.image, { width: screenWidth * 0.8 }]} resizeMode="contain" />
  );
};

const NewCalc = () => {
  const navigation = useNavigation();

  const route = useRoute();
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


  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>StructuralAssistant</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
        <Header />
      <Text style={styles.text}>Please select the desired scenario</Text>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    fontSize: 18,
  },
  headerContainer: {
    marginTop: 0,
    alignItems:'center',
    paddingTop:30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'darkblue',
  },
  blankSection: {
    height: 200, // Adjust the height as needed to block off the desired space
    backgroundColor: 'white',
  },
});

export default NewCalc;
