import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

// Component to display each individual calculation item.
const CalculationItem = ({ id, calcRef, calcTitle, contractName, contractNo, notes, scenario, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(id)}>
      <Text>Calculation Ref: {calcRef}</Text>
      <Text>Calculation Title: {calcTitle}</Text>
      <Text>Contract Name: {contractName}</Text>
      <Text>Contract No: {contractNo}</Text>
      <Text>Scenario: {scenario}</Text>
      <Text>Notes: {notes}</Text>
    </TouchableOpacity>
  );
};

const ExistingCalc = () => {
  // Store the list of calculations.
  const [calculations, setCalculations] = useState([]);
  // Track the selected calculations ID.
  const [selectedCalcId, setSelectedCalcId] = useState(null);

  const userId = auth.currentUser?.uid;
  // Initialize useNavigation hook.
  const navigation = useNavigation(); 

  // Fetch calculations from Firestore based on the user's ID.
  useEffect(() => {
    if (userId) {
      db.collection('Calculations')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
          const calculationsData = [];
          querySnapshot.forEach((doc) => {
            // Extract calculation details and add to the local state.
            calculationsData.push({
              id: doc.id,
              calcRef: doc.data().calcRef,
              calcTitle: doc.data().calcTitle,
              contractName: doc.data().contractName,
              contractNo: doc.data().contractNo,
              notes: doc.data().notes,
              beamSpan: doc.data().beamSpan, 
              scenario: doc.data().scenario,
            });
          });
          setCalculations(calculationsData);
        })
        .catch((error) => {
          console.log('Error getting documents:', error);
        });
    }
  }, [userId]);

  // Function to open the popup menu for a calculation.
  const handleOpenMenu = (calcId) => {
    setSelectedCalcId(calcId);
  };

  // Function to close the popup menu.
  const handleCloseMenu = () => {
    setSelectedCalcId(null);
  };

  // Function to delete a calculation.
  const handleDeleteCalculation = (calcId) => {
    // Perform the deletion of the calculation in Firestore and update the local state.
    db.collection('Calculations')
      .doc(calcId)
      .delete()
      .then(() => {
        alert("Calculation successfully deleted!");
        // Remove the deleted calculation from the local state to update the UI.
        setCalculations((prevCalculations) =>
          prevCalculations.filter((calculation) => calculation.id !== calcId)
        );
        // Close the popup menu after the deletion.
        setSelectedCalcId(null);
      })
      .catch((error) => {
        console.error('Error deleting calculation:', error);
      });
  };


  // Function to view a calculation's details.
  const handleViewCalculation = (calcId) => {
    // Fetch calculation data from Firestore.
    db.collection('Calculations')
      .doc(calcId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          scenarioOut = data.scenario; 
          deadPointLoadIn = data.deadPointLoad;
          deadLoadFactorIn = data.deadLoadFactor;
          livePointLoadIn = data.livePointLoad;
          liveLoadFactorIn = data.liveLoadFactor;
          beamSpanIn = data.beamspan;
          youngsModIn = data.youngsMod;
          beamInertiaIn = data.beamInertia;
          beamDimAIn = data.beamdima;
          beamDimBIn = data.beamdimb;
          liveLineLoadIn = data.liveLineLoad;
          deadLineLoadIn = data.deadLineLoad;
          // Extract various calculation parameters for different scenarios.
          // Navigate to the corresponding review screen based on the scenario.
          if (scenarioOut === 1){
          navigation.navigate('Scenario1Review', {
            // Pass extracted parameters to the review screen.
            calcid: calcId,
            scenario: scenarioOut,
            deadpointload: deadPointLoadIn,
            livepointload: livePointLoadIn,
            deadloadfactor: deadLoadFactorIn,
            liveloadfactor: liveLoadFactorIn,
            beamspan: beamSpanIn,
            youngsmod: youngsModIn,
            beaminertia: beamInertiaIn
          });
        } 

          if (scenarioOut === 2){
            navigation.navigate('Scenario2Review',{
              deadpointload: deadPointLoadIn,
              livepointload: livePointLoadIn,
              deadloadfactor: deadLoadFactorIn, 
              liveloadfactor: liveLoadFactorIn,
              beamdima: beamDimAIn,
              beamdimb: beamDimBIn,
              youngsmod: youngsModIn,
              beaminertia: beamInertiaIn
            });
          } 

          if(scenarioOut === 3){
            navigation.navigate('Scenario3Review',{
              calcid: calcId,
              deadlineload: deadLineLoadIn,
              livelineload: liveLineLoadIn,
              deadloadfactor: deadLoadFactorIn,
              liveloadfactor: liveLoadFactorIn,
              beamspan: beamSpanIn,
              youngsmod: youngsModIn,
              beaminertia: beamInertiaIn
            })
          }
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      })
      .finally(() => {
        // Close the popup menu after navigating (whether successful or not)
        setSelectedCalcId(null);
      });
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style = {styles.intro}>Select a calculation to view/edit or delete.</Text>
      <FlatList
        data={calculations}
        renderItem={({ item }) => (
          <CalculationItem
            id={item.id}
            calcRef={item.calcRef}
            calcTitle={item.calcTitle}
            contractName={item.contractName}
            contractNo={item.contractNo}
            notes={item.notes}
            scenario = {item.scenario}
            onPress={handleOpenMenu}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Popup Menu */}
      <Modal visible={selectedCalcId !== null} animationType="slide" transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={handleCloseMenu}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={() => handleViewCalculation(selectedCalcId)}>
              <Text style={styles.menuText}>View Calculation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteCalculation(selectedCalcId)}>
              <Text style={styles.menuText}>Delete Calculation</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  menuText: {
    fontSize: 20,
    padding: 10,
  },
  intro: {
    fontSize:20,
    paddingBottom:20
  }
});

export default ExistingCalc;
