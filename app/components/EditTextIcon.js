import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Config
import colours from '../config/colours';

function EditTextIcon({ onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      underlayColor={colours.darkGrey}
    >
      <View style={styles.buttonContainer}>
        <MaterialIcons name="edit" size={40} color={colours.lightBlue} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: colours.lightBlue,
    borderRadius: 40,
    borderWidth: 2,
    padding: 10,
  },
});

export default React.memo(EditTextIcon);
