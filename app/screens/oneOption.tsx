import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface RememberanceItem {
  title: string;

  content: string;

  note?: string | null;

  virtue?: string | null;
}

interface RememberanceViewerProps {
  rememberance: RememberanceItem[];

  option: string;
}

export default function RememberanceViewer({
  rememberance,

  option,
}: RememberanceViewerProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const [rememberanceIndex, setRememberanceIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSwipe = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;

    setRememberanceIndex((prevIndex) => {
      if (translationX < -50) {
        return (prevIndex + 1) % rememberance.length;
      } else if (translationX > 50) {
        return prevIndex === 0 ? rememberance.length - 1 : prevIndex - 1;
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
          <View style={styles.header}>
            <Text style={styles.title}>
              {rememberance[rememberanceIndex].title}
            </Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.rememberanceBox}>
              <GestureHandlerRootView>
                <ScrollView
                  ref={scrollViewRef}
                  contentContainerStyle={styles.scrollContainer}
                  nestedScrollEnabled={true} // Enable inner scrolling
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.arabic}>
                    {rememberance[rememberanceIndex].content}
                  </Text>
                </ScrollView>
              </GestureHandlerRootView>
            </View>
          </View>

          {(rememberance[rememberanceIndex].note ||
            rememberance[rememberanceIndex].virtue) && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.toggleText}>{option}</Text>
            </TouchableOpacity>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  {rememberance[rememberanceIndex].note ||
                    rememberance[rememberanceIndex].virtue}
                </Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>أغلق</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

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
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: "1%",
    color: "#FF4B4B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mainContent: {
    width: "100%",
    height: "70%",
    alignItems: "center",
  },
  rememberanceBox: {
    backgroundColor: "#161B22",
    marginVertical: "5%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  arabic: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
  },
  toggleButton: {
    padding: 12,
    backgroundColor: "#161B22",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "50%",
  },
  toggleText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF4B4B",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  childrenContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
