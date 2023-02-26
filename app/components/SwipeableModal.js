import React from 'react';
import {
  Modal, StyleSheet, Pressable, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Config
import colours from '../config/colours';

function SwipeableModal({
  backgroundStyle, children, editControls, headerStyle, modalVisible, onClose,
}) {
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={[styles.background, backgroundStyle]}>
        <View style={[styles.header, headerStyle]}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={25} color={colours.white} />
          </Pressable>
          { editControls }
        </View>
        <View style={styles.body}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colours.darkGrey,
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    backgroundColor: colours.darkGrey,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default SwipeableModal;
