import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Config
import colours from '../config/colours';

function MicrophoneIcon({ onPress, recordingActive }) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      underlayColor={colours.darkGrey}
    >
      <View style={[styles.buttonContainer, recordingActive ? styles.recordingStyle : {}]}>
        <MaterialCommunityIcons name="microphone" size={40} color={colours.lightBlue} />
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
  recordingStyle: {
    backgroundColor: colours.mediumBlue,
    borderWidth: 0,
  },
});

export default React.memo(MicrophoneIcon);
