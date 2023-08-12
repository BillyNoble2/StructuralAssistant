import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function designLoad(deadLineLoad, liveLineLoad, deadLoadFactor, liveLoadFactor) {
  const designLineLoad = (deadLineLoad * deadLoadFactor) + (liveLineLoad * liveLoadFactor);
  return designLineLoad;
}

export function calculateSuppReactions(deadLineLoad, liveLineLoad, beamSpan) {
  const deadSuppReaction = (deadLineLoad * beamSpan) / 2;
  const liveSuppReaction = (liveLineLoad * beamSpan) / 2;
  return [deadSuppReaction, liveSuppReaction];
}

export function calculateShear(designLineLoad, beamSpan) {
  const designShear = (designLineLoad * beamSpan) / 2;
  return designShear;
}

export function calculateBendMom(designLineLoad, beamSpan) {
  const designMom = (designLineLoad * (beamSpan * beamSpan)) / 8;
  return designMom;
}

export function calculateDeflection(deadLineLoad, liveLineLoad, youngsMod, beamInertia, beamSpan) {
  const rawdeadDeflection = (5 * ( deadLineLoad * beamSpan ) * ((beamSpan * 1000)*(beamSpan * 1000)*(beamSpan * 1000))) / (384 * youngsMod * beamInertia * 10000);
  const rawliveDeflection = (5 * ( liveLineLoad * beamSpan ) * ((beamSpan * 1000)*(beamSpan * 1000)*(beamSpan * 1000))) / (384 * youngsMod * beamInertia * 10000)
  const deadDeflection = parseFloat(rawdeadDeflection.toFixed(1));
  const liveDeflection = parseFloat(rawliveDeflection.toFixed(1));
  return [deadDeflection, liveDeflection];
}


const Scenario3 = () => {
  const [deadLineLoad, setDeadLineLoad] = useState('');
  const [liveLineLoad, setLiveLineLoad] = useState('');
  const [deadLoadFactor, setDeadLoadFactor] = useState('');
  const [liveLoadFactor, setLiveLoadFactor] = useState('');
  const [youngsMod, setYoungsMod] = useState('');
  const [beamInertia, setBeamInertia] = useState('');
  const [beamSpan, setBeamSpan] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);

  const liveLineLoadRef = useRef(null);
  const deadLineLoadRef = useRef(null);
  const deadLoadFactorRef = useRef(null);
  const liveLoadFactorRef = useRef(null);
  const youngsModRef = useRef(null);
  const beamInertiaRef = useRef(null);
  const beamSpanRef = useRef(null);
  const navigation = useNavigation();

  const calculationDetails = () => {
    Keyboard.dismiss();

    const dpLoad = parseFloat(deadLineLoad);
    const lpLoad = parseFloat(liveLineLoad);
    const dlFactor = parseFloat(deadLoadFactor);
    const llFactor = parseFloat(liveLoadFactor);
    const yMod = parseFloat(youngsMod);
    const bInertia = parseFloat(beamInertia);
    const bSpan = parseFloat(beamSpan);

    if (isNaN(dpLoad) || isNaN(lpLoad) || isNaN(dlFactor) || isNaN(llFactor) || isNaN(yMod) || isNaN(bInertia) || isNaN(bSpan)) {
      setCalculationResult('Please enter valid numerical values');
      return;
    }

    const [deadSuppReaction, liveSuppReaction] = calculateSuppReactions(dpLoad, lpLoad, bSpan);
    const designLineLoad = designLoad(dpLoad, lpLoad, dlFactor, llFactor);
    const designShear = calculateShear(designLineLoad, bSpan);
    const designMom = calculateBendMom(designLineLoad, bSpan);
    const [deadDeflection, liveDeflection] = calculateDeflection(dpLoad, lpLoad, yMod, bInertia, bSpan);

    setCalculationResult({
      designLineLoad,
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
    if (calculationResult) {
      navigation.navigate('Scenario3Results', {
        deadsupportreaction: calculationResult.deadSuppReaction,
        livesupportreaction: calculationResult.liveSuppReaction,
        designshear: calculationResult.designShear,
        designmoment: calculationResult.designMom,
        deaddeflection: calculationResult.deadDeflection,
        livedeflection: calculationResult.liveDeflection,
        deadlineload: deadLineLoad,
        livelineload: liveLineLoad,
        deadloadfactor: deadLoadFactor,
        liveloadfactor: liveLoadFactor,
        beamspan: beamSpan, 
        beaminertia: beamInertia, 
        youngsmod: youngsMod
      });
    } else {
      alert('Please review your input for corectness, once satisfied press calculate again.');
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={require('/Users/billynoble/StrucAssistant/images/Scenario3.png')} style={styles.image} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Dead Line Load [W] (kN):</Text>
          <TextInput
            style={styles.input}
            value={deadLineLoad}
            onChangeText={setDeadLineLoad}
            placeholder="Enter dead line load (kN)"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => liveLineLoadRef.current.focus()}
            blurOnSubmit={false}
          />

          <Text style={styles.label}>Live Line Load [W] (kN):</Text>
          <TextInput
            ref={liveLineLoadRef}
            style={styles.input}
            value={liveLineLoad}
            onChangeText={setLiveLineLoad}
            placeholder="Enter live line load (kN)"
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
            placeholder="Enter beam span (m)"
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

export default Scenario3;
