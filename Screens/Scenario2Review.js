import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

// Calculation of design point load.
export function designLoad(deadPointLoad, livePointLoad, deadLoadFactor, liveLoadFactor) {
  const designPointLoad = (deadPointLoad * deadLoadFactor) + (livePointLoad * liveLoadFactor);
  return designPointLoad;
}

// Calculation of unfactored support reactions.
export function calculateSuppReactions(deadPointLoad, livePointLoad, beamDimA, beamDimB) {
  const deadSuppReactionA = (deadPointLoad * beamDimB) / (beamDimA + beamDimB);
  const liveSuppReactionA = (livePointLoad * beamDimB) / (beamDimA + beamDimB);
  const deadSuppReactionB = (deadPointLoad * beamDimA) / (beamDimA + beamDimB);
  const liveSuppReactionB = (livePointLoad * beamDimA) / (beamDimA + beamDimB);
  return [deadSuppReactionA, liveSuppReactionA, deadSuppReactionB, liveSuppReactionB];
}

// Calculation of design bending moment.
export function calculateBendMom(designPointLoad, beamDimA, beamDimB) {
  const designMom = ((designPointLoad * beamDimA * beamDimB) / (beamDimA + beamDimB))
  return designMom;
}

// Calculation of dead and live deflection.
export function calculateDeflection(deadPointLoad, livePointLoad, youngsMod, beamInertia, beamDimA, beamDimB) {
  const dimx = Math.sqrt(((beamDimA) * ((beamDimA + beamDimB) + beamDimB)) / 3);
  const rawdeadDeflection =
    ((deadPointLoad * (beamDimA * 1000) * (beamDimB * 1000)) * ((beamDimA + beamDimB) * 1000 + beamDimB * 1000)) /
    (27 * youngsMod * (beamInertia * 10000) * (beamDimA + beamDimB) * 1000) *
    Math.sqrt(3 * (beamDimA * 1000) * ((beamDimA + beamDimB) + beamDimB) * 1000);
  const rawliveDeflection =
    ((livePointLoad * (beamDimA * 1000) * (beamDimB * 1000)) * ((beamDimA + beamDimB) * 1000 + beamDimB * 1000)) /
    (27 * youngsMod * (beamInertia * 10000) * (beamDimA + beamDimB) * 1000) *
    Math.sqrt(3 * (beamDimA * 1000) * ((beamDimA + beamDimB) + beamDimB) * 1000);
  const deadDeflection = parseFloat(rawdeadDeflection.toFixed(1));
  const liveDeflection = parseFloat(rawliveDeflection.toFixed(1));
  return [deadDeflection, liveDeflection];
}

// Calculation of design shear.
export function calculateShear(designPointLoad) {
  const designShear = designPointLoad / 2;
  return designShear;
}


