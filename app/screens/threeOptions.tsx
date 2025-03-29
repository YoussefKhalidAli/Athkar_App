import React, { useState } from "react";
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
  GestureHandlerRootView,
} from "react-native-gesture-handler";

type ButtonType = "note" | "virtue" | "source" | null;

type RememberanceItem = {
  title?: string;
  content: string;
  repetition?: number;
  notes?: string | null;
  virtue?: string | null;
  source?: string | null;
};

type RememberanceViewerProps = {
  rememberances: RememberanceItem[];
};

export default function RememberanceViewer({
  rememberances,
}: RememberanceViewerProps) {
  const [selectedButton, setSelectedButton] = useState<ButtonType>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rememberanceIndex, setRememberanceIndex] = useState(0);

  const handleSwipe = (event: any) => {
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

  const toggleButton = (buttonType: ButtonType) => {
    if (selectedButton === buttonType) {
      setSelectedButton(null);
      setModalVisible(false);
    } else {
      setSelectedButton(buttonType);
      setModalMessage(
        buttonType === "note"
          ? rememberances[rememberanceIndex].notes ?? ""
          : buttonType === "virtue"
          ? rememberances[rememberanceIndex].virtue ?? ""
          : rememberances[rememberanceIndex].source ?? ""
      );
      setModalVisible(true);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onHandlerStateChange={handleSwipe}
        activeOffsetX={[-10, 10]}
      >
        <View style={styles.container}>
          {rememberances[rememberanceIndex].title ? (
            <View style={styles.header}>
              <Text style={styles.title}>
                {rememberances[rememberanceIndex].title}
              </Text>
            </View>
          ) : null}

          <View style={styles.mainContent}>
            <View style={styles.rememberanceBox}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.arabic}>
                  {rememberances[rememberanceIndex].content}
                </Text>
              </ScrollView>
            </View>
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
              {rememberances[rememberanceIndex].source && (
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    selectedButton === "source" && styles.activeToggle,
                  ]}
                  onPress={() => toggleButton("source")}
                >
                  <Text style={styles.toggleText}>المصدر</Text>
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
                  <Text style={styles.toggleText}>ملاحظة</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
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
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>إغلاق</Text>
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
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  header: { width: "100%", alignItems: "center" },
  mainContent: { width: "100%", height: "70%", alignItems: "center" },
  title: {
    marginTop: "10%",
    color: "#FF4B4B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rememberanceBox: {
    backgroundColor: "#161B22",
    marginTop: "5%",
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
    marginBottom: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 40,
    width: "100%",
    justifyContent: "space-between",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: "#FF4B4B",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
