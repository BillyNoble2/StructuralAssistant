import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const FAQ = () => {
  const [activeSections, setActiveSections] = useState([]);

  // Data for questions and answers.
  const FAQData = [
    {
      question: 'What is StructuralAssistant?',
      answer: 'StructuralAssistant is a mobile application designed for structural engineers and students to perform beam calculations quickly and accurately.',
    },
    {
      question: 'Is StructuralAssitant suitable for professional engineers?',
      answer: 'Yes, StructuralAssistant caters to both professional structural engineers and engineering students. It offers a user-friendly interface and provides accurate results for safety-critical calculations.',
    },
    {
        question: 'Is my data safe with StructuralAssistant?',
        answer: 'Yes, data safety is of the highest importance. Calculation data is encrypted and stored securely on the cloud',
      },
      {
        question: 'Are support reactions factored?',
        answer: 'No, support reactions are unfactored.',
      },
      {
        question: 'Is StructuralAssistant free to use?',
        answer: 'Absolutely, all features of StructuralAssistant are available for free!',
      },
      {
        question: 'How can I contact the support team?',
        answer: 'The StructuralAssistant support team are always on hand for questions and suggestions. Please email support@structuralassistant.com to get in touch.',
      },
  ];

  // Function to render the header of each accordion section.
  const renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.header, isActive && styles.activeHeader]}>
        <Text style={[styles.headerText, isActive && styles.activeHeaderText]}>
          {section.question}
        </Text>
        <Image
          source={isActive ? require('../images/arrow_up.png') : require('../images/arrow_down.png')}
          style={styles.arrowIcon}
        />
      </View>
    );
  };

  // Function to render the content of each accordion section.
  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.answer}</Text>
      </View>
    );
  };

  // Function to update the active sections in the accordion.
  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={styles.container}>
      <Accordion
        sections={FAQData}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        touchableComponent={TouchableOpacity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  activeHeader: {
    // Color for the header when active.
    backgroundColor: 'darkblue',
  },
  activeHeaderText: {
    // Color for the header text when active.
    color: 'white', 
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#888',
  },
  content: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default FAQ;