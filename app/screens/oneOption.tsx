import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
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
  const [rememberanceIndex, setRememberanceIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const lastSwipeTime = useRef(0);

  const handleSwipe = (event: any) => {
    const { translationX, velocityX, state } = event.nativeEvent;
    if (state !== State.END) return;

    const now = Date.now();
    if (now - lastSwipeTime.current < 300) return;
    lastSwipeTime.current = now;

    setRememberanceIndex((prevIndex) => {
      if (translationX < -30 && velocityX < -300) {
        return (prevIndex + 1) % rememberance.length; // Swipe left
      } else if (translationX > 30 && velocityX > 300) {
        return prevIndex === 0 ? rememberance.length - 1 : prevIndex - 1; // Swipe right
      }
      return prevIndex;
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {rememberance[rememberanceIndex].title}
          </Text>

          <View style={styles.rememberanceBox}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.arabic}>
                {rememberance[rememberanceIndex].content}
              </Text>
            </ScrollView>
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
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#FF4B4B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "5%",
    textAlign: "center",
  },
  rememberanceBox: {
    backgroundColor: "#161B22",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    maxHeight: "60%",
  },
  arabic: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
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
});
