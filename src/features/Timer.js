import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration } from 'react-native';
import { Countdown } from '../components/Countdown';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/color';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubj, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container} >
      <View style={styles.countdown} >
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={setProgress}
          onEnd={onEnd} 
        />

        <View style={{ padding: spacing.lg }} >
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      
      <View style={{ padding: spacing.sm }} >
        <ProgressBar 
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper} >
        {!isStarted && <RoundedButton title='Start' onPress={() => setIsStarted(true)} />}
        {isStarted && <RoundedButton title='Pause' onPress={() => setIsStarted(false)} />}
      </View>

      <View style={styles.clear}>
        <RoundedButton size={50} title='Back' onPress={clearSubj} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flexDirection: 'row',
    flex: 0.1,
    paddingTop: spacing.lg,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  clear: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});