import React from "react";
import { SafeAreaView } from "react-native";
import RememberanceViewer from "../screens/oneOption"; // Adjust the path based on your project structure
import healing from "../../assets/rememberances/healing";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RememberanceViewer rememberance={healing} option="ملاحظه" />
    </SafeAreaView>
  );
}
