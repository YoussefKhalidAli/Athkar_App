import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";

type ButtonType = "note" | "virtue" | null;

type RememberanceItem = {
  title: string;
  repetition: number;
  content: string;
  notes?: string | null;
  virtue?: string | null;
};

type RememberanceViewerProps = {
  rememberances: RememberanceItem[];
};

export default function RememberanceViewer({
  rememberances,
}: RememberanceViewerProps) {
  const scrollContainer = useRef<ScrollView>(null);

  const [selectedButton, setSelectedButton] = useState<ButtonType>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rememberanceIndex, setRememberanceIndex] = useState(0);
  const [count, setCount] = useState(
    rememberances[rememberanceIndex].repetition
  );

  const handleNextRememberance = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    } else {
      setRememberanceIndex(
        (prevIndex) => (prevIndex + 1) % rememberances.length
      );
    }
  };

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

  useEffect(() => {
    setCount(rememberances[rememberanceIndex].repetition);
  }, [rememberanceIndex]);

  const toggleButton = (buttonType: ButtonType) => {
    if (selectedButton === buttonType) {
      setSelectedButton(null);
      setModalVisible(false);
    } else {
      setSelectedButton(buttonType);
      setModalMessage(
        buttonType === "note"
          ? rememberances[rememberanceIndex].notes ?? ""
          : rememberances[rememberanceIndex].virtue ?? ""
      );
      setModalVisible(true);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onHandlerStateChange={handleSwipe}
        waitFor={scrollContainer}
        activeOffsetX={[-10, 10]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              {rememberances[rememberanceIndex].title}
            </Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.rememberanceBox}>
              <TapGestureHandler>
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  ref={scrollContainer}
                >
                  <Text style={styles.arabic}>
                    {rememberances[rememberanceIndex].content}
                  </Text>
                </ScrollView>
              </TapGestureHandler>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.countButton]}
              onPress={handleNextRememberance}
            >
              <Text style={styles.buttonText}>{count} 🔄</Text>
            </TouchableOpacity>
          </View>
          {(rememberances[rememberanceIndex].notes ||
            rememberances[rememberanceIndex].virtue) && (
            <View style={styles.toggleContainer}>
              {rememberances[rememberanceIndex].virtue && (
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    selectedButton === "virtue" && styles.activeToggle,
                  ]}
                  onPress={() => toggleButton("virtue")}
                >
                  <Text style={styles.toggleText}>فضله</Text>
                </TouchableOpacity>
              )}
              {rememberances[rememberanceIndex].notes && (
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    selectedButton === "note" && styles.activeToggle,
                  ]}
                  onPress={() => toggleButton("note")}
                >
                  <Text style={styles.toggleText}>ملاحظه</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <Modal visible={modalVisible} transparent animationType="slide">
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(false);
                setSelectedButton(null);
              }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>{modalMessage}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setSelectedButton(null);
                    }}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>إغلاق</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: { width: "100%", marginVertical: "10%", alignItems: "center" },
  title: {
    marginTop: "10%",
    color: "#FF4B4B",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: { color: "#AAB1C5", fontSize: 14, textAlign: "center" },
  mainContent: { width: "100%", height: "70%", alignItems: "center" },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    flexGrow: 1,
  },
  countButton: {
    width: "50%",
    marginTop: 20,
  },
  rememberanceBox: {
    backgroundColor: "#161B22",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxHeight: "90%",
    flex: 1,
  },
  arabic: { color: "#FFFFFF", fontSize: 22, textAlign: "center" },
  button: {
    backgroundColor: "#FF4B4B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  toggleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#161B22",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeToggle: { backgroundColor: "#FF4B4B" },
  toggleText: { color: "#FFFFFF", fontSize: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: { fontSize: 18, color: "#333", textAlign: "center" },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FF4B4B",
    borderRadius: 5,
  },
  closeButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
