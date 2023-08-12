import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const SaveCalc2 = () => {
    const route = useRoute();
    // Extracting data from the route params.
    const deadSuppReactionA = route.params?.deadsupportreactiona;
    const deadSuppReactionB = route.params?.deadsupportreactionb;
    const liveSuppReactionA = route.params?.livesupportreactiona;
    const liveSuppReactionB = route.params?.livesupportreactionb;
    const beamDimA = route.params?.beamdima;
    const beamDimB = route.params?.beamdimb;
    const deadLoadFactor = route.params?.deadloadfactor;
    const liveLoadFactor = route.params?.liveloadfactor;
    const deadPointLoad = route.params?.deadpointload;
    const livePointLoad = route.params?.livepointload;
    const beamInertia = route.params?.beaminertia;
    const youngsMod = route.params?.youngsmod;
    // State variables for user input
    const [calcRef, setCalcRef] = useState('');
    const [calcTitle, setCalcTitle] = useState('');
    const [contractNo, setContractNo] = useState('');
    const [contractName, setContractName] = useState('');
    const [notes, setNotes] = useState('');
    const navigation = useNavigation();

    // Function to handle saving the calculation data to the database
    const handleSaveCalculation = () => {
        const calculationData = {
            calcRef: calcRef,
            calcTitle: calcTitle,
            contractNo: contractNo,
            contractName: contractName,
            notes: notes,
            deadSuppReactionA: deadSuppReactionA,
            liveSuppReactionA: liveSuppReactionA,
            liveSuppReactionB: liveSuppReactionB,
            deadSuppReactionB: deadSuppReactionB,
            deadLoadFactor: deadLoadFactor,
            beamdima: beamDimA,
            beamdimb: beamDimB,
            userId: auth.currentUser.uid,
            liveLoadFactor: liveLoadFactor,
            deadPointLoad: deadPointLoad,
            livePointLoad: livePointLoad,
            beamInertia: beamInertia,
            youngsMod: youngsMod,
            scenario: 2
        };
        // Adding calculation data to the "Calculations" collection in the database
        db.collection("Calculations")
        .add(calculationData)
        alert("Your calculation has been saved.")
        // Navigate back to the main menu after saving
        navigation.navigate('MainMenu')
    };


    return(
        <View style = {styles.container}>
            <Text style={styles.label}>Calculation Reference:</Text>
            <TextInput
                style={styles.input}
                value={calcRef}
                onChangeText={setCalcRef}
                placeholder="Calculation Reference"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Calculation Title:</Text>
            <TextInput
                style={styles.input}
                value={calcTitle}
                onChangeText={setCalcTitle}
                placeholder="Calculation Title"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Contract Number:</Text>
            <TextInput
                style={styles.input}
                value={contractNo}
                onChangeText={setContractNo}
                placeholder="Contract Number"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Contract Name:</Text>
            <TextInput
                style={styles.input}
                value={contractName}
                onChangeText={setContractName}
                placeholder="Contract Name"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Notes:</Text>
            <TextInput
                style={styles.inputNotes}
                value={notes}
                onChangeText={setNotes}
                placeholder=""
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <TouchableOpacity style={styles.button} onPress = {handleSaveCalculation}>
                <Text style={styles.buttonText}>Save Calculation</Text>
            </TouchableOpacity>

        </View>
    )
}
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
    inputNotes: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 50,
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
export default SaveCalc2