import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard, StyleSheet, PanResponder, Pressable, TextInput, View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import ModalControls from './ModalControls';

// Config
import colours from '../config/colours';
import defaultStyles from '../config/styles';

const panResponder = PanResponder.create({
  onStartShouldSetPanResponderCapture: () => true,
});

function EditableText({ text, onTextChange }) {
  const [transcribedText, setTranscribedText] = useState('');
  const [existingText, setExistingText] = useState('');
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const inputRef = useRef(null);
  const keyboardRef = useRef(null);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardActive(true);
    });
    const keyboardHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardActive(false);
    });
    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  useEffect(() => {
    if (transcribedText) {
      if (existingText) {
        onTextChange(`${existingText}\n${transcribedText}`);
      } else {
        onTextChange(transcribedText);
      }
    }
  }, [transcribedText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, keyboardActive ? styles.editActive : styles.editInactive]}>
        <Pressable style={styles.inputIcon} onPress={Keyboard.dismiss}>
          <MaterialCommunityIcons name="text" size={30} color={colours.lightBlue} />
        </Pressable>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.textContainerContent}
          enableAutoAutomaticScroll
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          keyboardShouldPersistTaps="always"
          ref={keyboardRef}
          scrollEnabled
          style={styles.textContainer}
        >
          <View {...panResponder.panHandlers} style={styles.textContainerContent}>
            <TextInput
              autoFocus={false}
              defaultValue={text}
              editable={!recordingActive}
              keyboardAppearance="dark"
              multiline
              onChangeText={(newText) => onTextChange(newText)}
              ref={inputRef}
              scrollEnabled={false}
              style={styles.text}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      { !keyboardActive
        && (
        <>
          <View style={styles.separator} />
          <ModalControls
            keyboardRef={keyboardRef}
            onTextPress={() => inputRef.current.focus()}
            onTranscriptionResult={(newText) => {
              setTranscribedText(newText);
            }}
            recordingActive={recordingActive}
            setExistingText={setExistingText}
            setRecordingActive={setRecordingActive}
            text={text}
          />
        </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: colours.darkGrey,
    flex: 1,
  },
  editActive: {
    backgroundColor: colours.lightGrey,
  },
  editInactive: {
    backgroundColor: colours.darkGrey,
  },
  inputContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  inputIcon: {
    paddingLeft: 10,
    paddingTop: 20,
  },
  separator: {
    borderBottomColor: colours.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
    marginTop: 10,
  },
  text: {
    alignItems: 'stretch',
    color: colours.white,
    flex: 1,
    fontFamily: defaultStyles.fontFamily,
    fontSize: defaultStyles.fontSizeLarge,
    fontWeight: 'normal',
    height: '100%',
  },
  textContainer: {
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 20,
  },
  textContainerContent: {
    flexGrow: 1,
  },
});

export default EditableText;
