import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const CalculationItem = ({ id, calcRef, calcTitle, contractName, contractNo, notes, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(id)}>
      <Text>ID: {id}</Text>
      <Text>Calculation Ref: {calcRef}</Text>
      <Text>Calculation Title: {calcTitle}</Text>
      <Text>Contract Name: {contractName}</Text>
      <Text>Contract No: {contractNo}</Text>
      <Text>Notes: {notes}</Text>
    </TouchableOpacity>
  );
};

const ExistingCalc = () => {
  const [calculations, setCalculations] = useState([]);
  const [selectedCalcId, setSelectedCalcId] = useState(null);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation(); // Initialize useNavigation hook

  useEffect(() => {
    if (userId) {
      db.collection('Calculations')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
          const calculationsData = [];
          querySnapshot.forEach((doc) => {
            calculationsData.push({
              id: doc.id,
              calcRef: doc.data().calcRef,
              calcTitle: doc.data().calcTitle,
              contractName: doc.data().contractName,
              contractNo: doc.data().contractNo,
              notes: doc.data().notes,
              beamSpan: doc.data().beamSpan, // Add the beamSpan to the calculation data
            });
          });
          setCalculations(calculationsData);
        })
        .catch((error) => {
          console.log('Error getting documents:', error);
        });
    }
  }, [userId]);

  const handleOpenMenu = (calcId) => {
    setSelectedCalcId(calcId);
  };

  const handleCloseMenu = () => {
    setSelectedCalcId(null);
  };

  const handleDeleteCalculation = (calcId) => {
    // Perform the deletion of the calculation in Firestore and update the local state
    db.collection('Calculations')
      .doc(calcId)
      .delete()
      .then(() => {
        console.log('Calculation deleted successfully!');
        // Remove the deleted calculation from the local state to update the UI
        setCalculations((prevCalculations) =>
          prevCalculations.filter((calculation) => calculation.id !== calcId)
        );
        // Close the popup menu after the deletion
        setSelectedCalcId(null);
      })
      .catch((error) => {
        console.error('Error deleting calculation:', error);
      });
  };

  const handleViewCalculation = (calculation) => {
    // Navigate to the calculation parameter input screen and pass the parameters
    navigation.navigate('Scenario1', {
      calcRef: calculation.calcRef,
      calcTitle: calculation.calcTitle,
      contractName: calculation.contractName,
      contractNo: calculation.contractNo,
      notes: calculation.notes,
      beamSpan: calculation.beamSpan,
    });
    // Close the popup menu after navigating
    setSelectedCalcId(null);
  };

  return (
    <View style={styles.container}>
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
            onPress={handleOpenMenu}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Popup Menu */}
      <Modal visible={selectedCalcId !== null} animationType="slide" transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={handleCloseMenu}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={() => handleViewCalculation(selectedCalculation)}>
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
});

export default ExistingCalc;
