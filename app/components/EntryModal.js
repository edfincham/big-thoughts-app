import React, { useMemo, useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

// Components
import EditableText from './EditableText';
import SwipeableModal from './SwipeableModal';
import SaveChangesModal from './SaveChangesModal';

function EntryModal({
  entry, modalVisible, onClose, onSave,
}) {
  const [text, setText] = useState(entry && entry.entryText ? entry.entryText : '');
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);

  const isNewEntry = useMemo(() => Object.keys(entry).length === 0, [entry]);

  const onSaveEntry = () => {
    if (isNewEntry) {
      onSave(null, text);
    } else {
      onSave(entry.id, text);
    }
    onClose();
  };

  const onTextChange = (newText) => {
    setText(newText);
    setSavePrompt(true);
  };

  const onCloseEntry = () => {
    if (savePrompt) {
      setSaveModalVisible(true);
    } else {
      onClose();
    }
  };

  return (
    <SwipeableModal
      children={( // eslint-disable-line react/no-children-prop
        <>
          <EditableText
            text={text}
            onTextChange={onTextChange}
          />
          <SaveChangesModal
            modalVisible={saveModalVisible}
            setModalVisible={setSaveModalVisible}
            onDiscard={() => onClose()}
          />
        </>
      )}
      editControls={(
        <View style={styles.subheader}>
          <TouchableOpacity
            onPress={() => onSaveEntry()}
            underlayColor={colours.darkGrey}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      modalVisible={modalVisible}
      onClose={onCloseEntry}
      headerStyle={styles.header}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveText: {
    color: colours.lightBlue,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeExtraLarge,
    fontWeight: defaultStyles.fontWeight,
  },
  subheader: {
    justifyContent: 'center',
  },
});

export default EntryModal;
