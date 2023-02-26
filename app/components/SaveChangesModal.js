import React from 'react';
import {
  Modal, StyleSheet, Text, Pressable, View,
} from 'react-native';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

function SaveChangesModal({ modalVisible, setModalVisible, onDiscard }) {
  const onDiscardChanges = () => {
    setModalVisible(!modalVisible);
    onDiscard();
  };

  const onKeepEditing = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonDiscard]}
            onPress={() => onDiscardChanges()}
          >
            <Text style={styles.textStyle}>Discard Changes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonKeepEditing]}
            onPress={() => onKeepEditing()}
          >
            <Text style={styles.textStyle}>Keep Editing</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 20,
    width: '90%',
  },
  buttonDiscard: {
    backgroundColor: colours.brightRed,
    marginTop: 20,
  },
  buttonKeepEditing: {
    backgroundColor: colours.lightBlue,
  },
  centeredView: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colours.transparent,
    borderRadius: 20,
    flex: 1,
    paddingBottom: 20,
  },
  textStyle: {
    color: colours.lightGrey,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeExtraLarge,
    fontWeight: defaultStyles.fontWeight,
    textAlign: 'center',
  },
});

export default React.memo(SaveChangesModal);
