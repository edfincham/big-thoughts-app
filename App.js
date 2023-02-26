import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

// Screens
import CalendarScreen from './app/screens/CalendarScreen';

// Config
import colours from './app/config/colours';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={CalendarScreen}
          options={{
            header: () => ( // eslint-disable-line react/no-unstable-nested-components
              <View style={styles.header} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colours.darkGrey,
    height: 50,
  },
});

export default App;
