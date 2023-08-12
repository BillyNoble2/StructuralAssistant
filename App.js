import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import LoginScreen from './Screens/LoginScreen';
import ResetPassword from './Screens/ResetPassword';
import RegisterScreen from './Screens/RegisterScreen';
import MainMenu from './Screens/MainMenu';
import NewCalc from './Screens/NewCalc';
import Scenario1 from './Screens/Scenario1';
import Scenario1Results from './Screens/Scenario1Results';
import Scenario2 from './Screens/Scenario2';
import Scenario2Results from './Screens/Scenario2Results';
import Scenario3 from './Screens/Scenario3';
import Scenario3Results from './Screens/Scenario3Results';
import FAQ from './Screens/FAQ';
import Scenario1Graphical from './Screens/Scenario1Graphical';
import SaveCalc from './Screens/SaveCalc';
import SaveCalc2 from './Screens/SaveCalc2';
import SaveCalc3 from './Screens/SaveCalc3';
import ExistingCalc from './Screens/ExistingCalc';
import SplashScreen from './Screens/SplashScreen';
import Scenario2Graphical from './Screens/Scenario2Graphical';
import Scenario3Graphical from './Screens/Scenario3Graphical';
import Scenario1Review from './Screens/Scenario1Review';
import Scenario2Review from './Screens/Scenario2Review';
import Scenario3Review from './Screens/Scenario3Review';





const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        ) : (
          <>
        <Stack.Screen options = {{headerShown : false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Reset" component={ResetPassword} options = {{title: "Reset Your Password"}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options = {{title: "Register For An Account"}}/>
        <Stack.Screen options = {{headerShown : false}} name="MainMenu" component={MainMenu} />
        <Stack.Screen options = {{headerShown : true, title: "Create a New Calculation"}} name="NewCalc" component={NewCalc} />
        <Stack.Screen name="Scenario1" component={Scenario1} options = {{title: 'Analysis Scenario 1'}}/>
        <Stack.Screen name="Scenario1Results" component={Scenario1Results} options = {{title: 'Analysis Results'}}/>
        <Stack.Screen name="Scenario2" component={Scenario2} options = {{title: 'Analysis Scenario 2'}}/>
        <Stack.Screen name="Scenario2Results" component={Scenario2Results} options = {{title: 'Analysis Results'}}/>
        <Stack.Screen name="Scenario2Graphical" component = {Scenario2Graphical} options = {{title: 'Graphical Results'}}/>
        <Stack.Screen name="Scenario3Graphical" component = {Scenario3Graphical} options = {{title: 'Graphical Results'}}/>
        <Stack.Screen name="Scenario3" component={Scenario3} options = {{title: 'Analysis Scenario 3'}}/>
        <Stack.Screen name="Scenario3Results" component={Scenario3Results} options = {{title: 'Analysis Results'}}/>
        <Stack.Screen name="FAQ" component = {FAQ} options = {{title: 'Frequently Asked Questions'}}/>
        <Stack.Screen name="Scenario1Graphical" component = {Scenario1Graphical} options = {{title: 'Graphical Results'}}/>
        <Stack.Screen name="SaveCalc" component = {SaveCalc} options = {{title: 'Save Calculation'}}/>
        <Stack.Screen name="SaveCalc2" component = {SaveCalc2} options = {{title: 'Save Calculation'}}/>
        <Stack.Screen name="SaveCalc3" component = {SaveCalc3} options = {{title: 'Save Calculation'}}/>
        <Stack.Screen name="ExistingCalc" component = {ExistingCalc} options = {{title: 'Your Existing Calculations'}}/>

        <Stack.Screen name="Scenario1Review" component={Scenario1Review} options = {{title: 'Analysis Scenario 1'}}/>
        <Stack.Screen name="Scenario2Review" component={Scenario2Review} options = {{title: 'Analysis Scenario 2'}}/>
        <Stack.Screen name="Scenario3Review" component={Scenario3Review} options = {{title: 'Analysis Scenario 3'}}/>


      </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
