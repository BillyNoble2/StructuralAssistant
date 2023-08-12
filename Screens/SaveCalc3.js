import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { auth, db } from '../firebase'
import { useState } from 'react';

const SaveCalc3 = () => {
    const route = useRoute();
    const deadSuppReaction = route.params?.deadsupportreaction;
    const liveSuppReaction = route.params?.livesupportreaction;
    const designShear = route.params?.designshear;
    const designMom = route.params?.designmoment;
    const deadDeflection = route.params?.deaddeflection;
    const liveDeflection = route.params?.livedeflection;
    const beamSpan = route.params?.beamspan;
    const deadLoadFactor = route.params?.deadloadfactor;
    const liveLoadFactor = route.params?.liveloadfactor;
    const deadLineLoad = route.params?.deadlineload;
    const liveLineLoad = route.params?.livelineload;
    const beamInertia = route.params?.beaminertia;
    const youngsMod = route.params?.youngsmod;

    const [calcRef, setCalcRef] = useState('');
    const [calcTitle, setCalcTitle] = useState('');
    const [contractNo, setContractNo] = useState('');
    const [contractName, setContractName] = useState('');
    const [notes, setNotes] = useState('');


    const navigation = useNavigation();


    const handleSaveCalculation = () => {
        const calculationData = {
            calcRef: calcRef,
            calcTitle: calcTitle,
            contractNo: contractNo,
            contractName: contractName,
            notes: notes,
            deadSuppReaction: deadSuppReaction,
            liveSuppReaction: liveSuppReaction,
            deadLoadFactor: deadLoadFactor,
            beamspan: beamSpan,
            userId: auth.currentUser.uid,
            deadLoadFactor: deadLoadFactor,
            liveLoadFactor: liveLoadFactor,
            deadLineLoad: deadLineLoad,
            liveLineLoad: liveLineLoad,
            beamInertia: beamInertia,
            youngsMod: youngsMod,
            Scenario: 2
        };
        db.collection("Calculations")
        .add(calculationData)

        alert("Your calculation has been saved.")

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
                keyboardType="String"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Calculation Title:</Text>
            <TextInput
                style={styles.input}
                value={calcTitle}
                onChangeText={setCalcTitle}
                placeholder="Calculation Title"
                keyboardType="String"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Contract Number:</Text>
            <TextInput
                style={styles.input}
                value={contractNo}
                onChangeText={setContractNo}
                placeholder="Contract Number"
                keyboardType="String"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Contract Name:</Text>
            <TextInput
                style={styles.input}
                value={contractName}
                onChangeText={setContractName}
                placeholder="Contract Name"
                keyboardType="String"
                returnKeyType="next"
                blurOnSubmit={false}
            />

            <Text style={styles.label}>Notes:</Text>
            <TextInput
                style={styles.inputNotes}
                value={notes}
                onChangeText={setNotes}
                placeholder=""
                keyboardType="String"
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
export default SaveCalc3