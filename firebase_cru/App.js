import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Lista from './Tabs/Lista';
import Agregar from './Tabs/Agregar';
import Detalles from './Tabs/ProductDetalles';



export default function App() {

  const Stack= createNativeStackNavigator();

  
  return (
    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen name="Lista" component={Lista} />
      <Stack.Screen name="Agregar" component={Agregar} />
      <Stack.Screen name="Detalles" component={Detalles}/>
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
