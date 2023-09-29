import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './app/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MusicInfo from './app/screens/MusicInfo';
import PlayMusic from './app/screens/PlayMusic';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="MusicInfo" options={({ route }) => ({ headerTitle: route.params.title })} component={MusicInfo} />
          <Stack.Screen name="PlayMusic" options={{ headerTitle: '', headerBackTitleVisible: false }} component={PlayMusic} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    // <SafeAreaView style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Home></Home>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