const Scenario2Review = () => {
  const route = useRoute();
  // Extracting data from the route params.
  const deadPL = route.params?.deadpointload;
  const livePL = route.params?.livepointload;
  const dlFact = route.params?.deadloadfactor;
  const llFact = route.params?.liveloadfactor;
  const ymod = route.params?.youngsmod;
  const binertia = route.params?.beaminertia;
  const bdima = route.params?.beamdima;
  const bdimb = route.params?.beamdimb;

  // State variables for user input, set to passed in calculation data.
  const [deadPointLoad, setDeadPointLoad] = useState(deadPL);
  const [livePointLoad, setLivePointLoad] = useState(livePL);
  const [deadLoadFactor, setDeadLoadFactor] = useState(dlFact);
  const [liveLoadFactor, setLiveLoadFactor] = useState(llFact);
  const [youngsMod, setYoungsMod] = useState(ymod);
  const [beamInertia, setBeamInertia] = useState(binertia);
  const [beamDimA, setBeamDimA] = useState(bdima);
  const [beamDimB, setBeamDimB] = useState(bdimb);
  const [calculationResult, setCalculationResult] = useState(null);

  const livePointLoadRef = useRef(null);
  const deadLoadFactorRef = useRef(null);
  const liveLoadFactorRef = useRef(null);
  const youngsModRef = useRef(null);
  const beamInertiaRef = useRef(null);
  const beamDimARef = useRef(null);
  const beamDimBRef = useRef(null);
  const navigation = useNavigation();

  const calculationDetails = () => {
    Keyboard.dismiss();
    // Parsing of inputs to ensure float.
    const dpLoad = parseFloat(deadPointLoad);
    const lpLoad = parseFloat(livePointLoad);
    const dlFactor = parseFloat(deadLoadFactor);
    const llFactor = parseFloat(liveLoadFactor);
    const yMod = parseFloat(youngsMod);
    const bInertia = parseFloat(beamInertia);
    const bDimA = parseFloat(beamDimA);
    const bDimB = parseFloat(beamDimB);

    if (isNaN(dpLoad) || isNaN(lpLoad) || isNaN(dlFactor) || isNaN(llFactor) || isNaN(yMod) || isNaN(bInertia) || isNaN(bDimA) || isNaN(bDimB)) {
      setCalculationResult('Please enter valid numerical values');
      return;
    }
    // Invoke calculation functions with validated input.
    const [deadSuppReactionA, liveSuppReactionA, deadSuppReactionB, liveSuppReactionB] = calculateSuppReactions(dpLoad, lpLoad, bDimA, bDimB);
    const designPointLoad = designLoad(dpLoad, lpLoad, dlFactor, llFactor);
    const designShear = calculateShear(designPointLoad);
    const designMom = calculateBendMom(designPointLoad, bDimA, bDimB);
    const [deadDeflection, liveDeflection] = calculateDeflection(dpLoad, lpLoad, yMod, bInertia, bDimA, bDimB);

    setCalculationResult({
      designPointLoad,
      deadSuppReactionA,
      liveSuppReactionA,
      deadSuppReactionB,
      liveSuppReactionB,
      designShear,
      designMom,
      deadDeflection,
      liveDeflection,
    });

    handleCalcButtonPress();
  };
  

  const handleCalcButtonPress = () => {
    if (calculationResult) {
      navigation.navigate('Scenario2Results', {
        // Pass results and input parameters to results screen.
        deadsupportreactionA: calculationResult.deadSuppReactionA,
        livesupportreactionA: calculationResult.liveSuppReactionA,
        deadsupportreactionB: calculationResult.deadSuppReactionB,
        livesupportreactionB: calculationResult.liveSuppReactionB,
        designshear: calculationResult.designShear,
        designmoment: calculationResult.designMom,
        deaddeflection: calculationResult.deadDeflection,
        livedeflection: calculationResult.liveDeflection,
        deadpointLoad: deadPointLoad,
        livepointLoad: livePointLoad,
        deadloadFactor: deadLoadFactor,
        liveloadFactor: liveLoadFactor,
        beamdima: beamDimA,
        beamdimb: beamDimB,
        beaminertia: beamInertia,
        youngsmod: youngsMod
      });
    } else {
      alert('Please calculate first before navigating to the results screen.');
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={require('/Users/billynoble/StrucAssistant/images/Scenario2.png')} style={styles.image} />
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

          <Text style={styles.label}>Dimension a (m):</Text>
          <TextInput
            ref={beamDimARef}
            style={styles.input}
            value={beamDimA}
            onChangeText={setBeamDimA}
            placeholder="Enter dimension a (m)"
            keyboardType="numeric"
            onSubmitEditing={calculationDetails}
          />

          <Text style={styles.label}>Dimension b (m):</Text>
          <TextInput
            ref={beamDimBRef}
            style={styles.input}
            value={beamDimB}
            onChangeText={setBeamDimB}
            placeholder="Enter dimension b (m)"
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

export default Scenario2Review;
