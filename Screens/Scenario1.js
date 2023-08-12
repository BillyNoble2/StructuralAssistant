import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export function designLoad(deadPointLoad, livePointLoad, deadLoadFactor, liveLoadFactor) {
  const designPointLoad = deadPointLoad * deadLoadFactor + livePointLoad * liveLoadFactor;
  return designPointLoad;
}

export function calculateSuppReactions(deadPointLoad, livePointLoad) {
  const deadSuppReaction = deadPointLoad / 2;
  const liveSuppReaction = livePointLoad / 2;
  return [deadSuppReaction, liveSuppReaction];
}

export function calculateShear(designPointLoad) {
  const designShear = designPointLoad / 2;
  return designShear;
}

export function calculateBendMom(designPointLoad, beamSpan) {
  const designMom = (designPointLoad * beamSpan) / 4;
  return designMom;
}

export function calculateDeflection(deadPointLoad, livePointLoad, youngsMod, beamInertia, beamSpan) {
  const rawdeadDeflection = (deadPointLoad * Math.pow(beamSpan * 1000, 3)) / (48 * youngsMod * beamInertia * 10000);
  const rawliveDeflection = (livePointLoad * Math.pow(beamSpan * 1000, 3)) / (48 * youngsMod * beamInertia * 10000);
  const deadDeflection = parseFloat(rawdeadDeflection.toFixed(1));
  const liveDeflection = parseFloat(rawliveDeflection.toFixed(1));
  return [deadDeflection, liveDeflection];
}

var calculatePressCounter = 0;

const Scenario1 = () => {
  const [deadPointLoad, setDeadPointLoad] = useState('');
  const [livePointLoad, setLivePointLoad] = useState('');
  const [deadLoadFactor, setDeadLoadFactor] = useState('');
  const [liveLoadFactor, setLiveLoadFactor] = useState('');
  const [youngsMod, setYoungsMod] = useState('');
  const [beamInertia, setBeamInertia] = useState('');
  const [beamSpan, setBeamSpan] = useState('');

  const livePointLoadRef = useRef(null);
  const deadLoadFactorRef = useRef(null);
  const liveLoadFactorRef = useRef(null);
  const youngsModRef = useRef(null);
  const beamInertiaRef = useRef(null);
  const beamSpanRef = useRef(null);
  const navigation = useNavigation();
  const [calculationResult, setCalculationResult] = useState(null);


  const calculationDetails = () => {
    Keyboard.dismiss();
  
    const dpLoad = parseFloat(deadPointLoad);
    const lpLoad = parseFloat(livePointLoad);
    const dlFactor = parseFloat(deadLoadFactor);
    const llFactor = parseFloat(liveLoadFactor);
    const yMod = parseFloat(youngsMod);
    const bInertia = parseFloat(beamInertia);
    const bSpan = parseFloat(beamSpan);
  
    if (isNaN(dpLoad) || isNaN(lpLoad) || isNaN(dlFactor) || isNaN(llFactor) || isNaN(yMod) || isNaN(bInertia) || isNaN(bSpan)) {
      setCalculationResult('Please enter valid numerical values');
      return;
    }
  
    const [deadSuppReaction, liveSuppReaction] = calculateSuppReactions(dpLoad, lpLoad);
    const designPointLoad = designLoad(dpLoad, lpLoad, dlFactor, llFactor);
    const designShear = calculateShear(designPointLoad);
    const designMom = calculateBendMom(designPointLoad, bSpan);
    const [deadDeflection, liveDeflection] = calculateDeflection(dpLoad, lpLoad, yMod, bInertia, bSpan);
  
    setCalculationResult({
      designPointLoad,
      deadSuppReaction,
      liveSuppReaction,
      designShear,
      designMom,
      deadDeflection,
      liveDeflection,
    });

    handleCalcButtonPress();
  };
  

  const handleCalcButtonPress = () => {  
    if(calculationResult) {
      navigation.navigate('Scenario1Results', {
        deadsupportreaction: calculationResult.deadSuppReaction,
        livesupportreaction: calculationResult.liveSuppReaction,
        designshear: calculationResult.designShear,
        designmoment: calculationResult.designMom,
        deaddeflection: calculationResult.deadDeflection,
        livedeflection: calculationResult.liveDeflection,
        beamspan: beamSpan,
        deadLoadFactor: deadLoadFactor,
        liveLoadFactor: liveLoadFactor,
        deadPointLoad: deadPointLoad,
        livePointLoad: livePointLoad,
        beamInertia: beamInertia, 
        youngsMod: youngsMod,
      })
    }
    else {
      alert('Please review your input for corectness, once satisfied press calculate again.');
      }
    }
  


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={require('/Users/billynoble/StrucAssistant/images/Scenario1.png')} style={styles.image} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Dead Point Load [P] (kN):</Text>
          <TextInput
            style={styles.input}
            value={deadPointLoad}
            onChangeText={setDeadPointLoad}
            placeholder="Enter dead point load (kN)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => livePointLoadRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Live Point Load [P] (kN):</Text>
          <TextInput
            ref={livePointLoadRef}
            style={styles.input}
            value={livePointLoad}
            onChangeText={setLivePointLoad}
            placeholder="Enter live point load (kN)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => deadLoadFactorRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Dead Load Factor:</Text>
          <TextInput
            ref={deadLoadFactorRef}
            style={styles.input}
            value={deadLoadFactor}
            onChangeText={setDeadLoadFactor}
            placeholder="Enter dead load factor"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => liveLoadFactorRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Live Load Factor:</Text>
          <TextInput
            ref={liveLoadFactorRef}
            style={styles.input}
            value={liveLoadFactor}
            onChangeText={setLiveLoadFactor}
            placeholder="Enter live load factor"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => youngsModRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Beam Span [L] (m):</Text>
          <TextInput
            ref={beamSpanRef}
            style={styles.input}
            value={beamSpan}
            onChangeText={setBeamSpan}
            placeholder = "Beam Span (m)"
            keyboardType="numeric"
            onSubmitEditing={calculationDetails}
          />

          <Text style={styles.label}>Youngs Modulus (N/mm^2):</Text>
          <TextInput
            ref={youngsModRef}
            style={styles.input}
            value={youngsMod}
            onChangeText={setYoungsMod}
            placeholder="Enter youngs modulus (N/mm^2)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => beamInertiaRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Beam Inertia (cm^4):</Text>
          <TextInput
            ref={beamInertiaRef}
            style={styles.input}
            value={beamInertia}
            onChangeText={setBeamInertia}
            placeholder="Enter beam inertia (cm^4)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => beamSpanRef.current.focus()}
            blurOnSubmit={false}
          />

          <TouchableOpacity style={styles.button} onPress={calculationDetails}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom:50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  },
  image:{
    width:340,
    height: 175,
    marginBottom:10
  }
});
export default Scenario1;
