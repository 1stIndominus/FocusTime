import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { colors } from './src/utils/color'
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';

export default function App() {
  const [currSubj, setCurrSubj] = useState();
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currSubj ? (
        <>
          <Focus addSubject={setCurrSubj} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer 
          focusSubject={currSubj}
          onTimerEnd={(subject) => {
            setHistory([...history, subject])
          }}
          clearSubj={() => setCurrSubj(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
