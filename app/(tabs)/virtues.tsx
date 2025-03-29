import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/oneOption"; // Adjust the path based on your project structure
import virute from "../../assets/rememberances/virtues";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberance={virute} option="فضله" />
    </SafeAreaView>
  );
}
