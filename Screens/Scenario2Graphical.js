import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const Scenario2Graphical = () => {
  const route = useRoute();
  // Extracting data from the route params.
  const deadSuppReactionA = route.params?.deadsupportreactiona;
  const liveSuppReactionA = route.params?.livesupportreactiona;
  const deadSuppReactionB = route.params?.deadsupportreactionb;
  const liveSuppReactionB = route.params?.livesupportreactionb;
  const designShear = route.params?.designshear;
  const designMom = route.params?.designmoment;
  const deadDeflection = route.params?.deaddeflection;
  const liveDeflection = route.params?.livedeflection;
  const deadPointLoad = route.params?.deadPointLoad;
  const livePointLoad = route.params?.livePointLoad;
  const deadLoadFactor = route.params?.deadLoadFactor;
  const liveLoadFactor = route.params?.liveLoadFactor;
  const beamDimA = route.params?.beamDimA;
  const beamDimB = route.params?.beamDimB;
  const beamInertia = route.params?.beamInertia;
  const youngsMod = route.params?.youngsMod;



  return (
    <View style={styles.container}>
      <Image source={require('/Users/billynoble/StrucAssistant/images/Diagram2.png')} style={styles.image} />
      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.8 }]}>Dead Support Reaction @ A:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{deadSuppReactionA} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.8 }]}>Live Support Reaction @ A:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{liveSuppReactionA} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.8 }]}>Dead Support Reaction @ B:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{deadSuppReactionB} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.8 }]}>Live Support Reaction @ B:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{liveSuppReactionB} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.8}]}>Design Shear:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{designShear} kN</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.6 }]}>Design Moment:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{designMom} kNm</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Dead Deflection:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{deadDeflection} mm</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { flex: 0.7 }]}>Live Deflection:</Text>
        <Text style={[styles.resultText, { flex: 0.4 }]}>{liveDeflection} mm</Text>
      </View>
    </View>
  )
}


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
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 340,
    height: 250,
    marginBottom: 10,
    marginTop: 50,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 20, 
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  helpButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100,
  }
})

export default Scenario2Graphical