/* eslint-disable */
import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

// Components
import MicrophoneIcon from './MicrophoneIcon';
import EditTextIcon from './EditTextIcon';

const maxVolume = 10;

function ModalControls({
  keyboardRef, onTextPress, onTranscriptionResult, recordingActive, setExistingText, setRecordingActive, text,
}) {
  const [currentVolume, setCurrentVolume] = useState(0);
  const [visible, setVisible] = useState(true);

  const movementAnimation = useRef(new Animated.Value(0)).current;
  const fadeShrinkAnimation = useRef(new Animated.Value(0)).current;
  const volumeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const onSpeechResults = (e) => {
      if (e.value) {
        onTranscriptionResult(e.value[0]);
      }
    };
    const onSpeechVolumeChanged = (e) => {
      if (e.value) {
        setCurrentVolume(e.value);
      }
    };
    const onSpeechError = (e) => {
      console.error(e);
    };
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useMemo(() => {
    const startRecording = async () => {
      await Voice.start('en-UK');
    };
    const stopRecording = async () => {
      await Voice.stop();
    };
    try {
      if (recordingActive) {
        startRecording();
      } else {
        stopRecording();
      }
    } catch (e) {
      console.error(e);
    }
  }, [recordingActive]);

  useMemo(() => {
    Animated.timing(volumeAnimation, {
      toValue: recordingActive ? (currentVolume / maxVolume) : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [recordingActive, currentVolume]);

  const toggleRecording = () => {
    if (recordingActive) {
      setRecordingActive(false);
      Animated.timing(movementAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        setVisible(true);
        Animated.timing(fadeShrinkAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      Animated.timing(fadeShrinkAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        setVisible(false);
        setExistingText(text);
        setRecordingActive(true);
        Animated.timing(movementAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          keyboardRef.current.scrollToEnd();
        });
      });
    }
  };

  const animatedFadeShrink = fadeShrinkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const animatedVol = volumeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 4],
  });
  const animatedFlex = {
    flex: movementAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 3],
    }),
  };

  return (
    <Animated.View style={[styles.buttonContainer, animatedFlex]}>
      <Animated.View style={{ transform: [{ scale: animatedVol }] }}>
        <MicrophoneIcon onPress={toggleRecording} recordingActive={recordingActive} />
      </Animated.View>
      { visible && (
      <Animated.View style={{ transform: [{ scale: animatedFadeShrink }], opacity: animatedFadeShrink }}>
        <EditTextIcon onPress={() => onTextPress()} />
      </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ModalControls;
