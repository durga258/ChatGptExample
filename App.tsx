import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddingKeysScreen from './src/screens/AddingKeysScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={LoginScreen} />
    <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen} />
    <Stack.Screen options={{headerShown:false}} name="AddingKeysScreen" component={AddingKeysScreen} />
      <Stack.Screen options={{headerShown:false}} name="SignupScreen" component={SignupScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
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
