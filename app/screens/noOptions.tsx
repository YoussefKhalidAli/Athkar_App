import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface rememberance {
  title: string;
  content: string;
}

interface RememberancesViewerProps {
  rememberances: rememberance[];
}

const RememberanceViewer: React.FC<RememberancesViewerProps> = ({
  rememberances,
}) => {
  const [rememberanceIndex, setRememberanceIndex] = useState(0);

  const handleSwipe = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    setRememberanceIndex((prevIndex) => {
      if (translationX < -50) {
        return (prevIndex + 1) % rememberances.length;
      } else if (translationX > 50) {
        return prevIndex === 0 ? rememberances.length - 1 : prevIndex - 1;
      }
      return prevIndex;
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onHandlerStateChange={handleSwipe}
        activeOffsetX={[-10, 10]}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {rememberances[rememberanceIndex]?.title}
          </Text>
          <View style={styles.mainContent}>
            <View style={styles.rememberanceBox}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.arabic}>
                  {rememberances[rememberanceIndex]?.content}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginTop: "10%",
    color: "#FF4B4B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  mainContent: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  rememberanceBox: {
    backgroundColor: "#161B22",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxHeight: "90%",
  },
  arabic: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
  },
});

export default RememberanceViewer;
