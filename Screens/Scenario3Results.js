import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const Scenario3Results = ({ navigation }) => {
  const route = useRoute();
  // Extracting data from the route params.
  const deadSuppReaction = route.params?.deadsupportreaction;
  const liveSuppReaction = route.params?.livesupportreaction;
  const designShear = route.params?.designshear;
  const designMom = route.params?.designmoment;
  const deadDeflection = route.params?.deaddeflection;
  const liveDeflection = route.params?.livedeflection;
  const deadLineLoad = route.params?.deadlineload;
  const liveLineLoad = route.params?.livelineload;
  const deadLoadFactor = route.params?.deadloadfactor;
  const liveLoadFactor = route.params?.liveloadfactor;
  const beamSpan = route.params?.beamspan;
  const beamInertia = route.params?.beaminertia;
  const youngsMod = route.params?.youngsmod;

  const handleHelpPress = () =>{
    navigation.navigate('FAQ')
  }

  const handleButtonPress = () =>{
    navigation.navigate('Scenario3Graphical', {
      deadsupportreaction: deadSuppReaction,
      livesupportreaction: liveSuppReaction,
      designshear: designShear,
      designmoment: designMom,
      deaddeflection: deadDeflection,
      livedeflection: liveDeflection,
      beamspan: beamSpan,
      deadlineload: deadLineLoad,
      livelineload: liveLineLoad,
      deadloadfactor: deadLoadFactor,
      liveloadfactor: liveLoadFactor, 
      beaminertia: beamInertia,
      youngsmod: youngsMod,
      Scenario: 3
    })};

  const handleSaveCalculation = () =>{
    //Navigate to next screen to input calculation information.
      navigation.navigate('SaveCalc3', {
      deadsupportreaction: deadSuppReaction,
      livesupportreaction: liveSuppReaction,
      designshear: designShear,
      designmoment: designMom,
      deaddeflection: deadDeflection,
      livedeflection: liveDeflection,
      beamspan: beamSpan,
      deadlineload: deadLineLoad,
      livelineload: liveLineLoad,
      deadloadfactor: deadLoadFactor,
      liveloadfactor: liveLoadFactor, 
      beaminertia: beamInertia,
      youngsmod: youngsMod,
      Scenario: 3
  })};


  return (
    <View style={styles.container}>
      <Image source={require('/Users/billynoble/StrucAssistant/images/Scenario3.png')} style={styles.image} />

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Dead Support Reaction:</Text>
        <Text style={[styles.resultText, { flex: 0.3 }]}>{deadSuppReaction} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Live Support Reaction:</Text>
        <Text style={[styles.resultText, { flex: 0.3 }]}>{liveSuppReaction} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Design Shear:</Text>
        <Text style={[styles.resultText, { flex: 0.3 }]}>{designShear} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Design Moment:</Text>
        <Text style={[styles.resultText, { flex: 0.3 }]}>{designMom} kNm</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Dead Deflection:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{deadDeflection} mm</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Live Deflection:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{liveDeflection} mm</Text>
      </View>

      
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>View Graphical Results</Text>
        </TouchableOpacity>

        <View style={styles.helpButtonContainer}>
          <TouchableOpacity style={[styles.buttonHalf, { marginRight: 8 }]} onPress ={handleHelpPress}>
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHalf} onPress = {handleSaveCalculation}>
            <Text style={styles.buttonText}>Save Calculation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonHalf: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '48%', // Adjust this value as needed to control the space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 340,
    height: 175,
    marginBottom: 10,
    marginTop: 50,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 20, // Adjust this value to set the margin from the top of the screen
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  helpButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Scenario3Results;